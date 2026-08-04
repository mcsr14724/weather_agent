from dotenv import load_dotenv
import os

load_dotenv()

class Config:
    OPEN_WEATHER_API_KEY = os.getenv("OPEN_WEATHER_API_KEY")
    GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")