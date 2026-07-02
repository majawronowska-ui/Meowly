from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import secrets
from email_service import send_verification_email
from fastapi import UploadFile, File
from fastapi.staticfiles import StaticFiles
import shutil
import os
from routes.users import router as users_router
from routes.missions import router as missions_router
from database import create_database, seed_database, SessionLocal
from models import User
from fastapi.responses import RedirectResponse

app = FastAPI(title="Meowly API")

os.makedirs("uploads", exist_ok=True)
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

create_database()
seed_database()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/")
def home():
    return {"message": "Meowly API działa!"}


@app.post("/register")
def register_user(user: dict, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.email == user["email"]).first()
    token = secrets.token_urlsafe(32)
    
    if existing_user:
        return {"success": False, "message": "Użytkownik z tym emailem już istnieje."}

    new_user = User(
        name=user["name"],
        email=user["email"],
        password=user["password"],
        role=user.get("role", "user"),
        xp=0,
        level=1,
        verified=False,
        verification_token=token,
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    try:
        print("PRÓBUJĘ WYSŁAĆ MAILA DO:", new_user.email)
        send_verification_email(new_user.email, token)
        print("✅ Mail wysłany")
    except Exception as e:
        print("❌ BŁĄD WYSYŁANIA MAILA:")
        print(e)

    return {
    "success": True,
    "message": "Konto zostało utworzone. Sprawdź e-mail i potwierdź konto."
    }

from fastapi.responses import RedirectResponse

@app.get("/verify/{token}")
def verify_email(token: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.verification_token == token).first()

    if not user:
        return {
            "success": False,
            "message": "Nieprawidłowy token."
        }

    user.verified = True
    user.verification_token = None

    db.commit()

    return RedirectResponse(
        url="http://localhost:5173/verified",
        status_code=302
    )


@app.post("/login")
def login_user(user: dict, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.email == user["email"]).first()

    if not existing_user:
        return {"success": False, "message": "Nie znaleziono użytkownika."}
    if not existing_user.verified:
        return {
            "success": False,
            "message": "Najpierw potwierdź adres e-mail."
        }
    if existing_user.password != user["password"]:
        return {"success": False, "message": "Nieprawidłowe hasło."}


    return {
        "success": True,
        "message": "Zalogowano pomyślnie.",
        "user": {
            "id": existing_user.id,
            "name": existing_user.name,
            "email": existing_user.email,
            "role": existing_user.role,
            "xp": existing_user.xp,
            "level": existing_user.level,
            "avatar": f"http://127.0.0.1:8000/uploads/{existing_user.avatar}" if existing_user.avatar else None,
        },
    }


@app.get("/stats")
def get_stats():
    return {
        "users": 128,
        "missions": 42,
        "reports": 17,
        "adoptions": 9,
    }

@app.post("/upload-avatar/{user_id}")
async def upload_avatar(
    user_id: int,
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
):
    user = db.query(User).filter(User.id == user_id).first()

    if not user:
        return {
            "success": False,
            "message": "Nie znaleziono użytkownika."
        }

    extension = file.filename.split(".")[-1]

    filename = f"avatar_{user_id}.{extension}"

    filepath = os.path.join("uploads", filename)

    with open(filepath, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    user.avatar = filename

    db.commit()

    return {
        "success": True,
        "avatar": f"http://127.0.0.1:8000/uploads/{filename}"
    }

@app.get("/admin/users")
def admin_get_users(db: Session = Depends(get_db)):
    users = db.query(User).all()

    return [
        {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "role": user.role,
            "xp": user.xp,
            "level": user.level,
            "verified": user.verified,
            "avatar": user.avatar,
        }
        for user in users
    ]


@app.delete("/admin/users/{user_id}")
def admin_delete_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()

    if not user:
        return {
            "success": False,
            "message": "Nie znaleziono użytkownika."
        }

    db.delete(user)
    db.commit()

    return {
        "success": True,
        "message": "Użytkownik został usunięty."
    }

app.include_router(users_router)
app.include_router(missions_router)