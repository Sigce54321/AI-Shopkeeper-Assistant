from app.api.customer import router as customer_router
from app.api.sale import router as sale_router
from app.api.sale_item import router as sale_item_router
from fastapi import FastAPI

from app.database.connection import Base
from app.database.connection import engine

from app.models import Product
from app.models import Customer
from app.models import Sale
from app.models import SaleItem

app = FastAPI()

Base.metadata.create_all(bind=engine)


@app.get("/")
def home():
    return {
        "message": "AI Shopkeeper Backend Running"
    }
from app.api.product import router as product_router
app.include_router(product_router)
app.include_router(customer_router)
app.include_router(sale_router)
app.include_router(sale_item_router)