from datetime import datetime
from typing import List, Optional

from pydantic import BaseModel, Field


class InteractionBase(BaseModel):
    hcp_name: str

    interaction_type: str

    interaction_datetime: datetime

    attendees: List[str] = Field(default_factory=list)

    topics_discussed: Optional[str] = ""

    materials_shared: List[str] = Field(default_factory=list)

    samples_distributed: List[str] = Field(default_factory=list)

    sentiment: str = "neutral"

    outcomes: Optional[str] = ""

    follow_up_actions: List[str] = Field(default_factory=list)

    ai_summary: Optional[str] = None

    created_via: str = "form"


class InteractionCreate(InteractionBase):
    pass


class InteractionUpdate(InteractionBase):
    pass


class InteractionResponse(InteractionBase):
    id: int

    class Config:
        from_attributes = True