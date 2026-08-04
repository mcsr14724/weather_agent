from langchain_core.tools import tool
from app.config import Config
import requests

BASE_URL = "https://api.openweathermap.org"

CURRENT_WEATHER = "/data/2.5/weather"
FORECAST = "/data/2.5/forecast"
AIR_POLLUTION = "/data/2.5/air_pollution"
GEOCODING = "/geo/1.0/direct"

SUPPORTED_URLS = {
    CURRENT_WEATHER,
    FORECAST,
    AIR_POLLUTION,
    GEOCODING,
}


@tool
def weather_tool(
    url: str,
    place: str | None = None,
    latitude: float | None = None,
    longitude: float | None = None,
):
    """
    A generic OpenWeather API tool.

    Use this tool to call any supported OpenWeather API endpoint.

    Args:
        url: One of the following endpoints:
            - /data/2.5/weather
            - /data/2.5/forecast
            - /data/2.5/air_pollution
            - /geo/1.0/direct

        place:
            Name of the city or location (e.g. "Hyderabad").
            If provided, the tool first converts it to latitude and longitude
            using the OpenWeather Geocoding API.

        latitude:
            Latitude of the location. Used when `place` is not provided.

        longitude:
            Longitude of the location. Used when `place` is not provided.

    Returns:
        JSON response from the requested OpenWeather API endpoint.
    """

    url = url.strip()

    if url not in SUPPORTED_URLS:
        return {
            "success": False,
            "error": f"Unsupported endpoint: {url}"
        }

    try:
        # Use place name
        if place is not None:

            geo_response = requests.get(
                f"{BASE_URL}{GEOCODING}",
                params={
                    "q": place,
                    "limit": 1,
                    "appid": Config.OPEN_WEATHER_API_KEY,
                },
                timeout=10,
            )

            geo_response.raise_for_status()
            locations = geo_response.json()

            if not locations:
                return {
                    "success": False,
                    "error": f"Location '{place}' not found."
                }

            latitude = locations[0]["lat"]
            longitude = locations[0]["lon"]

            if url == GEOCODING:
                return {
                    "success": True,
                    "data": {
                        "name": locations[0]["name"],
                        "latitude": latitude,
                        "longitude": longitude,
                        "country": locations[0].get("country"),
                        "state": locations[0].get("state"),
                    }
                }

        # Use coordinates
        else:
            if latitude is None or longitude is None:
                return {
                    "success": False,
                    "error": "Either 'place' or both 'latitude' and 'longitude' must be provided."
                }

        response = requests.get(
            f"{BASE_URL}{url}",
            params={
                "lat": latitude,
                "lon": longitude,
                "appid": Config.OPEN_WEATHER_API_KEY,
                "units": "metric",
            },
            timeout=10,
        )

        response.raise_for_status()

        return {
            "success": True,
            "data": response.json()
        }

    except requests.exceptions.RequestException as e:
        return {
            "success": False,
            "error": str(e)
        }

if __name__ == "__main__":

    test_cases = [
        {
            "name": "Current Weather (Place)",
            "url": CURRENT_WEATHER,
            "place": "Hyderabad",
        },
        {
            "name": "Forecast (Place)",
            "url": FORECAST,
            "place": "Hyderabad",
        },
        {
            "name": "Air Pollution (Place)",
            "url": AIR_POLLUTION,
            "place": "Hyderabad",
        },
        {
            "name": "Geocoding",
            "url": GEOCODING,
            "place": "Hyderabad",
        },
        {
            "name": "Current Weather (Coordinates)",
            "url": CURRENT_WEATHER,
            "latitude": 17.3850,
            "longitude": 78.4867,
        },
        {
            "name": "Forecast (Coordinates)",
            "url": FORECAST,
            "latitude": 17.3850,
            "longitude": 78.4867,
        },
        {
            "name": "Air Pollution (Coordinates)",
            "url": AIR_POLLUTION,
            "latitude": 17.3850,
            "longitude": 78.4867,
        },
    ]

    for test in test_cases:
        print("=" * 80)
        print(f"Test : {test['name']}")

        result = weather_tool.invoke({
            "url": test["url"],
            "place": test.get("place"),
            "latitude": test.get("latitude"),
            "longitude": test.get("longitude"),
        })

        print("Result:")
        print(result)
        print()