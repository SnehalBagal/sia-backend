from sqlalchemy import Column, Integer, String, Text, DateTime
from datetime import datetime

from app.database.db import Base


class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)

    project_name = Column(String(200))

    description = Column(Text)

    created_by = Column(String(100))

    status = Column(String(20), default="active")

    created_at = Column(DateTime, default=datetime.utcnow)