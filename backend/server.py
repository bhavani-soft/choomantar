from fastapi import FastAPI, APIRouter
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
from contextlib import asynccontextmanager


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Configure logging first so we can log during DB initialization
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Mock Database Fallback for Local Development without MongoDB
class MockCollection:
    def __init__(self, data=None):
        self._data = data or []

    async def insert_one(self, doc):
        self._data.append(doc)
        return doc

    async def insert_many(self, docs):
        self._data.extend(docs)
        return docs

    def find(self, query=None, projection=None):
        class Cursor:
            def __init__(self, data):
                self.data = data
            async def to_list(self, length):
                return self.data[:length]
        res_data = []
        for d in self._data:
            item = d.copy()
            if projection and "_id" in projection and projection["_id"] == 0:
                item.pop("_id", None)
            res_data.append(item)
        return Cursor(res_data)

    async def count_documents(self, query):
        return len(self._data)

class MockDatabase:
    def __init__(self):
        self.status_checks = MockCollection()
        self.trips = MockCollection()
        self.enquiries = MockCollection()

# MongoDB connection
use_mock_db = False
client = None
db = None

try:
    mongo_url = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
    client = AsyncIOMotorClient(mongo_url, serverSelectionTimeoutMS=2000)
    db = client[os.environ.get('DB_NAME', 'test_database')]
except Exception as e:
    logger.warning(f"Could not initialize MongoDB client: {e}. Falling back to in-memory mock database.")
    db = MockDatabase()
    use_mock_db = True

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

class Trip(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str
    image: str
    title: str
    tag: str
    location: str
    duration: str
    dates: str
    price: int

class EnquiryCreate(BaseModel):
    name: str
    email: str
    phone: str
    trip_interest: str
    message: str = ""

class Enquiry(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: str
    trip_interest: str
    message: str = ""
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    # Exclude MongoDB's _id field from the query results
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks

@api_router.get("/trips", response_model=List[Trip])
async def get_trips():
    trips = await db.trips.find({}, {"_id": 0}).to_list(1000)
    return trips

@api_router.post("/enquiry", response_model=Enquiry)
async def create_enquiry(input: EnquiryCreate):
    enquiry_dict = input.model_dump()
    enquiry_obj = Enquiry(**enquiry_dict)
    
    doc = enquiry_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.enquiries.insert_one(doc)
    return enquiry_obj

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("startup")
async def seed_trips_and_initialize():
    global db, use_mock_db
    try:
        if not use_mock_db and client is not None:
            # Ping the database to check if it is active
            await client.admin.command('ping')
            logger.info("Successfully connected to MongoDB server.")
        else:
            raise Exception("Mock DB is enabled.")
    except Exception as e:
        logger.warning(f"MongoDB connection failed: {e}. Falling back to in-memory mock database.")
        db = MockDatabase()
        use_mock_db = True

    try:
        count = await db.trips.count_documents({})
        if count == 0:
            default_trips = [
                {
                    "id": "hampi",
                    "image": "https://images.unsplash.com/photo-1600100397590-240a7b59d5c8?auto=compress&cs=tinysrgb&w=800",
                    "title": "Ruins of Hampi Exploration",
                    "tag": "Bestseller",
                    "location": "Hampi, Karnataka",
                    "duration": "3 Days",
                    "dates": "Oct 12 - Oct 15",
                    "price": 7999
                },
                {
                    "id": "chikmagalur",
                    "image": "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=compress&cs=tinysrgb&w=800",
                    "title": "Coffee Estate & Mullayanagiri Trek",
                    "tag": "Trending",
                    "location": "Chikmagalur, Karnataka",
                    "duration": "2 Days",
                    "dates": "Oct 24 - Oct 26",
                    "price": 5499
                },
                {
                    "id": "gokarna",
                    "image": "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=compress&cs=tinysrgb&w=800",
                    "title": "Gokarna Beach Trek & Camping",
                    "tag": "Popular",
                    "location": "Gokarna, Karnataka",
                    "duration": "3 Days",
                    "dates": "Nov 07 - Nov 10",
                    "price": 6499
                },
                {
                    "id": "munnar",
                    "image": "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=compress&cs=tinysrgb&w=800",
                    "title": "Tea Hills & Meesapulimala Trek",
                    "tag": "Scenic",
                    "location": "Munnar, Kerala",
                    "duration": "4 Days",
                    "dates": "Nov 14 - Nov 18",
                    "price": 9999
                },
                {
                    "id": "hogenakkal",
                    "image": "https://images.unsplash.com/photo-1626014903708-5445ea574373?auto=compress&cs=tinysrgb&w=800",
                    "title": "Hogenakkal Falls Coracle Ride",
                    "tag": "Weekend Getaway",
                    "location": "Dharmapuri, Tamil Nadu",
                    "duration": "1 Day",
                    "dates": "Nov 22",
                    "price": 2499
                },
                {
                    "id": "karwar",
                    "image": "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=compress&cs=tinysrgb&w=800",
                    "title": "Karwar Island & Devbagh Escape",
                    "tag": "Hidden Gem",
                    "location": "Karwar, Karnataka",
                    "duration": "3 Days",
                    "dates": "Dec 05 - Dec 08",
                    "price": 8999
                },
                {
                    "id": "murudeshwar",
                    "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=compress&cs=tinysrgb&w=800",
                    "title": "Scuba Diving & Netrani Island",
                    "tag": "Adventure",
                    "location": "Murudeshwar, Karnataka",
                    "duration": "2 Days",
                    "dates": "Dec 12 - Dec 14",
                    "price": 6999
                },
                {
                    "id": "ooty",
                    "image": "https://images.unsplash.com/photo-1598135753163-6167c1a1ad65?auto=compress&cs=tinysrgb&w=800",
                    "title": "Nilgiri Peak & Toy Train Journey",
                    "tag": "Classic",
                    "location": "Ooty, Tamil Nadu",
                    "duration": "3 Days",
                    "dates": "Dec 25 - Dec 28",
                    "price": 7499
                },
                {
                    "id": "kochi",
                    "image": "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=compress&cs=tinysrgb&w=800",
                    "title": "Fort Kochi Heritage Walk",
                    "tag": "Culture",
                    "location": "Kochi, Kerala",
                    "duration": "2 Days",
                    "dates": "Jan 08 - Jan 10",
                    "price": 4999
                },
                {
                    "id": "alleppey",
                    "image": "https://images.unsplash.com/photo-1593693411515-c202e974eb05?auto=compress&cs=tinysrgb&w=800",
                    "title": "Alleppey Houseboat Backwater Cruise",
                    "tag": "Romance",
                    "location": "Alleppey, Kerala",
                    "duration": "3 Days",
                    "dates": "Jan 15 - Jan 18",
                    "price": 8499
                },
                {
                    "id": "andarban-devkund",
                    "image": "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=compress&cs=tinysrgb&w=800",
                    "title": "Andharban Forest & Devkund Falls Trek",
                    "tag": "Monsoon Special",
                    "location": "Tamhini Ghat, Maharashtra",
                    "duration": "2 Days",
                    "dates": "Jan 22 - Jan 24",
                    "price": 3999
                }
            ]
            await db.trips.insert_many(default_trips)
            logger.info("Database successfully seeded with default trips.")
    except Exception as e:
        logger.error(f"Error seeding database: {e}")

@app.on_event("shutdown")
async def shutdown_db_client():
    if client is not None:
        client.close()