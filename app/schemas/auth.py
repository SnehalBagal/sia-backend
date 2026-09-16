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
    assignee: str | None = None
    reporter: str | None = None
    start_date: str | None = None
    due_date: str | None = None
    status: str | None = None
    priority: str | None = None

class TaskCreate(BaseModel):
    title: str
    description: str
    assigned_to: str
    assigned_by: str
    priority: str
    due_date: str
    project_name: str