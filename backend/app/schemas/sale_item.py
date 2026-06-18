from pydantic import BaseModel


class SaleItemCreate(BaseModel):
    sale_id: int
    product_id: int
    quantity: int
    price: float


class SaleItemResponse(BaseModel):
    id: int
    sale_id: int
    product_id: int
    quantity: int
    price: float

    class Config:
        orm_mode = True