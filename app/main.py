from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.chat import router

app = FastAPI(title="Weather Agent API")


@app.get("/")
def root():
    return {
        "message": "Weather Agent is running"
    }


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://weather-agent-ui.onrender.com",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)