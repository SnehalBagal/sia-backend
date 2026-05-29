from jose import jwt, JWTError
from datetime import datetime, timedelta

from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer

SECRET_KEY = "sia_secret_key"
ALGORITHM = "HS256"

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")


def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(hours=10)
    to_encode.update({"exp": expire})

    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


def login(form_data: OAuth2PasswordRequestForm = Depends()):
    username = form_data.username
    password = form_data.password

    # (TEMP LOGIC - you can replace later with DB check)
    if username != "admin" or password != "admin123":
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token({"sub": username, "role": "admin"})
    return {"access_token": token, "token_type": "bearer"}


def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])

        username = payload.get("sub")
        role = payload.get("role")

        if username is None:
            raise HTTPException(status_code=401, detail="Invalid token")

        return {"username": username, "role": role}

    except JWTError:
        raise HTTPException(status_code=401, detail="Could not validate token")


def admin_required(current_user: dict = Depends(get_current_user)):
    if current_user["role"] != "admin":
        raise HTTPException(status_code=403, detail="Admin access required")

    return current_user