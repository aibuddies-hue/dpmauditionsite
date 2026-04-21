from fastapi import FastAPI, APIRouter, HTTPException, File, UploadFile, Form
from fastapi.staticfiles import StaticFiles
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone
import razorpay
import shutil
import httpx
import asyncio

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Logging first so logger is available everywhere
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# Webhooks
GOOGLE_SHEET_WEBHOOK = os.environ.get('GOOGLE_SHEET_WEBHOOK', '')
N8N_REGISTRATION = os.environ.get('N8N_REGISTRATION', '')
N8N_PROFILE = os.environ.get('N8N_PROFILE', '')
N8N_PAYMENT_SUCCESS = os.environ.get('N8N_PAYMENT_SUCCESS', '')
N8N_PAYMENT_FAILED = os.environ.get('N8N_PAYMENT_FAILED', '')

async def fire_webhook(url: str, data: dict):
    """Fire-and-forget webhook. Never blocks, never fails the caller."""
    try:
        async with httpx.AsyncClient(timeout=10, follow_redirects=True) as c:
            await c.post(url, json=data)
    except Exception as e:
        logger.error(f"Webhook {url} failed: {e}")

def fire_and_forget(url: str, data: dict):
    """Schedule webhook without awaiting — true fire-and-forget."""
    asyncio.ensure_future(fire_webhook(url, data))

# MongoDB
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Razorpay
razorpay_client = razorpay.Client(auth=(
    os.environ.get('RAZORPAY_KEY_ID', ''),
    os.environ.get('RAZORPAY_KEY_SECRET', '')
))

app = FastAPI()
api_router = APIRouter(prefix="/api")

UPLOAD_DIR = ROOT_DIR / "uploads"
UPLOAD_DIR.mkdir(exist_ok=True)
app.mount("/api/uploads", StaticFiles(directory=str(UPLOAD_DIR)), name="uploads")

# Models
class ApplicationCreate(BaseModel):
    name: str
    email: str
    phone: str
    utm_source: str = ""
    utm_medium: str = ""
    utm_campaign: str = ""
    utm_term: str = ""
    utm_content: str = ""
    utm_id: str = ""
    placement: str = ""
    site_source: str = ""
    fbclid: str = ""
    gclid: str = ""
    ref: str = ""

class OrderResponse(BaseModel):
    order_id: str
    amount: int
    currency: str
    key_id: str

class PaymentVerify(BaseModel):
    razorpay_order_id: str
    razorpay_payment_id: str
    razorpay_signature: str
    name: str
    email: str
    phone: str
    utm_source: str = ""
    utm_medium: str = ""
    utm_campaign: str = ""
    utm_term: str = ""
    utm_content: str = ""
    utm_id: str = ""
    placement: str = ""
    site_source: str = ""
    fbclid: str = ""
    gclid: str = ""
    ref: str = ""

class PaymentFailed(BaseModel):
    razorpay_order_id: str
    name: str
    email: str
    phone: str
    error_reason: str = ""

class ApplicationResponse(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str
    name: str
    email: str
    phone: str
    status: str
    payment_id: str = ""
    order_id: str = ""
    created_at: str

# Routes

@api_router.get("/")
async def root():
    return {"message": "DPM Beauty Pageant 2026 API"}

# 1. LEADS — saves opt-in + fires registration webhook
@api_router.post("/leads")
async def save_lead(data: ApplicationCreate):
    now = datetime.now(timezone.utc).isoformat()
    utm = {"utm_source": data.utm_source, "utm_medium": data.utm_medium, "utm_campaign": data.utm_campaign, "utm_term": data.utm_term, "utm_content": data.utm_content, "utm_id": data.utm_id, "placement": data.placement, "site_source": data.site_source, "fbclid": data.fbclid, "gclid": data.gclid, "ref": data.ref}
    doc = {"id": str(uuid.uuid4()), "name": data.name, "email": data.email, "phone": data.phone, "status": "lead", "created_at": now, **utm}
    await db.leads.insert_one(doc)
    # Google Sheet
    fire_and_forget(GOOGLE_SHEET_WEBHOOK, {"type": "lead", "name": data.name, "email": data.email, "phone": data.phone, "status": "lead", "date": now})
    # n8n registration webhook with UTM
    fire_and_forget(N8N_REGISTRATION, {
        "full_name": data.name,
        "whatsapp_number": data.phone,
        "email": data.email,
        "source": data.utm_source or "organic",
        "utm_source": data.utm_source,
        "utm_medium": data.utm_medium,
        "utm_campaign": data.utm_campaign,
        "utm_term": data.utm_term,
        "utm_content": data.utm_content,
        "utm_id": data.utm_id,
        "placement": data.placement,
        "site_source": data.site_source,
        "fbclid": data.fbclid,
        "gclid": data.gclid,
        "ref": data.ref,
        "timestamp": now,
    })
    return {"status": "success", "id": doc["id"]}

@api_router.get("/leads")
async def get_leads():
    return await db.leads.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)

