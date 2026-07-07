import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from models import Base, Mission

DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    raise RuntimeError("Brak zmiennej środowiskowej DATABASE_URL")

engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine,
)

def create_database():
    Base.metadata.create_all(bind=engine)

def seed_database():
    db = SessionLocal()

    if db.query(Mission).count() == 0:
        missions = [
            Mission(
                title="Sprawdź budkę dla kotów",
                description="Zweryfikuj, czy budka jest czysta, sucha i bezpieczna.",
                category="budki",
                difficulty="łatwa",
                xp=50,
                location="Warszawa",
            ),
            Mission(
                title="Zgłoś kota potrzebującego pomocy",
                description="Dodaj opis sytuacji i lokalizację kota.",
                category="zgłoszenia",
                difficulty="średnia",
                xp=100,
                location="Warszawa",
            ),
            Mission(
                title="Pomóż w punkcie karmienia",
                description="Sprawdź, czy w punkcie dokarmiania jest karma i woda.",
                category="dokarmianie",
                difficulty="łatwa",
                xp=60,
                location="Warszawa",
            ),
        ]

        db.add_all(missions)
        db.commit()

    db.close()

psycopg2-binary