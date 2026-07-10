import json

from sqlalchemy.orm import Session

from app.database.models import Interaction
from app.schemas.interaction import (
    InteractionCreate,
    InteractionUpdate,
)


def create_interaction(db: Session, interaction: InteractionCreate):
    db_interaction = Interaction(
        hcp_name=interaction.hcp_name,
        interaction_type=interaction.interaction_type,
        interaction_datetime=interaction.interaction_datetime,
        attendees=json.dumps(interaction.attendees),
        topics_discussed=interaction.topics_discussed,
        materials_shared=json.dumps(interaction.materials_shared),
        samples_distributed=json.dumps(interaction.samples_distributed),
        sentiment=interaction.sentiment,
        outcomes=interaction.outcomes,
        follow_up_actions=json.dumps(interaction.follow_up_actions),
        ai_summary=interaction.ai_summary,
        created_via=interaction.created_via,
    )

    db.add(db_interaction)
    db.commit()
    db.refresh(db_interaction)

    return db_interaction


def get_interactions(db: Session):
    return db.query(Interaction).all()


def get_interaction(db: Session, interaction_id: int):
    return (
        db.query(Interaction)
        .filter(Interaction.id == interaction_id)
        .first()
    )


def update_interaction(
    db: Session,
    interaction_id: int,
    interaction: InteractionUpdate,
):
    db_interaction = get_interaction(db, interaction_id)

    if not db_interaction:
        return None

    db_interaction.hcp_name = interaction.hcp_name
    db_interaction.interaction_type = interaction.interaction_type
    db_interaction.interaction_datetime = interaction.interaction_datetime
    db_interaction.attendees = json.dumps(interaction.attendees)
    db_interaction.topics_discussed = interaction.topics_discussed
    db_interaction.materials_shared = json.dumps(interaction.materials_shared)
    db_interaction.samples_distributed = json.dumps(interaction.samples_distributed)
    db_interaction.sentiment = interaction.sentiment
    db_interaction.outcomes = interaction.outcomes
    db_interaction.follow_up_actions = json.dumps(interaction.follow_up_actions)
    db_interaction.ai_summary = interaction.ai_summary
    db_interaction.created_via = interaction.created_via

    db.commit()
    db.refresh(db_interaction)

    return db_interaction


def delete_interaction(db: Session, interaction_id: int):
    db_interaction = get_interaction(db, interaction_id)

    if not db_interaction:
        return False

    db.delete(db_interaction)
    db.commit()

    return True