import json

from sqlalchemy.orm import Session

from app.database.models import Interaction
from app.schemas.interaction import (
    InteractionCreate,
    InteractionUpdate,
)


def create_interaction(db: Session, interaction: InteractionCreate):
    print("========== CREATE INTERACTION ==========")
    print(interaction.model_dump())
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
    print("Adding object to database...")
    db.commit()
    print("Commit completed.")
    db.refresh(db_interaction)
    print("Generated ID:", db_interaction.id)

    # Convert JSON strings back to lists for API response
    db_interaction.attendees = json.loads(db_interaction.attendees or "[]")
    db_interaction.materials_shared = json.loads(
        db_interaction.materials_shared or "[]"
    )
    db_interaction.samples_distributed = json.loads(
        db_interaction.samples_distributed or "[]"
    )
    db_interaction.follow_up_actions = json.loads(
        db_interaction.follow_up_actions or "[]"
    )

    return db_interaction


def get_interactions(db: Session):
    interactions = db.query(Interaction).all()

    for item in interactions:
        item.attendees = json.loads(item.attendees or "[]")
        item.materials_shared = json.loads(item.materials_shared or "[]")
        item.samples_distributed = json.loads(
            item.samples_distributed or "[]"
        )
        item.follow_up_actions = json.loads(
            item.follow_up_actions or "[]"
        )

    return interactions


def get_interaction(db: Session, interaction_id: int):
    interaction = (
        db.query(Interaction)
        .filter(Interaction.id == interaction_id)
        .first()
    )

    if interaction:
        interaction.attendees = json.loads(interaction.attendees or "[]")
        interaction.materials_shared = json.loads(
            interaction.materials_shared or "[]"
        )
        interaction.samples_distributed = json.loads(
            interaction.samples_distributed or "[]"
        )
        interaction.follow_up_actions = json.loads(
            interaction.follow_up_actions or "[]"
        )

    return interaction


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
    db_interaction.materials_shared = json.dumps(
        interaction.materials_shared
    )
    db_interaction.samples_distributed = json.dumps(
        interaction.samples_distributed
    )
    db_interaction.sentiment = interaction.sentiment
    db_interaction.outcomes = interaction.outcomes
    db_interaction.follow_up_actions = json.dumps(
        interaction.follow_up_actions
    )
    db_interaction.ai_summary = interaction.ai_summary
    db_interaction.created_via = interaction.created_via

    db.commit()
    db.refresh(db_interaction)

    db_interaction.attendees = json.loads(db_interaction.attendees or "[]")
    db_interaction.materials_shared = json.loads(
        db_interaction.materials_shared or "[]"
    )
    db_interaction.samples_distributed = json.loads(
        db_interaction.samples_distributed or "[]"
    )
    db_interaction.follow_up_actions = json.loads(
        db_interaction.follow_up_actions or "[]"
    )

    return db_interaction


def delete_interaction(db: Session, interaction_id: int):
    db_interaction = (
        db.query(Interaction)
        .filter(Interaction.id == interaction_id)
        .first()
    )

    if not db_interaction:
        return False

    db.delete(db_interaction)
    db.commit()

    return True