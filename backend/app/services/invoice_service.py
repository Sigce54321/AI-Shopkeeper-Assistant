from datetime import datetime


class InvoiceService:

    @staticmethod
    def generate_invoice(sale, sale_items):
        """
        Generates a structured invoice for completed sale
        """

        items_list = []
        subtotal = 0

        # STEP 1: BUILD ITEMS LIST
        for item in sale_items:
            item_total = item.quantity * item.price
            subtotal += item_total

            items_list.append({
                "product_id": item.product_id,
                "quantity": item.quantity,
                "price": item.price,
                "subtotal": item_total
            })

        # STEP 2: BUILD INVOICE
        invoice = {
            "invoice_id": sale.id,
            "customer_id": sale.customer_id,
            "date": datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S"),

            "payment_method": sale.payment_method,
            "payment_status": sale.payment_status,

            "items": items_list,

            "total_amount": sale.total_amount,
            "calculated_subtotal": subtotal,

            "status": "GENERATED"
        }

        return invoice