from pydantic import BaseModel
from typing import List


class CartItem(BaseModel):
    product_id: int
    price: float
    quantity: int


class CheckoutRequest(BaseModel):
    customer_id: int
    payment_method: str
    cart: List[CartItem]