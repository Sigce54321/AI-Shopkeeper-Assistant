import uuid
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.connection import SessionLocal
from app.models.sale import Sale
from app.models.sale_item import SaleItem

from app.schemas.checkout import CheckoutRequest

from app.services.payment_service import PaymentService
from app.services.stock_service import StockService
from app.services.invoice_service import InvoiceService

router = APIRouter(
    prefix="/sale",
    tags=["Checkout"]
)


# -------------------------
# DATABASE SESSION
# -------------------------
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# -------------------------
# CHECKOUT API
# -------------------------
@router.post("/checkout")
def checkout(
    data: CheckoutRequest,
    db: Session = Depends(get_db)
):
    try:

        customer_id = data.customer_id
        payment_method = data.payment_method
        cart = data.cart

        # -------------------------
        # CALCULATE TOTAL
        # -------------------------
        total_amount = 0

        for item in cart:
            total_amount += item.price * item.quantity

        # -------------------------
        # PROCESS PAYMENT
        # -------------------------
        payment = PaymentService.process_payment(
            payment_method,
            total_amount
        )

        # PAYMENT FAILED
        if payment["status"] == "FAILED":
            raise HTTPException(
                status_code=400,
                detail={
                    "message": "Payment Failed",
                    "reason": payment["message"]
                }
            )

        # PAYMENT PENDING
        if payment["status"] == "PENDING":
            return {
                "message": "Payment Pending",
                "status": "PENDING"
            }

        # -------------------------
        # CREATE SALE
        # -------------------------
        bill_number = f"BILL-{uuid.uuid4().hex[:8].upper()}"

        sale = Sale(
            customer_id=customer_id,
            bill_number=bill_number,
            total_amount=total_amount,
            payment_method=payment_method,
            payment_status=payment["status"]
        )

        db.add(sale)
        db.commit()
        db.refresh(sale)

        # -------------------------
        # CREATE SALE ITEMS
        # -------------------------
        sale_items = []

        for item in cart:

            StockService.deduct_stock(
                product_id=item.product_id,
                quantity=item.quantity
            )

            sale_item = SaleItem(
                sale_id=sale.id,
                product_id=item.product_id,
                quantity=item.quantity,
                price=item.price
            )

            db.add(sale_item)
            sale_items.append(sale_item)

        db.commit()

        # -------------------------
        # GENERATE INVOICE
        # -------------------------
        invoice = InvoiceService.generate_invoice(
            sale,
            sale_items
        )

        # -------------------------
        # RESPONSE
        # -------------------------
        return {
            "message": "Sale completed successfully",
            "bill_number": sale.bill_number,
            "total_amount": total_amount,
            "payment_method": payment_method,
            "payment_status": payment["status"],
            "invoice": invoice
        }

    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )