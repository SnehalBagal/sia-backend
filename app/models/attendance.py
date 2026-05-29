from sqlalchemy import Column, Integer, String, DateTime, Date, Text
from datetime import datetime, date

from app.database.db import Base


class Attendance(Base):
    __tablename__ = "attendance"

    id = Column(Integer, primary_key=True, index=True)

    username = Column(String(100))

    login_time = Column(DateTime, default=datetime.utcnow)

    logout_time = Column(DateTime, nullable=True)

    work_date = Column(Date, default=date.today)

    total_hours = Column(String(50), nullable=True)