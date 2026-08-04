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
    plc_cpu_part_number = Column(String(100))
    plc_firmware_version = Column(String(100))
    rack_slot = Column(String(100))
    plc_serial_number = Column(String(100))


    scada_name = Column(String(100))
    scada_version = Column(String(100))
    scada_ip = Column(String(50))
    scada_password = Column(String(200))

    communication_type = Column(String(100))

    remarks = Column(Text)

    commissioning_problem = Column(Text)

    solution = Column(Text)

    pending_work = Column(Text)

    engineer_notes = Column(Text)

    customer_notes = Column(Text)