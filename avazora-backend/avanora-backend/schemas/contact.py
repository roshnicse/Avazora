"""
Pydantic schemas for the Contact / Enquiry API.
"""
from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime


class ContactEnquiryCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=200)
    email: EmailStr
    phone: Optional[str] = None
    country: Optional[str] = None

    # Journey
    tour_type: Optional[str] = None          # Domestic | International
    service: Optional[str] = None

    # Domestic
    state: Optional[str] = None
    city: Optional[str] = None
    preferred_region: Optional[str] = None

    # International
    arrival_airport: Optional[str] = None
    visa_assistance: Optional[str] = None    # Yes | No
    accommodation: Optional[str] = None      # Yes | No
    airport_transfer: Optional[str] = None   # Yes | No

    # Common
    starting_location: Optional[str] = None
    destination: Optional[str] = None
    travel_date: Optional[str] = None
    travellers: Optional[int] = None
    duration: Optional[int] = None
    budget: Optional[str] = None
    message: Optional[str] = None


class ContactEnquiryResponse(BaseModel):
    success: bool
    message: str
    enquiry_id: str


class EnquiryStatusUpdate(BaseModel):
    status: str
    admin_notes: Optional[str] = None


class EnquiryOut(BaseModel):
    id: int
    enquiry_number: str
    name: str
    email: str
    phone: Optional[str]
    country: Optional[str]
    tour_type: Optional[str]
    service: Optional[str]
    state: Optional[str]
    city: Optional[str]
    preferred_region: Optional[str]
    arrival_airport: Optional[str]
    visa_assistance: Optional[str]
    accommodation: Optional[str]
    airport_transfer: Optional[str]
    starting_location: Optional[str]
    destination: Optional[str]
    travel_date: Optional[str]
    travellers: Optional[int]
    duration: Optional[int]
    budget: Optional[str]
    message: Optional[str]
    status: str
    admin_notes: Optional[str]
    created_at: datetime

    class Config:
        from_attributes = True
