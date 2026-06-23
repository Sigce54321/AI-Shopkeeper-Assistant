from fastapi.middleware.cors import CORSMiddleware
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
origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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
from app.api.checkout import router as checkout_router
app.include_router(
    checkout_router,
    prefix="/sale",
    tags=["Checkout"]
)