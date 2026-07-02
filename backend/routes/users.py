from fastapi import APIRouter

router = APIRouter(prefix="/users", tags=["Users"])


@router.get("/")
def get_users():
    return [
        {
            "id": 1,
            "name": "Maja",
            "level": 1,
            "xp": 0
        }
    ]