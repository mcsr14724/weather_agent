from langchain_core.tools import tool
from typing import Union,Tuple
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
    place: Union[str, Tuple[float, float]]
):
    """
    A generic OpenWeather API tool.

    Use this tool to call any OpenWeather API endpoint.

    Args:
        url: The OpenWeather API endpoint to call (for example,
            current weather, forecast, air pollution, geocoding, or history).

            url values:
            If current weather -> /data/2.5/weather
            If forecast -> /data/2.5/forecast
            If Air pollution -> /data/2.5/air_pollution
            If geocoding -> /geo/1.0/direct

        place: The location for the request. This can be either:
            - A city/place name as a string (e.g., "Hyderabad"). The tool
              will first obtain the latitude and longitude using the
              OpenWeather Geocoding API before calling the requested endpoint.
            - A tuple of (latitude, longitude). The tool will directly call
              the requested endpoint using these coordinates.

    Returns:
        The JSON response returned by the specified OpenWeather API endpoint.
    """

    url = url.strip()

    if url not in SUPPORTED_URLS:
        return {
            "success": False,
            "error": f"Unsupported endpoint: {url}"
        }

    try:
        # If place is a city name, convert it to coordinates
        if isinstance(place, str):
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

            if url==GEOCODING:
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
        else:
            latitude, longitude = place

        # Call the requested endpoint
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