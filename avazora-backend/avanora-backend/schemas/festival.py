from typing import Optional, List
from pydantic import BaseModel, ConfigDict


class FestivalOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    name: str
    typical_timing: Optional[str] = None
    significance: Optional[str] = None
    temple_id: Optional[int] = None
    temple_name: Optional[str] = None


class TrailTempleOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    slug: str
    name: str
    city: Optional[str] = None


class TrailOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    slug: str
    name: str
    region: Optional[str] = None
    description: Optional[str] = None
    recommended_days: Optional[str] = None
    temple_count: int = 0


class TrailDetail(TrailOut):
    temples: List[TrailTempleOut] = []
