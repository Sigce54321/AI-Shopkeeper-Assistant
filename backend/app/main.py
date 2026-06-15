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