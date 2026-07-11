import os
import json
from datetime import datetime
from typing import Annotated, TypedDict

from dotenv import load_dotenv
from sqlalchemy import or_
from langchain_core.messages import (
    AIMessage,
    HumanMessage,
    SystemMessage,
)
from langchain_core.tools import tool
from langchain_groq import ChatGroq
from langgraph.graph import StateGraph, START, END
from langgraph.graph.message import add_messages
from langgraph.prebuilt import ToolNode, tools_condition

from app.database.database import SessionLocal
from app.database.models import Interaction


load_dotenv()


# =========================================================
# LANGGRAPH STATE
# =========================================================

class HCPAgentState(TypedDict):
    messages: Annotated[list, add_messages]


# =========================================================
# TOOL 1 - LOG INTERACTION
# =========================================================

@tool
def log_interaction(
    hcp_name: str,
    interaction_type: str,
    topics_discussed: str = "",
    sentiment: str = "neutral",
    outcomes: str = "",
) -> str:
    """
    Log and save a new HCP interaction in the CRM database.
    Use when the user asks to record, save, create or log an interaction.
    """

    db = SessionLocal()

    try:
        interaction = Interaction(
            hcp_name=hcp_name,
            interaction_type=interaction_type,
            interaction_datetime=datetime.now(),
            attendees=json.dumps([]),
            topics_discussed=topics_discussed,
            materials_shared=json.dumps([]),
            samples_distributed=json.dumps([]),
            sentiment=sentiment,
            outcomes=outcomes,
            follow_up_actions=json.dumps([]),
            ai_summary=None,
            created_via="chat",
        )

        db.add(interaction)
        db.commit()
        db.refresh(interaction)

        return (
            f"Interaction logged successfully. "
            f"Interaction ID: {interaction.id}. "
            f"HCP: {interaction.hcp_name}."
        )

    except Exception as exc:
        db.rollback()
        return f"Unable to log interaction: {str(exc)}"

    finally:
        db.close()


# =========================================================
# TOOL 2 - EDIT INTERACTION
# =========================================================

@tool
def edit_interaction(
    interaction_id: int,
    sentiment: str = "",
    outcomes: str = "",
    topics_discussed: str = "",
) -> str:
    """
    Edit an existing CRM interaction.
    Use when the user asks to update or modify an interaction.
    """

    db = SessionLocal()

    try:
        interaction = (
            db.query(Interaction)
            .filter(Interaction.id == interaction_id)
            .first()
        )

        if interaction is None:
            return f"Interaction {interaction_id} was not found."

        if sentiment:
            interaction.sentiment = sentiment

        if outcomes:
            interaction.outcomes = outcomes

        if topics_discussed:
            interaction.topics_discussed = topics_discussed

        db.commit()
        db.refresh(interaction)

        return f"Interaction {interaction_id} updated successfully."

    except Exception as exc:
        db.rollback()
        return f"Unable to edit interaction: {str(exc)}"

    finally:
        db.close()


# =========================================================
# TOOL 3 - SEARCH HCP
# =========================================================

@tool
def search_hcp(hcp_name: str) -> str:
    """
    Search CRM interaction history for a Healthcare Professional.
    Use when the user asks to find or search for an HCP.
    """

    db = SessionLocal()

    try:
        interactions = (
            db.query(Interaction)
            .filter(
                Interaction.hcp_name.ilike(
                    f"%{hcp_name}%"
                )
            )
            .order_by(
                Interaction.interaction_datetime.desc()
            )
            .limit(10)
            .all()
        )

        if not interactions:
            return f"No HCP interactions found for '{hcp_name}'."

        results = []

        for interaction in interactions:
            results.append(
                {
                    "id": interaction.id,
                    "hcp_name": interaction.hcp_name,
                    "interaction_type": interaction.interaction_type,
                    "interaction_datetime": str(
                        interaction.interaction_datetime
                    ),
                    "sentiment": interaction.sentiment,
                    "topics_discussed": interaction.topics_discussed,
                    "outcomes": interaction.outcomes,
                }
            )

        return json.dumps(
            results,
            indent=2,
            default=str,
        )

    except Exception as exc:
        return f"Unable to search HCP: {str(exc)}"

    finally:
        db.close()


# =========================================================
# TOOL 4 - SUGGEST FOLLOW-UP
# =========================================================

