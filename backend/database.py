import os
from pathlib import Path

from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
from pymongo.errors import ConfigurationError


ENV_PATH = Path(__file__).resolve().parent / ".env"
load_dotenv(ENV_PATH, override=True)

DEFAULT_MONGO_DETAILS = (
    "mongodb://localhost:27017/blog_db"
)
MONGO_DETAILS = os.getenv("MONGO_DETAILS", DEFAULT_MONGO_DETAILS)

client = AsyncIOMotorClient(MONGO_DETAILS, serverSelectionTimeoutMS=5000)
try:
    database = client.get_default_database()
except ConfigurationError:
    database = client.blog_db
post_collection = database.get_collection("posts")
