import random


class PaymentService:

    @staticmethod
    def process_payment(method: str, amount: float):

        # CASH is always successful
        if method == "CASH":
            return {
                "status": "SUCCESS",
                "message": "Cash received"
            }

        # UPI simulation (PhonePe / GPay)
        if method == "UPI":
            result = random.choices(
                ["SUCCESS", "FAILED", "PENDING"],
                weights=[70, 20, 10]  # realistic probability
            )[0]

            return {
                "status": result,
                "message": f"UPI payment {result.lower()}"
            }

        # CARD simulation
        if method == "CARD":
            result = random.choices(
                ["SUCCESS", "FAILED"],
                weights=[80, 20]
            )[0]

            return {
                "status": result,
                "message": f"Card payment {result.lower()}"
            }

        return {
            "status": "FAILED",
            "message": "Invalid payment method"
        }