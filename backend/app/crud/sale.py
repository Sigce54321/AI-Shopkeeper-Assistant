from datetime import datetime
import random

from sqlalchemy.orm import Session

from app.models.customer import Customer
from app.models.product import Product
from app.models.sale import Sale
from app.models.sale_item import SaleItem


# =====================================================
# CREATE COMPLETE SALE
# =====================================================
def create_sale(db: Session, sale_data):

    # -----------------------------
    # Check Customer
    # -----------------------------
    customer = (
        db.query(Customer)
        .filter(Customer.id == sale_data.customer_id)
        .first()
    )

    if not customer:
        return None

    # -----------------------------
    # Generate Bill Number
    # -----------------------------
    bill_number = (
        f"BILL-{datetime.now().strftime('%Y%m%d')}-"
        f"{random.randint(1000,9999)}"
    )

    # -----------------------------
    # Create Sale
    # -----------------------------
    sale = Sale(
        customer_id=sale_data.customer_id,
        bill_number=bill_number,
        total_amount=sale_data.total,
        payment_method="CASH",
        payment_status="SUCCESS"
    )

    db.add(sale)
    db.commit()
    db.refresh(sale)

    # -----------------------------
    # Create Sale Items
    # -----------------------------
    for item in sale_data.items:

        product = (
            db.query(Product)
            .filter(Product.id == item.product_id)
            .first()
        )

        if not product:
            continue

        # Save Sale Item
        sale_item = SaleItem(
            sale_id=sale.id,
            product_id=item.product_id,
            quantity=item.qty,
            price=item.price
        )

        db.add(sale_item)

        # Reduce Stock
        product.stock_quantity -= item.qty

    db.commit()

    return {
        "id": sale.id,
        "invoice_number": sale.bill_number,
        "customer_id": sale.customer_id,
        "total": sale.total_amount,
        "payment_status": sale.payment_status,
        "created_at": sale.created_at
    }


# =====================================================
# GET ALL SALES
# =====================================================
def get_sales(db: Session):

    return (
        db.query(Sale)
        .order_by(Sale.id.desc())
        .all()
    )


# =====================================================
# GET SALE BY ID
# =====================================================
def get_sale(
    db: Session,
    sale_id: int
):

    return (
        db.query(Sale)
        .filter(Sale.id == sale_id)
        .first()
    )


# =====================================================
# DELETE SALE
# =====================================================
def delete_sale(
    db: Session,
    sale_id: int
):

    sale = (
        db.query(Sale)
        .filter(Sale.id == sale_id)
        .first()
    )

    if not sale:
        return None

    # Restore Product Stock
    for item in sale.items:

        product = (
            db.query(Product)
            .filter(Product.id == item.product_id)
            .first()
        )

        if product:
            product.stock_quantity += item.quantity

    # Delete Sale Items
    (
        db.query(SaleItem)
        .filter(SaleItem.sale_id == sale.id)
        .delete()
    )

    db.delete(sale)

    db.commit()

    return sale