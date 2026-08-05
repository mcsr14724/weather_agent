from langchain_core.messages import AIMessage

def extract_response(message: AIMessage) -> str:
    if isinstance(message.content, str):
        return message.content

    if isinstance(message.content, list):
        for block in message.content:
            if block.get("type") == "text":
                return block.get("text", "")

    return ""