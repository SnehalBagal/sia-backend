from sqlalchemy import Column, Integer, String, Text, DateTime, Date
from datetime import datetime

from app.database.db import Base


class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String(255))

    description = Column(Text)

    assigned_to = Column(String(100))

    assigned_by = Column(String(100))

    priority = Column(String(20))

    status = Column(String(20), default="Pending")

    due_date = Column(Date)

    created_at = Column(DateTime, default=datetime.utcnow)

    project_name = Column(String(255))