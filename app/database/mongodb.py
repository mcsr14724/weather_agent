from pymongo import MongoClient
from pymongo.server_api import ServerApi

from app.config import Config

client = MongoClient(
    Config.MONGODB_URI,
    server_api=ServerApi("1"),
)

db = client["weather_agent"]


if __name__ == "__main__":
    try:
        client.admin.command("ping")

        print("MongoDB Atlas connected successfully")
        print(f"Database: {db.name}")

        print("Collections:")
        print(db.list_collection_names())

    except Exception as e:
        print(e)