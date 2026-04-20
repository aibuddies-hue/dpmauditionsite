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

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

razorpay_client = razorpay.Client(auth=(
    os.environ.get('RAZORPAY_KEY_ID', ''),
    os.environ.get('RAZORPAY_KEY_SECRET', '')
))

app = FastAPI()
api_router = APIRouter(prefix="/api")

UPLOAD_DIR = ROOT_DIR / "uploads"
UPLOAD_DIR.mkdir(exist_ok=True)
app.mount("/api/uploads", StaticFiles(directory=str(UPLOAD_DIR)), name="uploads")

class ApplicationCreate(BaseModel):
    name: str
    email: str
    phone: str

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

class ApplicationResponse(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str
    name: str
    email: str
    phone: str
    status: str
    payment_id: str
    order_id: str
    created_at: str

@api_router.get("/")
async def root():
    return {"message": "DPM Beauty Pageant 2026 API"}

@api_router.post("/leads")
async def save_lead(data: ApplicationCreate):
    doc = {
        "id": str(uuid.uuid4()),
        "name": data.name,
        "email": data.email,
        "phone": data.phone,
        "status": "lead",
        "created_at": datetime.now(timezone.utc).isoformat(),
    }
    await db.leads.insert_one(doc)
    return {"status": "success", "id": doc["id"]}

@api_router.get("/leads")
async def get_leads():
    leads = await db.leads.find({}, {"_id": 0}).to_list(10000)
    return leads

@api_router.post("/create-order", response_model=OrderResponse)
async def create_order(data: ApplicationCreate):
    try:
        order = razorpay_client.order.create({
            "amount": 99900,  # ₹999 in paise
            "currency": "INR",
            "payment_capture": 1,
            "notes": {
                "name": data.name,
                "email": data.email,
                "phone": data.phone,
            }
        })
        return OrderResponse(
            order_id=order["id"],
            amount=order["amount"],
            currency=order["currency"],
            key_id=os.environ.get('RAZORPAY_KEY_ID', '')
        )
    except Exception as e:
        logger.error(f"Razorpay order creation failed: {e}")
        raise HTTPException(status_code=500, detail="Failed to create payment order")

@api_router.post("/verify-payment", response_model=ApplicationResponse)
async def verify_payment(data: PaymentVerify):
    # Verify signature
    try:
        razorpay_client.utility.verify_payment_signature({
            "razorpay_order_id": data.razorpay_order_id,
            "razorpay_payment_id": data.razorpay_payment_id,
            "razorpay_signature": data.razorpay_signature,
        })
    except Exception:
        raise HTTPException(status_code=400, detail="Payment verification failed")

    # Save application
    doc = {
        "id": str(uuid.uuid4()),
        "name": data.name,
        "email": data.email,
        "phone": data.phone,
        "status": "paid",
        "payment_id": data.razorpay_payment_id,
        "order_id": data.razorpay_order_id,
        "created_at": datetime.now(timezone.utc).isoformat(),
    }
    await db.applications.insert_one(doc)
    return ApplicationResponse(**{k: v for k, v in doc.items() if k != "_id"})

@api_router.get("/applications", response_model=List[ApplicationResponse])
async def get_applications():
    apps = await db.applications.find({}, {"_id": 0}).to_list(1000)
    return apps

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
    with open(UPLOAD_DIR / photo1_name, "wb") as f:
        shutil.copyfileobj(photo1.file, f)
    with open(UPLOAD_DIR / photo2_name, "wb") as f:
        shutil.copyfileobj(photo2.file, f)

    profile = {
        "application_id": application_id,
        "first_name": first_name,
        "last_name": last_name,
        "age": age,
        "marital_status": marital_status,
        "address1": address1,
        "address2": address2,
        "city": city,
        "state": state,
        "postal_code": postal_code,
        "height": height,
        "weight": weight,
        "bust": bust,
        "waist": waist,
        "hips": hips,
        "photo1": photo1_name,
        "photo2": photo2_name,
        "created_at": datetime.now(timezone.utc).isoformat(),
    }
    await db.profiles.insert_one(profile)
    await db.applications.update_one(
        {"id": application_id},
        {"$set": {"profile_submitted": True}}
    )
    return {"status": "success", "message": "Profile submitted successfully"}

app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
