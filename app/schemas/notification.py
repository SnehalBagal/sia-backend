from pydantic import BaseModel


class NotificationCreate(BaseModel):
    username: str
    message: str
    type: str