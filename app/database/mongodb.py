from pymongo import MongoClient
from pymongo.server_api import ServerApi

from app.config import Config

client = MongoClient(
    Config.MONGODB_URI,
    server_api=ServerApi("1"),
)