# 2. CREATE ORDER
@api_router.post("/create-order", response_model=OrderResponse)
async def create_order(data: ApplicationCreate):
    try:
        order = razorpay_client.order.create({
            "amount": 99900,
            "currency": "INR",
            "payment_capture": 1,
            "notes": {"name": data.name, "email": data.email, "phone": data.phone},
        })
        return OrderResponse(order_id=order["id"], amount=order["amount"], currency=order["currency"], key_id=os.environ.get('RAZORPAY_KEY_ID', ''))
    except Exception as e:
        logger.error(f"Razorpay order creation failed: {e}")
        raise HTTPException(status_code=500, detail="Failed to create payment order")

# 3. VERIFY PAYMENT — fires payment-success webhook
@api_router.post("/verify-payment", response_model=ApplicationResponse)
async def verify_payment(data: PaymentVerify):
    try:
        razorpay_client.utility.verify_payment_signature({
            "razorpay_order_id": data.razorpay_order_id,
            "razorpay_payment_id": data.razorpay_payment_id,
            "razorpay_signature": data.razorpay_signature,
        })
    except Exception:
        raise HTTPException(status_code=400, detail="Payment verification failed")

    now = datetime.now(timezone.utc).isoformat()
    utm = {"utm_source": data.utm_source, "utm_medium": data.utm_medium, "utm_campaign": data.utm_campaign, "utm_term": data.utm_term, "utm_content": data.utm_content, "utm_id": data.utm_id, "placement": data.placement, "site_source": data.site_source, "fbclid": data.fbclid, "gclid": data.gclid, "ref": data.ref}
    doc = {"id": str(uuid.uuid4()), "name": data.name, "email": data.email, "phone": data.phone, "status": "paid", "payment_id": data.razorpay_payment_id, "order_id": data.razorpay_order_id, "created_at": now, **utm}
    await db.applications.insert_one(doc)
    # Google Sheet
    fire_and_forget(GOOGLE_SHEET_WEBHOOK, {"type": "paid", "name": data.name, "email": data.email, "phone": data.phone, "payment_id": data.razorpay_payment_id, "status": "paid", "date": now})
    # n8n payment success webhook with UTM
    fire_and_forget(N8N_PAYMENT_SUCCESS, {
        "email": data.email,
        "whatsapp_number": data.phone,
        "full_name": data.name,
        "razorpay_payment_id": data.razorpay_payment_id,
        "razorpay_order_id": data.razorpay_order_id,
        "amount": 999,
        "utm_source": data.utm_source,
        "utm_medium": data.utm_medium,
        "utm_campaign": data.utm_campaign,
        "utm_term": data.utm_term,
        "utm_content": data.utm_content,
        "placement": data.placement,
        "site_source": data.site_source,
        "fbclid": data.fbclid,
        "gclid": data.gclid,
        "timestamp": now,
    })
    return ApplicationResponse(**{k: v for k, v in doc.items() if k != "_id"})

# 4. PAYMENT FAILED — fires payment-failed webhook
@api_router.post("/payment-failed")
async def payment_failed(data: PaymentFailed):
    now = datetime.now(timezone.utc).isoformat()
    fire_and_forget(N8N_PAYMENT_FAILED, {
        "email": data.email,
        "whatsapp_number": data.phone,
        "full_name": data.name,
        "razorpay_order_id": data.razorpay_order_id,
        "error_reason": data.error_reason,
        "timestamp": now,
    })
    return {"status": "logged"}

