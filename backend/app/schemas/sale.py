from datetime import datetime
from typing import List, Optional

from pydantic import BaseModel


# ==========================================
# Sale Item received from Billing.jsx
# ==========================================

class SaleItemCreate(BaseModel):
    product_id: int
    qty: int
    price: float


# ==========================================
# Create Sale
# ==========================================

class SaleCreate(BaseModel):
    customer_id: int
    items: List[SaleItemCreate]
    total: float


# ==========================================
# Update Sale
# ==========================================

class SaleUpdate(BaseModel):
    payment_method: Optional[str] = None
    payment_status: Optional[str] = None
    transaction_id: Optional[str] = None


# ==========================================
# Sale Response
# ==========================================

class SaleResponse(BaseModel):
    id: int
    customer_id: int

    bill_number: str

    total_amount: float

    payment_method: Optional[str] = None

    payment_status: str

    transaction_id: Optional[str] = None

    created_at: datetime

    class Config:
        from_attributes = True