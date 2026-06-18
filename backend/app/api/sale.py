from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.schemas.sale import SaleCreate, SaleResponse
from app.crud import sale as sale_crud

router = APIRouter(prefix="/sales", tags=["Sales"])


@router.post("/", response_model=SaleResponse)
def create_sale(sale: SaleCreate, db: Session = Depends(get_db)):
    result = sale_crud.create_sale(db, sale.customer_id)
    
    if not result:
        raise HTTPException(status_code=404, detail="Customer not found")

    return result


@router.get("/")
def get_all_sales(db: Session = Depends(get_db)):
    return sale_crud.get_sales(db)


@router.get("/{sale_id}")
def get_sale(sale_id: int, db: Session = Depends(get_db)):
    sale = sale_crud.get_sale(db, sale_id)
    
    if not sale:
        raise HTTPException(status_code=404, detail="Sale not found")

    return sale


@router.delete("/{sale_id}")
def delete_sale(sale_id: int, db: Session = Depends(get_db)):
    sale = sale_crud.delete_sale(db, sale_id)

    if not sale:
        raise HTTPException(status_code=404, detail="Sale not found")

    return {"message": "Sale deleted successfully"}