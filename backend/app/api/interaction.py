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

@router.get("/hcps")
def get_hcps(q: str = ""):
    hcps = [
        "Dr. John Smith",
        "Dr. Priya Kumar",
        "Dr. Ravi Kumar",
        "Dr. Meena Joseph",
        "Dr. Sarah Wilson",
    ]

    if q:
        hcps = [
            h for h in hcps
            if q.lower() in h.lower()
        ]

    return [
        {"id": i + 1, "name": h}
        for i, h in enumerate(hcps)
    ]

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

# -----------------------------
# Lookup APIs
# -----------------------------

@router.get("/lookup/materials")
def get_materials(q: str = ""):
    materials = [
        "Product Brochure",
        "Clinical Study",
        "Patient Guide",
        "Drug Leaflet",
        "Treatment Protocol",
        "Safety Information",
    ]

    if q:
        materials = [
            m for m in materials
            if q.lower() in m.lower()
        ]

    return [
        {"id": i + 1, "name": m}
        for i, m in enumerate(materials)
    ]


@router.get("/lookup/samples")
def get_samples(q: str = ""):
    samples = [
        "Paracetamol 500mg",
        "Vitamin D",
        "Amoxicillin",
        "Insulin Pen",
        "Pain Relief Gel",
    ]

    if q:
        samples = [
            s for s in samples
            if q.lower() in s.lower()
        ]

    return [
        {"id": i + 1, "name": s}
        for i, s in enumerate(samples)
    ]


