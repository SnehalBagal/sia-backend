from pydantic import BaseModel
from datetime import date
from typing import Optional


class ProjectHandoverCreate(BaseModel):
    project_name: str
    customer_name: str
    engineer: str

    completion_date: Optional[date] = None

    plc_brand: str
    plc_model: str
    plc_ip: str
    plc_password: str

    plc_cpu_part_number: Optional[str] = None
    plc_firmware_version: Optional[str] = None
    rack_slot: Optional[str] = None
    plc_serial_number: Optional[str] = None

    scada_name: Optional[str] = None
    scada_version: Optional[str] = None
    scada_ip: Optional[str] = None
    scada_password: Optional[str] = None
    communication_type: Optional[str] = None
    remarks: Optional[str] = None

    commissioning_problem: Optional[str] = None
    solution: Optional[str] = None
    pending_work: Optional[str] = None
    engineer_notes: Optional[str] = None
    customer_notes: Optional[str] = None