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

    scada_name: str
    scada_version: str
    scada_ip: str
    scada_password: str

    communication_type: str

    remarks: str