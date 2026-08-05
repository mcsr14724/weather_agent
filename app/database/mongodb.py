from pymongo import MongoClient
from pymongo.server_api import ServerApi

from app.config import Config

client = MongoClient(
    Config.MONGODB_URI,
    server_api=ServerApi("1"),
)

if __name__ == "__main__":
    try:
        client.admin.command("ping")

        print("MongoDB Atlas connected successfully")

    except Exception as e:
        print(e)