from fastapi import APIRouter
from pydantic import BaseModel

from app.agents.hcp_agent import run_hcp_agent


router = APIRouter(
    prefix="/chat",
    tags=["Chat"],
)


class ChatRequest(BaseModel):
    message: str


class ChatResponse(BaseModel):
    reply: str


@router.get("/health")
def chat_health():
    return {
        "status": "ok",
        "module": "chat",
        "agent": "LangGraph HCP Agent",
    }


@router.post("/", response_model=ChatResponse)
def chat(request: ChatRequest):
    reply = run_hcp_agent(request.message)

    return {
        "reply": reply
    }