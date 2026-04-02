from fastapi import FastAPI, APIRouter, HTTPException
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

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")

class ApplicationCreate(BaseModel):
    name: str
    email: str
    phone: str
    dob: str
    age: str
    parent: str
    marital: str
    city: str
    category: str

class ApplicationResponse(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str
    name: str
    email: str
    phone: str
    dob: str
    age: str
    parent: str
    marital: str
    city: str
    category: str
    status: str
    created_at: str

@api_router.get("/")
async def root():
    return {"message": "DPM Beauty Pageant 2026 API"}

@api_router.post("/applications", response_model=ApplicationResponse)
async def create_application(data: ApplicationCreate):
    doc = data.model_dump()
    doc["id"] = str(uuid.uuid4())
    doc["status"] = "pending"
    doc["created_at"] = datetime.now(timezone.utc).isoformat()
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
