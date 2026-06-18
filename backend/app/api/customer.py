from typing import List

from fastapi import APIRouter
from fastapi import Depends
from sqlalchemy.orm import Session

from app.database.connection import get_db

from app.schemas.customer import CustomerCreate
from app.schemas.customer import CustomerResponse

from app.crud.customer import create_customer
from app.crud.customer import get_customers
from app.crud.customer import get_customer
from app.crud.customer import update_customer
from app.crud.customer import delete_customer

router = APIRouter(
    prefix="/customers",
    tags=["Customers"]
)


@router.get(
    "/",
    response_model=List[CustomerResponse]
)
def read_customers(
    db: Session = Depends(get_db)
):
    return get_customers(db=db)


@router.get(
    "/{customer_id}",
    response_model=CustomerResponse
)
def read_customer(
    customer_id: int,
    db: Session = Depends(get_db)
):
    return get_customer(
        db=db,
        customer_id=customer_id
    )


@router.post(
    "/",
    response_model=CustomerResponse
)
def create_new_customer(
    customer: CustomerCreate,
    db: Session = Depends(get_db)
):
    return create_customer(
        db=db,
        customer=customer
    )


@router.put(
    "/{customer_id}",
    response_model=CustomerResponse
)
def update_existing_customer(
    customer_id: int,
    customer: CustomerCreate,
    db: Session = Depends(get_db)
):
    return update_customer(
        db=db,
        customer_id=customer_id,
        customer=customer
    )


@router.delete(
    "/{customer_id}"
)
def delete_existing_customer(
    customer_id: int,
    db: Session = Depends(get_db)
):
    return delete_customer(
        db=db,
        customer_id=customer_id
    )