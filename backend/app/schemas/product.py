from pydantic import BaseModel


class ProductCreate(BaseModel):
    name: str
    barcode: str
    selling_price: float
    cost_price: float
    stock_quantity: int


class ProductResponse(ProductCreate):
    id: int

    class Config:
        from_attributes = True
       