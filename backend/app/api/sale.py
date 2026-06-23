from typing import List

from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.database.connection import get_db

from app.schemas.sale import SaleCreate
from app.schemas.sale import SaleResponse

from app.crud import sale as sale_crud


router = APIRouter(
    prefix="/sales",
    tags=["Sales"]
)


# =====================================================
# CREATE SALE
# =====================================================
@router.post("/")
def create_new_sale(
    sale: SaleCreate,
    db: Session = Depends(get_db)
):

    result = sale_crud.create_sale(
        db=db,
        sale_data=sale
    )

    if result is None:
        raise HTTPException(
            status_code=404,
            detail="Customer not found"
        )

    return result


# =====================================================
# GET ALL SALES
# =====================================================
@router.get(
    "/",
    response_model=List[SaleResponse]
)
def read_sales(
    db: Session = Depends(get_db)
):

    return sale_crud.get_sales(db)


# =====================================================
# GET SALE BY ID
# =====================================================
@router.get(
    "/{sale_id}",
    response_model=SaleResponse
)
def read_sale(
    sale_id: int,
    db: Session = Depends(get_db)
):

    sale = sale_crud.get_sale(
        db=db,
        sale_id=sale_id
    )

    if sale is None:
        raise HTTPException(
            status_code=404,
            detail="Sale not found"
        )

    return sale


# =====================================================
# DELETE SALE
# =====================================================
@router.delete("/{sale_id}")
def delete_existing_sale(
    sale_id: int,
    db: Session = Depends(get_db)
):

    sale = sale_crud.delete_sale(
        db=db,
        sale_id=sale_id
    )

    if sale is None:
        raise HTTPException(
            status_code=404,
            detail="Sale not found"
        )

    return {
        "message": "Sale deleted successfully"
    }