from pydantic import BaseModel
from datetime import date


class TaskCreate(BaseModel):

    title: str

    description: str

    assigned_to: str

    assigned_by: str

    priority: str

    due_date: date

    project_name: str