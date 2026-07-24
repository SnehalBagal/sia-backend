from pydantic import BaseModel
from datetime import date


class ExpenseCreate(BaseModel):
    username: str
    expense_date: date
    expense_type: str
    description: str
    from_location: str | None = None
    to_location: str | None = None
    total_km: float | None = None
    amount: float
    remarks: str | None = None