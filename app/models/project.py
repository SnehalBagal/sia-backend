from sqlalchemy import Column, Integer, String, Text, DateTime, Date
from datetime import datetime

from app.database.db import Base


class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)

    project_name = Column(String(200))

    description = Column(Text)

    created_by = Column(String(100))

    assignee = Column(String(100))

    reporter = Column(String(100))

    start_date = Column(Date)

    due_date = Column(Date)

    status = Column(String(50), default="Discussion")

    priority = Column(String(50), default="Medium")

    created_at = Column(DateTime, default=datetime.utcnow)