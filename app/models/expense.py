from sqlalchemy import Column, Integer, String, Float, Date, DateTime
from datetime import datetime
from app.database.db import Base


class Expense(Base):
    __tablename__ = "expenses"

    id = Column(Integer, primary_key=True, index=True)

    username = Column(String(100))

    expense_date = Column(Date)

    expense_type = Column(String(100))

    description = Column(String(500))

    from_location = Column(String(200))

    to_location = Column(String(200))

    total_km = Column(Float)

    amount = Column(Float)

    remarks = Column(String(500))

    status = Column(String(50), default="Pending")

    created_at = Column(DateTime, default=datetime.utcnow)