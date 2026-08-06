# Weather Agent

A lightweight weather agent that fetches current weather and forecasts and exposes them via a simple API and web UI. Built with Python for the backend and a JavaScript frontend, this repository is a starter project for weather dashboards, automation, or conversational assistants.

## Features

- Fetch current weather and forecast for a location (city, coordinates, or ZIP).
- REST API endpoints for programmatic access.
- Simple web UI (JavaScript/CSS/HTML) for viewing weather data.
- Environment-driven configuration for API keys and server settings.
- Small, modular codebase intended for extension.

## Tech stack

- Backend: Python
- Frontend: JavaScript
- Styling: CSS
- Markup: HTML

Language composition (approx): Python, JavaScript, CSS, HTML

## Requirements

- Python 3.8+
- pip
- (Optional, for frontend) Node.js 16+ and npm/yarn
- A weather API provider account and API key (e.g., OpenWeatherMap)

## Installation

1. Clone the repository

```bash
git clone https://github.com/mcsr14724/weather_agent.git
cd weather_agent
```

2. Backend (Python)

```bash
# Create and activate a virtual environment
python -m venv .venv
# macOS / Linux
source .venv/bin/activate
# Windows (PowerShell)
.\.venv\Scripts\Activate.ps1

# Install Python dependencies (if requirements.txt exists)
pip install -r requirements.txt
```

3. Frontend (if present)

```bash
cd frontend
npm install
# or
# yarn install
```

## Running the app

- FastAPI (uvicorn)

```bash
uvicorn app.main:app --reload --host ${BACKEND_HOST:-127.0.0.1} --port ${BACKEND_PORT:-8000}
```

Frontend

```bash
cd frontend
npm run dev
# or
npm start
```

## Example API usage

Example: Get current weather for London:

```bash
curl "http://localhost:8000/api/weather?city=London"
```

Example JSON response (illustrative):

```json
{
  "location": "London, GB",
  "temperature": 18.3,
  "units": "C",
  "condition": "Light rain",
  "timestamp": "2026-08-05T12:34:56Z"
}
```

## Development

- Run tests (if present): `pytest` or `python -m pytest`
- Linting: `black`, `flake8` for Python; `eslint` for JavaScript
- Type checks: `mypy`
- 
## Contributing

Contributions are welcome.

1. Fork the repo
2. Create a branch: `git checkout -b feature/your-feature`
3. Commit and push
4. Open a pull request describing your changes

Include tests for new functionality and keep changes focused.

## Maintainer

mcsr14724 (GitHub)

---

https://weather-agent-ui.onrender.com/