@api_router.get("/applications", response_model=List[ApplicationResponse])
async def get_applications():
    return await db.applications.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)

# 5. PROFILE — fires profile webhook
@api_router.post("/profile")
async def submit_profile(
    application_id: str = Form(...),
    first_name: str = Form(...),
    last_name: str = Form(""),
    age: str = Form(...),
    marital_status: str = Form(...),
    address1: str = Form(...),
    address2: str = Form(""),
    city: str = Form(...),
    state: str = Form(...),
    postal_code: str = Form(...),
    height: str = Form(...),
    weight: str = Form(...),
    bust: str = Form(""),
    waist: str = Form(""),
    hips: str = Form(""),
    photo1: UploadFile = File(...),
    photo2: UploadFile = File(...),
):
    photo1_name = f"{uuid.uuid4()}_{photo1.filename}"
    photo2_name = f"{uuid.uuid4()}_{photo2.filename}"
    local_p1 = str(UPLOAD_DIR / photo1_name)
    local_p2 = str(UPLOAD_DIR / photo2_name)
    with open(local_p1, "wb") as f:
        shutil.copyfileobj(photo1.file, f)
    with open(local_p2, "wb") as f:
        shutil.copyfileobj(photo2.file, f)

    # Read photos as base64 for n8n webhook (so n8n can upload to Google Drive)
    import base64
    with open(local_p1, "rb") as f:
        photo1_b64 = base64.b64encode(f.read()).decode()
    with open(local_p2, "rb") as f:
        photo2_b64 = base64.b64encode(f.read()).decode()

    now = datetime.now(timezone.utc).isoformat()
    app_doc = await db.applications.find_one({"id": application_id}, {"_id": 0})
    app_email = app_doc.get("email", "") if app_doc else ""
    app_phone = app_doc.get("phone", "") if app_doc else ""

    base_url = os.environ.get("BASE_URL", "")
    photo1_url = f"{base_url}/api/uploads/{photo1_name}"
    photo2_url = f"{base_url}/api/uploads/{photo2_name}"

    profile = {
        "application_id": application_id, "first_name": first_name, "last_name": last_name,
        "age": age, "marital_status": marital_status, "address1": address1, "address2": address2,
        "city": city, "state": state, "postal_code": postal_code, "height": height, "weight": weight,
        "bust": bust, "waist": waist, "hips": hips,
        "photo1": photo1_name, "photo1_url": photo1_url,
        "photo2": photo2_name, "photo2_url": photo2_url,
        "created_at": now,
    }
    await db.profiles.insert_one(profile)
    await db.applications.update_one({"id": application_id}, {"$set": {"profile_submitted": True}})

    # Google Sheet
    fire_and_forget(GOOGLE_SHEET_WEBHOOK, {"type": "profile", "first_name": first_name, "last_name": last_name, "age": age, "marital_status": marital_status, "address1": address1, "address2": address2, "city": city, "state": state, "postal_code": postal_code, "height": height, "weight": weight, "bust": bust, "waist": waist, "hips": hips, "date": now})
    # n8n profile webhook — includes base64 photos for Drive upload via n8n
    fire_and_forget(N8N_PROFILE, {
        "email": app_email,
        "whatsapp_number": app_phone,
        "first_name": first_name,
        "last_name": last_name,
        "address_line1": address1,
        "address_line2": address2,
        "city": city,
        "state": state,
        "postal_code": postal_code,
        "height": height,
        "weight": weight,
        "bust": bust,
        "waist": waist,
        "hips": hips,
        "photo1_url": photo1_url,
        "photo2_url": photo2_url,
        "photo1_filename": photo1_name,
        "photo2_filename": photo2_name,
        "photo1_base64": photo1_b64,
        "photo2_base64": photo2_b64,
        "timestamp": now,
    })
    return {"status": "success", "message": "Profile submitted successfully"}

@api_router.get("/profiles")
async def get_profiles():
    return await db.profiles.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)

app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
