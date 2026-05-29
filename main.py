from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session

from app.database.db import SessionLocal
from app.models.employee import Employee
from app.security import hash_password, verify_password
from app.auth import create_access_token, get_current_user
from app.schemas.auth import LoginRequest, EmployeeCreate
from app.models.project import Project
from app.schemas.auth import ProjectCreate
from app.models.task import Task
from app.schemas.auth import TaskCreate
from app.auth import (
    create_access_token,
    get_current_user,
    admin_required
)
from fastapi.middleware.cors import CORSMiddleware




app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {"message": "SIA Running"}

@app.post("/create-employee")
def create_employee(
    data: EmployeeCreate,
    current_user: dict = Depends(admin_required)
):
    db: Session = SessionLocal()

    hashed_pw = hash_password(data.password)

    employee = Employee(
        full_name=data.full_name,
        username=data.username,
        password=hashed_pw,
        email=data.email,
        role=data.role,
        department=data.department,
        designation=data.designation
    )

    db.add(employee)

    db.commit()

    db.refresh(employee)

    return {
        "message": "Employee Created Successfully",
        "employee": employee.username
    }
@app.post("/login")
def login(data: LoginRequest):

    db: Session = SessionLocal()

    employee = db.query(Employee).filter(
        Employee.username == data.username
    ).first()

    if not employee:
        return {"message": "User not found"}

    if not verify_password(data.password, employee.password):
        return {"message": "Incorrect password"}

    token = create_access_token({
        "sub": employee.username,
        "role": employee.role
    })

    return {
        "message": "Login Successful",
        "access_token": token,
        "token_type": "bearer",
        "user": employee.username,
        "role": employee.role
    }

@app.post("/create-project")
def create_project(
    data: ProjectCreate,
    current_user: dict = Depends(admin_required)
):
    db: Session = SessionLocal()

    project = Project(
        project_name=data.project_name,
        description=data.description,
        created_by=data.created_by
    )

    db.add(project)

    db.commit()

    db.refresh(project)

    return {
        "message": "Project Created Successfully",
        "project": project.project_name
    }

@app.post("/create-task")
def create_task(
    data: TaskCreate,
    current_user: dict = Depends(get_current_user)
):

    db: Session = SessionLocal()

    task = Task(
        title=data.title,
        description=data.description,
        assigned_to=data.assigned_to,
        assigned_by=current_user["username"],
        priority=data.priority,
        due_date=data.due_date
    )

    db.add(task)

    db.commit()

    db.refresh(task)

    return {
        "message": "Task Created Successfully",
        "task": task.title,
        "assigned_by": current_user["username"]
    }

@app.get("/employee-tasks/{username}")
def employee_tasks(username: str):

    db: Session = SessionLocal()

    tasks = db.query(Task).filter(
        Task.assigned_to == username
    ).all()

    return tasks


@app.put("/update-task-status/{task_id}")
def update_task_status(task_id: int, status: str):

    db: Session = SessionLocal()

    task = db.query(Task).filter(Task.id == task_id).first()

    if not task:
        return {"message": "Task not found"}

    task.status = status

    db.commit()

    return {
        "message": "Task status updated",
        "new_status": status
    }

@app.get("/tasks")
def get_tasks():

    db: Session = SessionLocal()

    tasks = db.query(Task).all()

    return tasks	

@app.get("/kanban-board")
def kanban_board():

    db: Session = SessionLocal()

    pending = db.query(Task).filter(
        Task.status == "Pending"
    ).all()

    in_progress = db.query(Task).filter(
        Task.status == "In Progress"
    ).all()

    testing = db.query(Task).filter(
        Task.status == "Testing"
    ).all()

    completed = db.query(Task).filter(
        Task.status == "Completed"
    ).all()

    return {
        "Pending": pending,
        "In Progress": in_progress,
        "Testing": testing,
        "Completed": completed
    }


@app.get("/dashboard")
def dashboard(
    current_user: dict = Depends(admin_required)
):

    db: Session = SessionLocal()

    total_tasks = db.query(Task).count()

    pending_tasks = db.query(Task).filter(
        Task.status == "Pending"
    ).count()

    completed_tasks = db.query(Task).filter(
        Task.status == "Completed"
    ).count()

    employees = db.query(Employee).count()

    projects = db.query(Project).count()

    return {
        "total_tasks": total_tasks,
        "pending_tasks": pending_tasks,
        "completed_tasks": completed_tasks,
        "employees": employees,
        "projects": projects
    }


@app.post("/create-first-admin")
def create_first_admin(
    db: Session = Depends(get_db)
):

    admin = Employee(
        full_name="Admin",
        username="admin5",
        password=hash_password("admin123"),
        email="admin@kpaindia.co.in",
        role="admin",
        department="Management",
        designation="Administrator",
        status="Active"
    )

    db.add(admin)
    db.commit()
    db.refresh(admin)

    return {
        "message": "Admin created",
        "username": admin.username
    }