from app.database.db import engine, Base
from app.models.employee import Employee

Base.metadata.create_all(bind=engine)

print("Tables Created Successfully")