import os

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

MYSQLHOST = os.getenv("mysql.railway.internal")
MYSQLPORT = os.getenv("3306")
MYSQLUSER = os.getenv("root")
MYSQLPASSWORD = os.getenv("PEbUCyqyqXvXCMRiupKpEJfpdtlrFAzv")
MYSQLDATABASE = os.getenv("railway")

DATABASE_URL = (
    f"mysql+pymysql://{MYSQLUSER}:{MYSQLPASSWORD}"
    f"@{MYSQLHOST}:{MYSQLPORT}/{MYSQLDATABASE}"
)

engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

Base = declarative_base()