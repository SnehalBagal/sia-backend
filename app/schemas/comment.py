from pydantic import BaseModel


class CommentCreate(BaseModel):
    task_id: int
    comment: str
    comment_by: str