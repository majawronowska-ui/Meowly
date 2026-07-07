from sqlalchemy import Column, Integer, String, Float, Boolean

from models import Base


class Marker(Base):
    __tablename__ = "markers"

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String, nullable=False)

    description = Column(String)

    address = Column(String)

    type = Column(String, nullable=False)

    lat = Column(Float, nullable=False)

    lng = Column(Float, nullable=False)

    image = Column(String)

    xp = Column(Integer, default=0)

    active = Column(Boolean, default=True)