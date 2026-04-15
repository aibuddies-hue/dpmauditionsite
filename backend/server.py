from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List
import uuid
from datetime import datetime, timezone
import razorpay
import hmac
import hashlib

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
