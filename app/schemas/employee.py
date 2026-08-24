from pydantic import BaseModel
from datetime import date
from typing import Optional


class EmployeeCreate(BaseModel):
    full_name: str
    username: str
    password: str
    email: str
    role: str
    department: str
    designation: str
    joining_date: Optional[date] = None
    leaving_date: Optional[date] = None