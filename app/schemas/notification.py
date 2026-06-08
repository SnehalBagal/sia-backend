from pydantic import BaseModel




class NotificationCreate(BaseModel):
    to_user: str
    sender_name: str
    message: str