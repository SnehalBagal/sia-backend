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
from datetime import datetime
from app.schemas.notification import NotificationCreate
from app.models.attendance import Attendance
from app.auth import (
    create_access_token,
    get_current_user,
    admin_required
)

from app.database.db import SessionLocal
from app.database.db import SessionLocal, engine, Base
from sqlalchemy import Column, Integer, String, Text, DateTime


from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

def get_db():

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()


@app.get("/")
def home():
    return {"message": "SIA Running"}


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

    admin = db.query(Employee).filter(
        Employee.username == "admin5"
    ).first()

    if admin:
        admin.role = "admin"
        admin.status = "Active"
        admin.password = hash_password("admin123")
        admin.email = "admin@kpaindia.co.in"
        admin.department = "Management"
        admin.designation = "Administrator"

        if not admin.joining_date:
            admin.joining_date = date.today()

        db.commit()

        return {
            "message": "Existing admin fixed",
            "username": "admin5"
        }

    admin = Employee(
        full_name="Admin",
        username="admin5",
        password=hash_password("admin123"),
        email="admin@kpaindia.co.in",
        role="admin",
        department="Management",
        designation="Administrator",
        joining_date=date.today(),
        status="Active"
    )

    db.add(admin)
    db.commit()
    db.refresh(admin)

    return {
        "message": "Admin created",
        "username": admin.username
    }


@app.post("/login-time/{username}")
def login_time(
    username: str,
    db: Session = Depends(get_db)
):

    attendance = Attendance(
        username=username,
        login_time=datetime.now()
    )

    db.add(attendance)
    db.commit()
    db.refresh(attendance)

    return {
        "message": "Login time recorded",
        "username": attendance.username,
        "login_time": attendance.login_time
    }


@app.put("/logout-time/{username}")
def logout_time(
    username: str,
    db: Session = Depends(get_db)
):

    attendance = db.query(Attendance).filter(
        Attendance.username == username,
        Attendance.logout_time == None
    ).order_by(
        Attendance.id.desc()
    ).first()

    if not attendance:
        return {"message": "No active login found"}

    attendance.logout_time = datetime.now()

    if attendance.login_time and attendance.logout_time:
        diff = attendance.logout_time - attendance.login_time
        attendance.total_hours = round(
            diff.total_seconds() / 3600,
            2
        )

    db.commit()

    return {
        "message": "Logout time recorded"
    }


@app.get("/attendance")
def get_attendance_old(
    username: str,
    db: Session = Depends(get_db)
):
    employee = db.query(Employee).filter(Employee.username == username).first()

    if not employee:
        return []

    if employee.role.lower() == "admin":
        return db.query(Attendance).all()

    return db.query(Attendance).filter(
        Attendance.username == username
    ).all()


@app.get("/attendance/{username}")
def get_attendance(
    username: str,
    db: Session = Depends(get_db)
):
    employee = db.query(Employee).filter(Employee.username == username).first()

    if not employee:
        return []

    if employee.role.lower() == "admin":
        return db.query(Attendance).all()

    return db.query(Attendance).filter(
        Attendance.username == username
    ).all()


@app.post("/employees")
def create_employee_new(
    data: EmployeeCreate,
    db: Session = Depends(get_db)
):

    employee = Employee(
        full_name=data.full_name,
        username=data.username,
        password=hash_password(data.password),
        email=data.email,
        role=data.role,
        department=data.department,
        designation=data.designation,
        joining_date=data.joining_date,
        status="Active"
    )

    db.add(employee)
    db.commit()
    db.refresh(employee)

    return {
        "message": "Employee created successfully",
        "employee_id": employee.id
    }   

@app.put("/employees/{employee_id}")
def update_employee(
    employee_id: int,
    data: EmployeeCreate,
    db: Session = Depends(get_db)
):

    employee = db.query(Employee).filter(
        Employee.id == employee_id
    ).first()

    if not employee:
        return {"message": "Employee not found"}

    employee.full_name = data.full_name
    employee.username = data.username
    employee.email = data.email
    employee.role = data.role
    employee.department = data.department
    employee.designation = data.designation

    if hasattr(data, "joining_date"):
        employee.joining_date = data.joining_date

    if data.password and data.password != "nochange":
        employee.password = hash_password(data.password)

    db.commit()
    db.refresh(employee)

    return {
        "message": "Employee updated successfully"
    }   
@app.put("/employees/{employee_id}/inactive")
def make_employee_inactive(
    employee_id: int,
    db: Session = Depends(get_db)
):

    employee = db.query(Employee).filter(
        Employee.id == employee_id
    ).first()

    if not employee:
        return {"message": "Employee not found"}

    employee.status = "Inactive"

    db.commit()

    return {
        "message": "Employee marked inactive"
    }

@app.put("/employees/{employee_id}/active")
def make_employee_active(
    employee_id: int,
    db: Session = Depends(get_db)
):

    employee = db.query(Employee).filter(
        Employee.id == employee_id
    ).first()

    if not employee:
        return {"message": "Employee not found"}

    employee.status = "Active"

    db.commit()

    return {
        "message": "Employee marked active"
    }


@app.delete("/employees/{employee_id}")
def delete_employee(
    employee_id: int,
    db: Session = Depends(get_db)
):

    employee = db.query(Employee).filter(
        Employee.id == employee_id
    ).first()

    if not employee:
        return {"message": "Employee not found"}

    db.delete(employee)
    db.commit()

    return {
        "message": "Employee deleted"
    }   

@app.get("/projects")
def get_projects(
    db: Session = Depends(get_db)
):
    return db.query(Project).all() 


class Notification(Base):
    __tablename__ = "notifications"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(100))
    sender_name = Column(String(100))
    message = Column(Text)
    type = Column(String(100))
    is_read = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.now)

Base.metadata.create_all(bind=engine)


@app.post("/notifications")
def create_notification(
    data: NotificationCreate,
    db: Session = Depends(get_db)
):
    notification = Notification(
        username=data.to_user,
        sender_name=data.sender_name,
        message=data.message,
        type="Notification"
    )

    db.add(notification)
    db.commit()
    db.refresh(notification)

    return {"message": "Notification sent"}


@app.get("/notifications/{username}")
def get_notifications(
    username: str,
    db: Session = Depends(get_db)
):
    return db.query(Notification).filter(
        Notification.username == username
    ).all()

class TaskComment(Base):
    __tablename__ = "task_comments"

    id = Column(Integer, primary_key=True, index=True)
    task_id = Column(Integer)
    username = Column(String(100))
    comment = Column(Text)
    created_at = Column(DateTime, default=datetime.now)


Base.metadata.create_all(bind=engine)

@app.post("/add-comment")
def add_comment(
    data: dict,
    db: Session = Depends(get_db)
):

    comment = TaskComment(
        task_id=data.get("task_id"),
        username=data.get("username"),
        comment=data.get("comment")
    )

    db.add(comment)
    db.commit()

    return {
        "message": "Comment added"
    }


@app.get("/task-comments/{task_id}")
def get_task_comments(
    task_id: int,
    db: Session = Depends(get_db)
):

    comments = db.query(TaskComment).filter(
        TaskComment.task_id == task_id
    ).all()

    return comments

       