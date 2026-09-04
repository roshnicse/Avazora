from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload

from database.connection import get_db
from database.models import Trail
from schemas.festival import TrailOut, TrailDetail

router = APIRouter(prefix="/api/trails", tags=["trails"])


@router.get("", response_model=List[TrailOut])
def list_trails(db: Session = Depends(get_db)):
    trails = db.query(Trail).options(joinedload(Trail.temples)).all()
    return [
        TrailOut(
            id=t.id, slug=t.slug, name=t.name, region=t.region,
            description=t.description, recommended_days=t.recommended_days,
            temple_count=len(t.temples),
        )
        for t in trails
    ]


@router.get("/{slug}", response_model=TrailDetail)
def get_trail(slug: str, db: Session = Depends(get_db)):
    trail = db.query(Trail).options(joinedload(Trail.temples)).filter(Trail.slug == slug).first()
    if not trail:
        raise HTTPException(status_code=404, detail=f"No trail found with slug '{slug}'")
    return TrailDetail(
        id=trail.id, slug=trail.slug, name=trail.name, region=trail.region,
        description=trail.description, recommended_days=trail.recommended_days,
        temple_count=len(trail.temples), temples=trail.temples,
    )
