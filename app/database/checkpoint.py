from langgraph.checkpoint.mongodb import MongoDBSaver
from app.database.mongodb import client

checkpointer=MongoDBSaver(
    client=client,
    db_name="weather_agent"
)