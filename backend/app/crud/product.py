from sqlalchemy.orm import Session

from app.models.product import Product
from app.schemas.product import ProductCreate


def create_product(
    db: Session,
    product: ProductCreate
):
    db_product = Product(
        name=product.name,
        barcode=product.barcode,
        selling_price=product.selling_price,
        cost_price=product.cost_price,
        stock_quantity=product.stock_quantity
    )

    db.add(db_product)
    db.commit()
    db.refresh(db_product)

    return db_product


def get_products(db: Session):
    return db.query(Product).all()


def get_product(
    db: Session,
    product_id: int
):
    return db.query(Product).filter(
        Product.id == product_id
    ).first()
def update_product(
    db: Session,
    product_id: int,
    product: ProductCreate
):
    db_product = db.query(Product).filter(
        Product.id == product_id
    ).first()

    if db_product:
        db_product.name = product.name
        db_product.barcode = product.barcode
        db_product.selling_price = product.selling_price
        db_product.cost_price = product.cost_price
        db_product.stock_quantity = product.stock_quantity

        db.commit()
        db.refresh(db_product)

    return db_product
def delete_product(
    db: Session,
    product_id: int
):
    db_product = db.query(Product).filter(
        Product.id == product_id
    ).first()

    if db_product:
        db.delete(db_product)
        db.commit()

    return db_product