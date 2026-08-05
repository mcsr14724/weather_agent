from fastapi import APIRouter, HTTPException
from app.schemas.chat import ChatRequest,ChatResponse
from app.graph.graph import graph
from langchain_core.messages import HumanMessage
from app.utils.extract_response import extract_response
import uuid

router=APIRouter(prefix="/chat",tags=["chat"])

@router.post("/", response_model=ChatResponse)
def chat(request: ChatRequest):

    thread_id = request.thread_id or str(uuid.uuid4())

    try:
        result = graph.invoke(
            {
                "messages": [
                    HumanMessage(content=request.message)
                ]
            },
            config={
                "configurable":{
                    "thread_id":thread_id
                }
            }
        )

        return ChatResponse(
            thread_id=thread_id,
            response=extract_response(result["messages"][-1])
        )

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )

if __name__ == "__main__":
    request = ChatRequest(
        message="What is the weather in Karalapadu?"
    )

    response = chat(request)

    print(response)