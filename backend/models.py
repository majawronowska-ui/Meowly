from sqlalchemy import Column, Integer, String, Boolean
from sqlalchemy.orm import declarative_base

Base = declarative_base()


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)
    role = Column(String, default="user")
    xp = Column(Integer, default=0)
    level = Column(Integer, default=1)
    avatar = Column(String, nullable=True)
    verified = Column(Boolean, default=False)
    verification_token = Column(String, nullable=True)

class Mission(Base):
    __tablename__ = "missions"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(String, nullable=False)
    category = Column(String, nullable=False)
    difficulty = Column(String, default="łatwa")
    xp = Column(Integer, default=50)
    location = Column(String, nullable=False)
    status = Column(String, default="active")
    created_by = Column(String, default="admin")