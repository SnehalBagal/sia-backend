from sqlalchemy import Column, Integer, String, Date, DateTime
from app.database.db import Base
from datetime import datetime


class Employee(Base):
    __tablename__ = "employees"

    id = Column(Integer, primary_key=True, index=True)

    full_name = Column(String(100))

    username = Column(String(50), unique=True)

    password = Column(String(100))

    email = Column(String(100), unique=True, nullable=True)

    role = Column(String(20))

    department = Column(String(100))

    designation = Column(String(100))
    
    joining_date = Column(Date)

    leaving_date = Column(Date, nullable=True)

    status = Column(String(20), default="active")

    created_at = Column(DateTime, default=datetime.utcnow)
