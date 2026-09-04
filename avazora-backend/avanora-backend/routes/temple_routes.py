from typing import Optional, List

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session, joinedload
from sqlalchemy import or_

from database.connection import get_db
from database.models import Temple, State
from schemas.temple import TempleCard, TempleDetail

router = APIRouter(prefix="/api/temples", tags=["temples"])


@router.get("", response_model=List[TempleCard])
def list_temples(
    db: Session = Depends(get_db),
    q: Optional[str] = Query(None, description="Free-text search across name, city, deity"),
    state: Optional[str] = Query(None, description="State name, e.g. 'Tamil Nadu'"),
    region: Optional[str] = Query(None, description="north/south/east/west/central/northeast"),
    deity: Optional[str] = None,
    architecture_style: Optional[str] = None,
    heritage_status: Optional[str] = None,
    limit: int = Query(24, le=100),
    offset: int = 0,
):
    """
    Temple directory listing. Supports the search bar (q) and the
    filter chips (state/region/deity/architecture_style/heritage_status)
    from the homepage in a single endpoint.
    """
    query = db.query(Temple).join(State, Temple.state_id == State.id, isouter=True)

    if q:
        like = f"%{q}%"
        query = query.filter(
            or_(Temple.name.ilike(like), Temple.city.ilike(like), Temple.deity.ilike(like))
        )
    if state:
        query = query.filter(State.name == state)
    if region:
        query = query.filter(State.region == region)
    if deity:
        query = query.filter(Temple.deity == deity)
    if architecture_style:
        query = query.filter(Temple.architecture_style == architecture_style)
    if heritage_status:
        query = query.filter(Temple.heritage_status == heritage_status)

    return query.offset(offset).limit(limit).all()


@router.get("/{slug}", response_model=TempleDetail)
def get_temple(slug: str, db: Session = Depends(get_db)):
    temple = (
        db.query(Temple)
        .options(joinedload(Temple.state))
        .filter(Temple.slug == slug)
        .first()
    )
    if not temple:
        raise HTTPException(status_code=404, detail=f"No temple found with slug '{slug}'")
    return temple
