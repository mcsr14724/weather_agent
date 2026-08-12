from langgraph.graph import StateGraph,START,END
from app.graph.state import state
from app.graph.tools import weather_tool
from langgraph.prebuilt import ToolNode,tools_condition
from app.graph.llm import chatbot
from app.database.checkpoint import checkpointer

graph_builder=StateGraph(state_schema=state)

tools_node=ToolNode([weather_tool])
graph_builder.add_node(node="chatbot",action=chatbot)
graph_builder.add_node(node="tools",action=tools_node)

graph_builder.add_edge(start_key=START,end_key="chatbot")
graph_builder.add_conditional_edges(source="chatbot",path=tools_condition)
graph_builder.add_edge(start_key="tools",end_key="chatbot")

graph=graph_builder.compile(checkpointer=checkpointer)