@tool
def suggest_follow_up(
    hcp_name: str,
    interaction_context: str,
    sentiment: str = "neutral",
) -> str:
    """
    Suggest practical follow-up actions from HCP interaction context.
    Use when the user asks for follow-up recommendations.
    """

    sentiment_lower = sentiment.lower()

    if sentiment_lower == "positive":
        actions = [
            "Schedule a follow-up discussion.",
            "Share relevant clinical or product materials.",
            "Confirm the HCP's areas of interest.",
            "Record the next engagement date in the CRM.",
        ]

    elif sentiment_lower == "negative":
        actions = [
            "Review the HCP's concerns.",
            "Prepare evidence-based clarification materials.",
            "Coordinate with the medical or product team if required.",
            "Plan a low-pressure follow-up discussion.",
        ]

    else:
        actions = [
            "Send a concise follow-up message.",
            "Share relevant information discussed during the interaction.",
            "Confirm whether additional information is required.",
            "Plan the next CRM engagement.",
        ]

    return json.dumps(
        {
            "hcp_name": hcp_name,
            "context": interaction_context,
            "sentiment": sentiment,
            "suggested_follow_up_actions": actions,
        },
        indent=2,
    )


# =========================================================
# TOOL 5 - SUMMARIZE INTERACTION
# =========================================================

@tool
def summarize_interaction(interaction_notes: str) -> str:
    """
    Prepare interaction notes for a concise professional CRM summary.
    Use when the user asks to summarize interaction notes.
    """

    if not interaction_notes.strip():
        return "No interaction notes were provided."

    return (
        "Create a concise professional CRM summary from these notes. "
        "Preserve only facts explicitly stated by the representative. "
        f"Interaction notes: {interaction_notes}"
    )


# =========================================================
# REGISTER TOOLS
# =========================================================

tools = [
    log_interaction,
    edit_interaction,
    search_hcp,
    suggest_follow_up,
    summarize_interaction,
]


# =========================================================
# GROQ LLM
# =========================================================

llm = ChatGroq(
    api_key=os.getenv("GROQ_API_KEY"),
    model="llama-3.3-70b-versatile",
    temperature=0.2,
)

llm_with_tools = llm.bind_tools(tools)


# =========================================================
# SYSTEM PROMPT
# =========================================================

SYSTEM_PROMPT = """
You are an AI-first CRM assistant for life-sciences field sales
representatives managing Healthcare Professional (HCP) interactions.

You have five CRM tools:

1. log_interaction
2. edit_interaction
3. search_hcp
4. suggest_follow_up
5. summarize_interaction

Use the correct tool whenever the user's request matches a CRM action.

Rules:

- Never invent HCP or interaction information.
- Ask a concise clarification question when required information is missing.
- Use log_interaction only when the user clearly wants to save or log data.
- Use edit_interaction when the user wants to modify an existing interaction.
- Use search_hcp for HCP or interaction-history searches.
- Use suggest_follow_up for follow-up recommendations.
- Use summarize_interaction for CRM note summaries.
- After a tool completes, explain the result clearly and concisely.
- Maintain a professional life-sciences CRM tone.
"""


# =========================================================
# AGENT NODE
# =========================================================

def crm_agent_node(state: HCPAgentState):
    messages = [
        SystemMessage(content=SYSTEM_PROMPT),
        *state["messages"],
    ]

    response = llm_with_tools.invoke(messages)

    return {
        "messages": [response]
    }


# =========================================================
# LANGGRAPH
# =========================================================

graph_builder = StateGraph(HCPAgentState)

graph_builder.add_node(
    "crm_agent",
    crm_agent_node,
)

graph_builder.add_node(
    "tools",
    ToolNode(tools),
)

graph_builder.add_edge(
    START,
    "crm_agent",
)

graph_builder.add_conditional_edges(
    "crm_agent",
    tools_condition,
    {
        "tools": "tools",
        END: END,
    },
)

graph_builder.add_edge(
    "tools",
    "crm_agent",
)

hcp_agent = graph_builder.compile()


# =========================================================
# RUN AGENT
# =========================================================

def run_hcp_agent(message: str) -> str:
    result = hcp_agent.invoke(
        {
            "messages": [
                HumanMessage(content=message)
            ]
        }
    )

    final_message = result["messages"][-1]

    if isinstance(final_message, AIMessage):
        return str(final_message.content)

    return str(final_message.content)