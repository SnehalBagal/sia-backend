from pydantic import BaseModel
from datetime import date


class EmployeeCreate(BaseModel):
    full_name: str
    username: str
    password: str
    email: str
    role: str
    department: str
    designation: str
    joining_date: date
    