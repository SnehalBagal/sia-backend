from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime

from fastapi.middleware.cors import CORSMiddleware

from app.database.db import SessionLocal, Base, engine

from app.models.employee import Employee
from app.models.project import Project
from app.models.task import Task
from app.models.attendance import Attendance

from app.schemas.auth import LoginRequest, ProjectCreate, TaskCreate
from app.schemas.employee import EmployeeCreate

from app.security import hash_password, verify_password
from app.auth import create_access_token, get_current_user, admin_required

from app.models.task_comment import TaskComment
from app.schemas.comment import CommentCreate

from app.models.notification import Notification
from app.schemas.notification import NotificationCreate

from app.models.attendance import Attendance
from fastapi import Depends

from fastapi import File, UploadFile
import shutil
import os

from app.models.uploaded_file import UploadedFile
from fastapi.responses import FileResponse

def get_db():

    db = SessionLocal()

    try:

        yield db

    finally:

        db.close()



app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)


@app.get("/")
def home():
    return {"message": "SIA Running"}


@app.post("/login")
def login(
    data: LoginRequest,
    db: Session = Depends(get_db)
):

    employee = db.query(Employee).filter(
        Employee.username == data.username
    ).first()

    if not employee:
        raise HTTPException(
            status_code=401,
            detail="Invalid username"
        )

    if not verify_password(data.password, employee.password):
        raise HTTPException(
            status_code=401,
            detail="Invalid password"
        )

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
    db: Session = Depends(get_db)
):

    project = Project(
        project_name=data.project_name,
        description=data.description,
        created_by=data.created_by
    )

    db.add(project)
    db.commit()
    db.refresh(project)
    db.close()

    return {
        "message": "Project Created Successfully",
        "project_id": project.id
    }

@app.post("/create-task")
def create_task(
    data: TaskCreate,
    db: Session = Depends(get_db)
    
):

    

    task = Task(
        title=data.title,
        description=data.description,
        assigned_to=data.assigned_to,
        assigned_by=data.assigned_by,
        priority=data.priority,
        due_date=data.due_date,
        project_name=data.project_name
    )

    db.add(task)

    db.commit()

    db.refresh(task)
    db.close()

    return {
        "message": "Task Created Successfully",
        "task": task.title,
        #"assigned_by": current_user["username"]
    }

@app.get("/employee-tasks/{username}")
def employee_tasks(
    username: str,
    db: Session = Depends(get_db)
):

    tasks = db.query(Task).filter(
        Task.assigned_to == username
    ).all()

    return tasks


@app.put("/update-task-status/{task_id}")
def update_task_status(
    task_id: int,
    status: str,
    db: Session = Depends(get_db)
):

    task = db.query(Task).filter(
        Task.id == task_id
    ).first()

    if not task:
        return {"message": "Task not found"}

    task.status = status

    db.commit()

    return {
        "message": "Task status updated"
    }

@app.get("/tasks")
def get_tasks(
    db: Session = Depends(get_db)
):

    tasks = db.query(Task).all()

    return tasks	

@app.get("/kanban-board")
def kanban_board(
    db: Session = Depends(get_db)
):

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
        "pending": pending,
        "in_progress": in_progress,
        "testing": testing,
        "completed": completed
    }
    

    return {
        "Pending": pending,
        "In Progress": in_progress,
        "Testing": testing,
        "Completed": completed
    }


@app.get("/dashboard")
def dashboard(
    current_user: dict = Depends(admin_required),
    db: Session = Depends(get_db)
    ):

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

@app.post("/login-time/{username}")
def login_time(username: str,

    db: Session = Depends(get_db)
):

    attendance = Attendance(
        username=username
    )

    db.add(attendance)
    db.commit()
    db.refresh(attendance)
    #db.close()

    return {
        "message": "Login time recorded",
        "username": username,
        "login_time": attendance.login_time
    }
@app.put("/logout-time/{username}")
def logout_time(username: str,

    db: Session = Depends(get_db)
):

    attendance = db.query(Attendance).filter(
        Attendance.username == username,
        Attendance.logout_time == None
    ).order_by(Attendance.id.desc()).first()

    if not attendance:
        return {
            "message": "No active login found"
        }

    attendance.logout_time = datetime.utcnow()

    duration = attendance.logout_time - attendance.login_time

    attendance.total_hours = str(duration)

    db.commit()
    db.refresh(attendance)
    #db.close()

    return {
        "message": "Logout time recorded",
        "username": username,
        "logout_time": attendance.logout_time,
        "total_hours": attendance.total_hours
    }




