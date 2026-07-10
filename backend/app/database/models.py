from sqlalchemy import (
    Column,
    Integer,
    String,
    Text,
    Date,
    Time,
)

from app.database.database import Base


class Interaction(Base):
    __tablename__ = "interactions"

    id = Column(Integer, primary_key=True, index=True)

    hcp_name = Column(String(255), nullable=False)

    interaction_type = Column(String(100))

    interaction_date = Column(Date)

    interaction_time = Column(Time)

    attendees = Column(Text)

    topics_discussed = Column(Text)

    materials_shared = Column(Text)

    samples_distributed = Column(Text)

    sentiment = Column(String(30))

    outcomes = Column(Text)

    follow_up_actions = Column(Text)

    ai_summary = Column(Text)