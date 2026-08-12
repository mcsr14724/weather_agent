from langchain.chat_models import init_chat_model
from langchain.messages import SystemMessage
from app.config import Config
from app.graph.tools import weather_tool
from app.graph.state import state


llm = init_chat_model(
    model="gemma-4-31b-it",
    model_provider="google_genai",
    api_key=Config.GEMINI_API_KEY,
)

llm_with_tools = llm.bind_tools([weather_tool])


SYSTEM_PROMPT = """
You are a helpful weather assistant.

Your job is to answer weather-related questions accurately and clearly.

Use the weather tool whenever current weather or forecast information is required.

Keep responses concise and easy to understand.
"""


def chatbot(state: state):
    """
    LLM node.
    Removes existing system messages, keeps the latest 20 messages,
    and adds the current system prompt.
    """

    # Remove all existing system messages
    conversation = [
        message
        for message in state["messages"]
        if not isinstance(message, SystemMessage)
    ]

    # Keep only the latest 20 non-system messages
    conversation = conversation[-20:]

    # Add exactly one system message
    messages = [
        SystemMessage(content=SYSTEM_PROMPT),
        *conversation,
    ]

    response = llm_with_tools.invoke(messages)

    return {"messages": [response]}