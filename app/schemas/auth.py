from pydantic import BaseModel
from typing import Optional
from datetime import date


class LoginRequest(BaseModel):
    username: str
    password: str


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

class ProjectCreate(BaseModel):
    project_name: str
    description: str
    created_by: str
    assignee: Optional[str] = None
    reporter: Optional[str] = None
    start_date: Optional[date] = None
    due_date: Optional[date] = None
    status: Optional[str] = "Discussion"
    priority: Optional[str] = "Medium"
    
class TaskCreate(BaseModel):
    title: str
    description: str
    assigned_to: str
    assigned_by: str
    priority: str
    due_date: str
    project_name: str