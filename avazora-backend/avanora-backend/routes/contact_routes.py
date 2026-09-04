"""
Contact / Enquiry API routes.

Endpoints:
  POST   /api/contact                     — Submit travel enquiry
  GET    /api/admin/enquiries             — List all enquiries (admin)
  GET    /api/admin/enquiries/{id}        — Single enquiry detail (admin)
  PATCH  /api/admin/enquiries/{id}/status — Update enquiry status (admin)
"""

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from datetime import datetime
from typing import List, Optional

from database.connection import get_db
from database.models import ContactEnquiry
from schemas.contact import (
    ContactEnquiryCreate,
    ContactEnquiryResponse,
    EnquiryStatusUpdate,
    EnquiryOut,
)

router = APIRouter(prefix="/api", tags=["contact"])


def _generate_enquiry_number(db: Session) -> str:
    """Generate a sequential AVZ-YYYY-NNNNN enquiry number."""
    year = datetime.utcnow().year
    count = db.query(ContactEnquiry).filter(
        ContactEnquiry.enquiry_number.like(f"AVZ-{year}-%")
    ).count()
    return f"AVZ-{year}-{str(count + 1).zfill(5)}"


# ── POST /api/contact ──────────────────────────────────────────────────────────
@router.post("/contact", response_model=ContactEnquiryResponse)
def submit_enquiry(payload: ContactEnquiryCreate, db: Session = Depends(get_db)):
    enquiry_number = _generate_enquiry_number(db)

    enquiry = ContactEnquiry(
        enquiry_number=enquiry_number,
        name=payload.name,
        email=payload.email,
        phone=payload.phone,
        country=payload.country,
        tour_type=payload.tour_type,
        service=payload.service,
        state=payload.state,
        city=payload.city,
        preferred_region=payload.preferred_region,
        arrival_airport=payload.arrival_airport,
        visa_assistance=payload.visa_assistance,
        accommodation=payload.accommodation,
        airport_transfer=payload.airport_transfer,
        starting_location=payload.starting_location,
        destination=payload.destination,
        travel_date=payload.travel_date,
        travellers=payload.travellers,
        duration=payload.duration,
        budget=payload.budget,
        message=payload.message,
        status="NEW",
    )

    db.add(enquiry)
    db.commit()
    db.refresh(enquiry)

    return ContactEnquiryResponse(
        success=True,
        message="Your enquiry has been submitted successfully. Our team will contact you shortly.",
        enquiry_id=enquiry_number,
    )


# ── GET /api/admin/enquiries ───────────────────────────────────────────────────
@router.get("/admin/enquiries", response_model=List[EnquiryOut])
def list_enquiries(
    status: Optional[str] = Query(None),
    tour_type: Optional[str] = Query(None),
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
):
    q = db.query(ContactEnquiry)
    if status:
        q = q.filter(ContactEnquiry.status == status)
    if tour_type:
        q = q.filter(ContactEnquiry.tour_type == tour_type)
    return q.order_by(ContactEnquiry.created_at.desc()).offset(skip).limit(limit).all()


# ── GET /api/admin/enquiries/{id} ─────────────────────────────────────────────
@router.get("/admin/enquiries/{enquiry_id}", response_model=EnquiryOut)
def get_enquiry(enquiry_id: int, db: Session = Depends(get_db)):
    enquiry = db.query(ContactEnquiry).filter(ContactEnquiry.id == enquiry_id).first()
    if not enquiry:
        raise HTTPException(status_code=404, detail="Enquiry not found")
    return enquiry


# ── PATCH /api/admin/enquiries/{id}/status ────────────────────────────────────
@router.patch("/admin/enquiries/{enquiry_id}/status", response_model=EnquiryOut)
def update_status(
    enquiry_id: int,
    payload: EnquiryStatusUpdate,
    db: Session = Depends(get_db),
):
    valid_statuses = {"NEW", "CONTACTED", "IN_PROGRESS", "QUOTATION_SENT", "CONFIRMED", "CLOSED"}
    if payload.status not in valid_statuses:
        raise HTTPException(status_code=400, detail=f"Invalid status. Choose from: {valid_statuses}")

    enquiry = db.query(ContactEnquiry).filter(ContactEnquiry.id == enquiry_id).first()
    if not enquiry:
        raise HTTPException(status_code=404, detail="Enquiry not found")

    enquiry.status = payload.status
    if payload.admin_notes:
        enquiry.admin_notes = payload.admin_notes
    enquiry.updated_at = datetime.utcnow()

    db.commit()
    db.refresh(enquiry)
    return enquiry
