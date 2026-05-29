from pydantic import BaseModel


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

class ProjectCreate(BaseModel):
    project_name: str
    description: str
    created_by: str

class TaskCreate(BaseModel):
    title: str
    description: str
    assigned_to: str
    assigned_by: str
    priority: str
    due_date: str
    project_name: str