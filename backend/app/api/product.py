from typing import List
from fastapi import APIRouter
from fastapi import Depends
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.schemas.product import ProductCreate
from app.schemas.product import ProductResponse
from app.crud.product import create_product
from app.crud.product import get_products
from app.crud.product import get_product
from app.crud.product import update_product
from app.crud.product import delete_product
router = APIRouter(
    prefix="/products",
    tags=["Products"]
)


@router.get(
    "/",
    response_model=List[ProductResponse]
)
def read_products(
    db: Session = Depends(get_db)
):
    return get_products(db=db)


@router.get(
    "/{product_id}",
    response_model=ProductResponse
)
def read_product(
    product_id: int,
    db: Session = Depends(get_db)
):
    return get_product(db=db, product_id=product_id)


@router.post(
    "/",             
    response_model=ProductResponse
)
def create_new_product(
    product: ProductCreate,
    db: Session = Depends(get_db)
):
    return create_product(
        db=db,
        product=product
    )
@router.put(
    "/{product_id}",
    response_model=ProductResponse
)
def update_existing_product(
    product_id: int,
    product: ProductCreate,
    db: Session = Depends(get_db)
):
    return update_product(
        db=db,
        product_id=product_id,
        product=product
    )
@router.delete(
    "/{product_id}"
)
def delete_existing_product(
    product_id: int,
    db: Session = Depends(get_db)
):
    return delete_product(
        db=db,
        product_id=product_id
    )