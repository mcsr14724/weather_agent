from dotenv import load_dotenv
import os

load_dotenv()


class Config:
    OPEN_WEATHER_API_KEY = os.getenv("OPEN_WEATHER_API_KEY")
    GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")


if __name__ == "__main__":
    print("=" * 60)
    print("Configuration Check")
    print("=" * 60)

    print(
        f"OPEN_WEATHER_API_KEY : {'Loaded' if Config.OPEN_WEATHER_API_KEY else 'Missing'}"
    )

    print(
        f"GEMINI_API_KEY       : {'Loaded' if Config.GEMINI_API_KEY else 'Missing'}"
    )