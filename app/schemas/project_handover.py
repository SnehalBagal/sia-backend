from pydantic import BaseModel
from datetime import date


class ProjectHandoverCreate(BaseModel):
    project_name: str
    customer_name: str
    engineer: str

    completion_date: date

    plc_brand: str
    plc_model: str
    plc_ip: str
    plc_password: str
    plc_cpu_part_number: str | None = None
    plc_firmware_version: str | None = None
    rack_slot: str | None = None
    plc_serial_number: str | None = None

    scada_name: str
    scada_version: str
    scada_ip: str
    scada_password: str

    communication_type: str

    remarks: str

    commissioning_problem: str | None = None

    solution: str | None = None

    pending_work: str | None = None

    engineer_notes: str | None = None

    customer_notes: str | None = None