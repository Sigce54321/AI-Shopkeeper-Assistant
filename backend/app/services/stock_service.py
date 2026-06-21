from app.database.connection import SessionLocal
from app.models.product import Product
from fastapi import HTTPException


class StockService:

    @staticmethod
    def deduct_stock(product_id: int, quantity: int):

        db = SessionLocal()

        try:
            # STEP 1: FETCH PRODUCT
            product = db.query(Product).filter(Product.id == product_id).first()

            # STEP 2: CHECK IF PRODUCT EXISTS
            if not product:
                raise HTTPException(
                    status_code=404,
                    detail=f"Product {product_id} not found"
                )

            # STEP 3: CHECK STOCK AVAILABILITY
            if product.stock_quantity < quantity:
                raise HTTPException(
                    status_code=400,
                    detail=f"Insufficient stock for product {product_id}"
                )

            # STEP 4: DEDUCT STOCK
            product.stock_quantity -= quantity

            # STEP 5: SAVE TO DATABASE
            db.commit()
            db.refresh(product)

            # STEP 6: RETURN RESPONSE
            return {
                "status": "SUCCESS",
                "message": f"Stock updated for product {product_id}",
                "remaining_stock": product.stock_quantity
            }

        except HTTPException as he:
            db.rollback()
            raise he

        except Exception as e:
            db.rollback()
            raise HTTPException(status_code=500, detail=str(e))

        finally:
            db.close()