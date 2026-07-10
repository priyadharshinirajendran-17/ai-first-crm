from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.schemas.interaction import (
    InteractionCreate,
    InteractionUpdate,
    InteractionResponse,
)
from app.services.interaction_service import (
    create_interaction,
    get_interactions,
    get_interaction,
    update_interaction,
    delete_interaction,
)

router = APIRouter(
    prefix="/interaction",
    tags=["Interaction"],
)


@router.post("/", response_model=InteractionResponse, status_code=201)
def create(interaction: InteractionCreate, db: Session = Depends(get_db)):
    return create_interaction(db, interaction)


@router.get("/", response_model=list[InteractionResponse])
def get_all(db: Session = Depends(get_db)):
    return get_interactions(db)


@router.get("/{interaction_id}", response_model=InteractionResponse)
def get_one(interaction_id: int, db: Session = Depends(get_db)):
    interaction = get_interaction(db, interaction_id)

    if not interaction:
        raise HTTPException(
            status_code=404,
            detail="Interaction not found",
        )

    return interaction


@router.put("/{interaction_id}", response_model=InteractionResponse)
def update(
    interaction_id: int,
    interaction: InteractionUpdate,
    db: Session = Depends(get_db),
):
    updated = update_interaction(
        db,
        interaction_id,
        interaction,
    )

    if not updated:
        raise HTTPException(
            status_code=404,
            detail="Interaction not found",
        )

    return updated


@router.delete("/{interaction_id}")
def delete(interaction_id: int, db: Session = Depends(get_db)):
    deleted = delete_interaction(db, interaction_id)

    if not deleted:
        raise HTTPException(
            status_code=404,
            detail="Interaction not found",
        )

    return {
        "message": "Interaction deleted successfully"
    }