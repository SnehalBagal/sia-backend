from sqlalchemy import Column, Integer, String, Text, DateTime
from datetime import datetime

from app.database.db import Base


class TaskComment(Base):
    __tablename__ = "task_comments"

    id = Column(Integer, primary_key=True, index=True)

    task_id = Column(Integer)

    comment = Column(Text)

    comment_by = Column(String(100))

    created_at = Column(DateTime, default=datetime.utcnow)