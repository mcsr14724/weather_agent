from fastapi import FastAPI

from app.routes.chat import router

app=FastAPI(
    title="Weather Agent",
    description="AI-powered weather assistant built with FastAPI and LangGraph.",
    version="1.0.0"
)

app.include_router(router=router)

@app.get("/")
def root():
    return {
        "message": "Weather Agent is running"
    }

if __name__=="__main__":
    import uvicorn

    uvicorn.run(
        "app.main:app",
        reload=True
    )