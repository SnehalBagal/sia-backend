from sqlalchemy import Column, Integer, String, Date, DateTime, Text
from datetime import datetime

from app.database.db import Base


class ProjectReport(Base):
    __tablename__ = "project_reports"

    id = Column(Integer, primary_key=True, index=True)

    project_name = Column(String(200))
    customer_name = Column(String(200))
    engineer = Column(String(100))
    report_date = Column(Date)

    plc_brand = Column(String(100))
    plc_model = Column(String(100))

    hmi_brand = Column(String(100))
    hmi_model = Column(String(100))

    scada = Column(String(100))

    protocol = Column(String(500))

    commissioning_problem = Column(Text)
    solution = Column(Text)
    pending_work = Column(Text)

    engineer_notes = Column(Text)
    customer_notes = Column(Text)

    created_at = Column(DateTime, default=datetime.utcnow)