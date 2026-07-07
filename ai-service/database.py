import os
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv("MONGODB_URI")

client = MongoClient(MONGO_URI)

db = client["ai_interview_simulator"]

users_collection = db["users"]

interviews_collection = db["interviews"]

try:
    client.admin.command("ping")
    print("Connecting to MongoDB...")
except Exception as e:
    print("Connection to MongoDB failed.")
    print(e)