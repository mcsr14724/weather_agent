from langchain.chat_models import init_chat_model
from app.config import Config
from app.graph.tools import weather_tool
from app.graph.state import state


llm=init_chat_model(
    model="gemma-4-31b-it",
    model_provider="google_genai",
    api_key=Config.GEMINI_API_KEY
)

llm_with_tools=llm.bind_tools([weather_tool])

def chatbot(state:state):
    """
    LLM node.
    Receives the conversation history and returns the next AI message.
    """

    response=llm_with_tools.invoke(state["messages"])

    return {"messages":[response]}

if __name__=="__main__":
    print(chatbot({"messages":["what is weather in karalapadu"]}))