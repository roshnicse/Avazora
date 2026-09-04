from typing import Optional, List

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session, joinedload

from database.connection import get_db
from database.models import Festival
from schemas.festival import FestivalOut

router = APIRouter(prefix="/api/festivals", tags=["festivals"])


@router.get("", response_model=List[FestivalOut])
def list_festivals(
    db: Session = Depends(get_db),
    temple_slug: Optional[str] = None,
    limit: int = Query(50, le=100),
):
    query = db.query(Festival).options(joinedload(Festival.temple))
    if temple_slug:
        query = query.join(Festival.temple).filter_by(slug=temple_slug)

    results = query.limit(limit).all()
    out = []
    for f in results:
        out.append(
            FestivalOut(
                id=f.id,
                name=f.name,
                typical_timing=f.typical_timing,
                significance=f.significance,
                temple_id=f.temple_id,
                temple_name=f.temple.name if f.temple else None,
            )
        )
    return out
