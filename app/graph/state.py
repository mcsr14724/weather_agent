from typing_extensions import TypedDict
from langgraph.graph.message import add_messages
from langchain_core.messages import BaseMessage
from typing import Annotated

class state(TypedDict):
    messages: Annotated[list[BaseMessage],add_messages]