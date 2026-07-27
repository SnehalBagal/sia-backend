from sqlalchemy import Column, Integer, String, Text, Date
from app.database.db import Base


class ProjectHandover(Base):
    __tablename__ = "project_handover"

    id = Column(Integer, primary_key=True, index=True)

    project_name = Column(String(200))
    customer_name = Column(String(200))
    engineer = Column(String(100))

    completion_date = Column(Date)

    plc_brand = Column(String(100))
    plc_model = Column(String(100))
    plc_ip = Column(String(50))
    plc_password = Column(String(200))

    scada_name = Column(String(100))
    scada_version = Column(String(100))
    scada_ip = Column(String(50))
    scada_password = Column(String(200))

    communication_type = Column(String(100))

    remarks = Column(Text)