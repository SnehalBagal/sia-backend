from sqlalchemy import Column, Integer, String
from app.database.db import Base


class EventSeen(Base):
    __tablename__ = "event_seen"

    id = Column(Integer, primary_key=True, index=True)
    event_id = Column(Integer)
    username = Column(String(100))