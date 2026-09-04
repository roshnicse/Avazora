"""
SQLAlchemy ORM models for the core Avanora schema.
Phase 1 scope: states, districts, temples, festivals, trails.
(users, reviews, favorites, trips land in the auth/planner phase.)
"""

from sqlalchemy import Column, Integer, String, Text, Float, ForeignKey, Table, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime

from database.connection import Base

# Many-to-many: a trail visits many temples, in order
trail_temples = Table(
    "trail_temples",
    Base.metadata,
    Column("trail_id", Integer, ForeignKey("trails.id"), primary_key=True),
    Column("temple_id", Integer, ForeignKey("temples.id"), primary_key=True),
    Column("sequence", Integer, nullable=False, default=0),
)


class State(Base):
    __tablename__ = "states"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), unique=True, nullable=False)
    region = Column(String(50), nullable=False)  # north / south / east / west / central / northeast

    districts = relationship("District", back_populates="state")
    temples = relationship("Temple", back_populates="state")


class District(Base):
    __tablename__ = "districts"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    state_id = Column(Integer, ForeignKey("states.id"), nullable=False)

    state = relationship("State", back_populates="districts")
    temples = relationship("Temple", back_populates="district")


class Temple(Base):
    __tablename__ = "temples"

    id = Column(Integer, primary_key=True, index=True)
    slug = Column(String(160), unique=True, index=True, nullable=False)
    name = Column(String(200), nullable=False)
    local_name = Column(String(200), nullable=True)
    description = Column(Text, nullable=True)
    history = Column(Text, nullable=True)

    deity = Column(String(120), nullable=True)
    architecture_style = Column(String(80), nullable=True)   # Dravidian / Nagara / Vesara / Kalinga ...
    historical_period = Column(String(120), nullable=True)
    heritage_status = Column(String(80), nullable=True)      # e.g. UNESCO World Heritage, Living Heritage

    city = Column(String(120), nullable=True)
    state_id = Column(Integer, ForeignKey("states.id"), nullable=True)
    district_id = Column(Integer, ForeignKey("districts.id"), nullable=True)
    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)

    timings = Column(String(200), nullable=True)
    visitor_rules = Column(Text, nullable=True)

    primary_image_url = Column(String(500), nullable=True)

    state = relationship("State", back_populates="temples")
    district = relationship("District", back_populates="temples")
    festivals = relationship("Festival", back_populates="temple")
    trails = relationship("Trail", secondary=trail_temples, back_populates="temples")


class Festival(Base):
    __tablename__ = "festivals"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(160), nullable=False)
    typical_timing = Column(String(80), nullable=True)  # e.g. "Feb–Mar"
    significance = Column(Text, nullable=True)

    temple_id = Column(Integer, ForeignKey("temples.id"), nullable=True)
    temple = relationship("Temple", back_populates="festivals")


class Trail(Base):
    __tablename__ = "trails"

    id = Column(Integer, primary_key=True, index=True)
    slug = Column(String(160), unique=True, index=True, nullable=False)
    name = Column(String(160), nullable=False)
    region = Column(String(120), nullable=True)
    description = Column(Text, nullable=True)
    recommended_days = Column(String(40), nullable=True)  # e.g. "3–4 days"

    temples = relationship("Temple", secondary=trail_temples, back_populates="trails")


class ContactEnquiry(Base):
    """Travel enquiry submitted via the contact form."""
    __tablename__ = "contact_enquiries"

    id               = Column(Integer, primary_key=True, index=True)
    enquiry_number   = Column(String(20), unique=True, index=True, nullable=False)  # AVZ-2026-00001
    name             = Column(String(200), nullable=False)
    email            = Column(String(200), nullable=False)
    phone            = Column(String(30), nullable=True)
    country          = Column(String(100), nullable=True)

    # Journey classification
    tour_type        = Column(String(30), nullable=True)   # Domestic / International
    service          = Column(String(100), nullable=True)  # Pilgrimage Tour, etc.

    # Domestic-specific
    state            = Column(String(100), nullable=True)
    city             = Column(String(100), nullable=True)
    preferred_region = Column(String(100), nullable=True)

    # International-specific
    arrival_airport  = Column(String(100), nullable=True)
    visa_assistance  = Column(String(10), nullable=True)   # Yes / No
    accommodation    = Column(String(10), nullable=True)   # Yes / No
    airport_transfer = Column(String(10), nullable=True)   # Yes / No

    # Common travel info
    starting_location = Column(String(200), nullable=True)
    destination       = Column(String(200), nullable=True)
    travel_date       = Column(String(30), nullable=True)
    travellers        = Column(Integer, nullable=True)
    duration          = Column(Integer, nullable=True)     # days
    budget            = Column(String(50), nullable=True)
    message           = Column(Text, nullable=True)

    # Lifecycle
    status      = Column(String(30), nullable=False, default="NEW")
    # NEW | CONTACTED | IN_PROGRESS | QUOTATION_SENT | CONFIRMED | CLOSED
    admin_notes = Column(Text, nullable=True)
    created_at  = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at  = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=True)
