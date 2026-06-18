from sqlalchemy.orm import Session

from app.models.sale_item import SaleItem
from app.models.sale import Sale


# ➕ CREATE SALE ITEM
def create_sale_item(db: Session, sale_id: int, product_id: int, quantity: int, price: float):

    sale_item = SaleItem(
        sale_id=sale_id,
        product_id=product_id,
        quantity=quantity,
        price=price
    )

    db.add(sale_item)
    db.commit()
    db.refresh(sale_item)

    # 🔥 UPDATE SALE TOTAL
    update_sale_total(db, sale_id)

    return sale_item


# 📄 GET ALL ITEMS
def get_sale_items(db: Session):
    return db.query(SaleItem).all()


# 🔍 GET BY SALE ID
def get_items_by_sale(db: Session, sale_id: int):
    return db.query(SaleItem).filter(SaleItem.sale_id == sale_id).all()


# ❌ DELETE ITEM
def delete_sale_item(db: Session, item_id: int):
    item = db.query(SaleItem).filter(SaleItem.id == item_id).first()

    if not item:
        return None

    db.delete(item)
    db.commit()

    update_sale_total(db, item.sale_id)

    return item


# 💰 AUTO CALCULATE TOTAL
def update_sale_total(db: Session, sale_id: int):
    items = db.query(SaleItem).filter(SaleItem.sale_id == sale_id).all()

    total = sum(i.quantity * i.price for i in items)

    sale = db.query(Sale).filter(Sale.id == sale_id).first()

    if sale:
        sale.total_amount = total
        db.commit()