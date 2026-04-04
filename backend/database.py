import motor.motor_asyncio
import os
from dotenv import load_dotenv

load_dotenv()

# Connect to MongoDB
client = motor.motor_asyncio.AsyncIOMotorClient(os.getenv("MONGO_URI"))

# Define the unique database name for MockMate
db = client.mockmate_ai_coach 

# Access the users collection
users_collection = db["users"]