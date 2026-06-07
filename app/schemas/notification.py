from pydantic import BaseModel


class NotificationCreate(BaseModel):
    username: str          # receiver username
    sender_name: str       # who sent notification
    message: str
    type: str