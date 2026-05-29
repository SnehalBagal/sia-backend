from sqlalchemy import Column, Integer, String, Text, DateTime
from datetime import datetime

from app.database.db import Base


class Notification(Base):
    __tablename__ = "notifications"

    id = Column(Integer, primary_key=True, index=True)

    username = Column(String(100))

    message = Column(Text)

    type = Column(String(50))

    is_read = Column(String(10), default="No")

    created_at = Column(DateTime, default=datetime.utcnow)