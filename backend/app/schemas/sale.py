from pydantic import BaseModel
from datetime import datetime


class SaleCreate(BaseModel):
    customer_id: int


class SaleResponse(BaseModel):
    id: int
    customer_id: int
    total_amount: float
    created_at: datetime

    class Config:
        orm_mode = True