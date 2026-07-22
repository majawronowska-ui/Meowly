from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import SessionLocal
from models import Marker

router = APIRouter(
    prefix="/markers",
    tags=["Markers"]
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/")
def get_markers(db: Session = Depends(get_db)):
    return db.query(Marker).all()


@router.get("/{marker_id}")
def get_marker(
    marker_id: int,
    db: Session = Depends(get_db)
):
    marker = (
        db.query(Marker)
        .filter(Marker.id == marker_id)
        .first()
    )

    if not marker:
        raise HTTPException(
            status_code=404,
            detail="Marker nie istnieje."
        )

    return marker


@router.post("/")
def create_marker(
    marker: dict,
    db: Session = Depends(get_db)
):

    new_marker = Marker(
        title=marker["title"],
        description=marker.get("description"),
        address=marker.get("address"),
        type=marker["type"],
        lat=marker["lat"],
        lng=marker["lng"],
        image=marker.get("image"),
        xp=marker.get("xp", 0),
        active=marker.get("active", True),
    )

    db.add(new_marker)
    db.commit()
    db.refresh(new_marker)

    return {
        "success": True,
        "marker": new_marker,
    }


@router.put("/{marker_id}")
def update_marker(
    marker_id: int,
    marker: dict,
    db: Session = Depends(get_db)
):

    db_marker = (
        db.query(Marker)
        .filter(Marker.id == marker_id)
        .first()
    )

    if not marker:
        raise HTTPException(
            status_code=404,
            detail="Marker nie istnieje."
        )
    db.delete(marker)
    db.commit()
    return {
        "success": True
    }