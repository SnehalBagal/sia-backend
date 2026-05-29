from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime

from app.database.db import Base


class UploadedFile(Base):
    __tablename__ = "uploaded_files"

    id = Column(Integer, primary_key=True, index=True)

    filename = Column(String(255))

    file_path = Column(String(255))

    uploaded_by = Column(String(100))

    created_at = Column(DateTime, default=datetime.utcnow)