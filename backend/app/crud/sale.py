from sqlalchemy.orm import Session
from app.models.sale import Sale
from app.models.customer import Customer
import random
from datetime import datetime


# 🔥 CREATE SALE
def create_sale(db: Session, customer_id: int):
    # 1. Check customer exists
    customer = db.query(Customer).filter(Customer.id == customer_id).first()

    if not customer:
        return None

    # 2. Generate bill number automatically
    bill_number = f"BILL-{datetime.now().strftime('%Y%m%d')}-{random.randint(1000,9999)}"

    # 3. Create sale object
    sale = Sale(
        customer_id=customer_id,
        bill_number=bill_number,
        total_amount=0.0,
        payment_status="PENDING"
    )

    # 4. Save to DB
    db.add(sale)
    db.commit()
    db.refresh(sale)

    return sale


# 📄 GET ALL SALES
def get_sales(db: Session):
    return db.query(Sale).all()


# 🔍 GET SALE BY ID
def get_sale(db: Session, sale_id: int):
    return db.query(Sale).filter(Sale.id == sale_id).first()


# ❌ DELETE SALE
def delete_sale(db: Session, sale_id: int):
    sale = db.query(Sale).filter(Sale.id == sale_id).first()

    if not sale:
        return None

    db.delete(sale)
    db.commit()

    return sale