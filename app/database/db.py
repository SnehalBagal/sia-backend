import os

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

MYSQLHOST = "mysql.railway.internal"
MYSQLPORT = "3306"
MYSQLUSER = "root"
MYSQLPASSWORD = "PEbUCyqyqXvXCMRiupKpEJfpdtlrFAzv"
MYSQLDATABASE = "railway"

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