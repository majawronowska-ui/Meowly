from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import SessionLocal
from models import Mission

router = APIRouter(prefix="/missions", tags=["Missions"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/")
def get_missions(db: Session = Depends(get_db)):
    return db.query(Mission).all()

@router.post("/")
def create_mission(mission: dict, db: Session = Depends(get_db)):
    new_mission = Mission(
        title=mission["title"],
        description=mission["description"],
        category=mission["category"],
        difficulty=mission["difficulty"],
        xp=mission["xp"],
        location=mission["location"],
        status="active",
        created_by="admin",
    )

    db.add(new_mission)
    db.commit()
    db.refresh(new_mission)

    return {
        "success": True,
        "message": "Misja została dodana.",
        "mission": {
            "id": new_mission.id,
            "title": new_mission.title,
            "xp": new_mission.xp,
        },
    }