@app.get("/employees")
def get_employees(

    db: Session = Depends(get_db)
):
    employees = db.query(Employee).all()

    return employees      

@app.get("/projects")
def get_projects(

    db: Session = Depends(get_db)
):

    projects = db.query(Project).all()
    #db.close()

    return projects    

@app.post("/add-comment")
def add_comment(data: CommentCreate,

    db: Session = Depends(get_db)
):

    comment = TaskComment(
        task_id=data.task_id,
        comment=data.comment,
        comment_by=data.comment_by
    )

    db.add(comment)
    db.commit()
    db.refresh(comment)
    #db.close()

    return {
        "message": "Comment added successfully"
    }


@app.get("/task-comments/{task_id}")
def get_task_comments(task_id: int,

    db: Session = Depends(get_db)
):

    comments = db.query(TaskComment).filter(
        TaskComment.task_id == task_id
    ).all()

    return comments   

@app.post("/notifications")
def create_notification(data: NotificationCreate,

    db: Session = Depends(get_db)
):

    notification = Notification(
        username=data.username,
        message=data.message,
        type=data.type,
        is_read="No"
    )

    db.add(notification)
    db.commit()
    db.refresh(notification)
    #db.close()

    return {
        "message": "Notification created"
    }


@app.get("/notifications/{username}")
def get_notifications(username: str,

    db: Session = Depends(get_db)
):

    notifications = db.query(Notification).filter(
        Notification.username == username
    ).order_by(Notification.id.desc()).all()
    #db.close()

    return notifications    

@app.get("/attendance")
def get_attendance(
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    if current_user["role"] == "admin":

        records = db.query(Attendance).all()

    else:

        records = db.query(Attendance).filter(
            Attendance.username == current_user["username"]
        ).all()

    return records


@app.post("/employees")
def create_employee(
    data: EmployeeCreate,
    current_user: dict = Depends(admin_required),
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

@app.put("/attendance-work/{attendance_id}")
def update_work_report(
    attendance_id: int,
    work_report: str,
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    attendance = db.query(Attendance).filter(
        Attendance.id == attendance_id
    ).first()

    if not attendance:
        return {"message": "Attendance record not found"}

    if current_user["role"] != "admin" and attendance.username != current_user["username"]:
        return {"message": "Not allowed"}

    attendance.work_report = work_report

    db.commit()

    return {"message": "Work report updated"}   


@app.post("/upload-file")
def upload_file(
    file: UploadFile = File(...),
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    upload_folder = "uploads"

    os.makedirs(upload_folder, exist_ok=True)

    file_path = os.path.join(
        upload_folder,
        file.filename
    )

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    uploaded_file = UploadedFile(
        filename=file.filename,
        file_path=file_path,
        uploaded_by=current_user["username"]
    )

    db.add(uploaded_file)
    db.commit()

    return {
        "message": "File uploaded successfully"
    }


@app.get("/files")
def get_files(
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    if current_user["role"] == "admin":
        files = db.query(UploadedFile).all()
    else:
        files = db.query(UploadedFile).filter(
            UploadedFile.uploaded_by == current_user["username"]
        ).all()

    return files   
    
@app.get("/download-file/{file_id}")
def download_file(
    file_id: int,
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    file = db.query(UploadedFile).filter(
        UploadedFile.id == file_id
    ).first()

    if not file:
        return {"message": "File not found"}

    if current_user["role"] != "admin" and file.uploaded_by != current_user["username"]:
        return {"message": "Not allowed"}

    return FileResponse(
        file.file_path,
        filename=file.filename
    )   

@app.put("/employees/{employee_id}/inactive")
def inactive_employee(
    employee_id: int,
    current_user: dict = Depends(admin_required),
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
def active_employee(
    employee_id: int,
    current_user: dict = Depends(admin_required),
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
        "message": "Employee activated"
    }  

@app.put("/employees/{employee_id}")
def update_employee(
    employee_id: int,
    data: EmployeeCreate,
    current_user: dict = Depends(admin_required),
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
    employee.joining_date = data.joining_date

    if data.password:
        employee.password = hash_password(data.password)

    db.commit()

    return {"message": "Employee updated successfully"}    

@app.delete("/employees/{employee_id}")
def delete_employee(
    employee_id: int,
    current_user: dict = Depends(admin_required),
    db: Session = Depends(get_db)
):

    employee = db.query(Employee).filter(
        Employee.id == employee_id
    ).first()

    if not employee:
        return {"message": "Employee not found"}

    db.delete(employee)
    db.commit()

    return {"message": "Employee deleted successfully"}   