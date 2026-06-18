from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.schemas.sale_item import SaleItemCreate, SaleItemResponse
from app.crud import sale_item as crud

router = APIRouter(prefix="/sale-items", tags=["Sale Items"])


# ➕ CREATE ITEM
@router.post("/", response_model=SaleItemResponse)
def create_item(item: SaleItemCreate, db: Session = Depends(get_db)):

    return crud.create_sale_item(
        db,
        item.sale_id,
        item.product_id,
        item.quantity,
        item.price
    )


# 📄 GET ALL
@router.get("/")
def get_all(db: Session = Depends(get_db)):
    return crud.get_sale_items(db)


# 🔍 GET BY SALE ID
@router.get("/sale/{sale_id}")
def get_by_sale(sale_id: int, db: Session = Depends(get_db)):
    return crud.get_items_by_sale(db, sale_id)


# ❌ DELETE
@router.delete("/{item_id}")
def delete_item(item_id: int, db: Session = Depends(get_db)):
    result = crud.delete_sale_item(db, item_id)

    if not result:
        raise HTTPException(status_code=404, detail="Item not found")

    return {"message": "Item deleted successfully"}