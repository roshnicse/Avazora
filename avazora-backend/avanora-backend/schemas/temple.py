from typing import Optional
from pydantic import BaseModel, ConfigDict


class StateOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    name: str
    region: str


class TempleCard(BaseModel):
    """Lightweight shape for list/grid views (temple directory, search results)."""
    model_config = ConfigDict(from_attributes=True)

    id: int
    slug: str
    name: str
    local_name: Optional[str] = None
    city: Optional[str] = None
    deity: Optional[str] = None
    architecture_style: Optional[str] = None
    historical_period: Optional[str] = None
    heritage_status: Optional[str] = None
    primary_image_url: Optional[str] = None
    state: Optional[StateOut] = None


class TempleDetail(TempleCard):
    """Full shape for the temple detail page."""
    description: Optional[str] = None
    history: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    timings: Optional[str] = None
    visitor_rules: Optional[str] = None
    state: Optional[StateOut] = None


class TempleCreate(BaseModel):
    slug: str
    name: str
    local_name: Optional[str] = None
    description: Optional[str] = None
    history: Optional[str] = None
    deity: Optional[str] = None
    architecture_style: Optional[str] = None
    historical_period: Optional[str] = None
    heritage_status: Optional[str] = None
    city: Optional[str] = None
    state_id: Optional[int] = None
    district_id: Optional[int] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    timings: Optional[str] = None
    visitor_rules: Optional[str] = None
    primary_image_url: Optional[str] = None
