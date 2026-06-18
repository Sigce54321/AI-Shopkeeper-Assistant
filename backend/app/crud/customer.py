from sqlalchemy.orm import Session

from app.models.customer import Customer
from app.schemas.customer import CustomerCreate


def create_customer(
    db: Session,
    customer: CustomerCreate
):
    db_customer = Customer(
        name=customer.name,
        phone=customer.phone
    )

    db.add(db_customer)
    db.commit()
    db.refresh(db_customer)

    return db_customer


def get_customers(db: Session):
    return db.query(Customer).all()


def get_customer(
    db: Session,
    customer_id: int
):
    return db.query(Customer).filter(
        Customer.id == customer_id
    ).first()


def update_customer(
    db: Session,
    customer_id: int,
    customer: CustomerCreate
):
    db_customer = db.query(Customer).filter(
        Customer.id == customer_id
    ).first()

    if db_customer:
        db_customer.name = customer.name
        db_customer.phone = customer.phone

        db.commit()
        db.refresh(db_customer)

    return db_customer


def delete_customer(
    db: Session,
    customer_id: int
):
    db_customer = db.query(Customer).filter(
        Customer.id == customer_id
    ).first()

    if db_customer:
        db.delete(db_customer)
        db.commit()

    return db_customer