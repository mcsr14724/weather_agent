from langchain.chat_models import init_chat_model
from app.config import Config
from app.graph.tools import weather_tool


llm=init_chat_model(
    model="gemma-4-31b-it",
    model_provider="google_genai",
    api_key=Config.GEMINI_API_KEY
)

llm_with_tools=llm.bind_tools([weather_tool])

if __name__=="__main__":
    print(llm_with_tools.invoke("get weather at karalapadu"))