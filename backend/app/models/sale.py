from sqlalchemy import Column, Integer, Float, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime

from app.database.connection import Base


class Sale(Base):
    __tablename__ = "sales"

    id = Column(Integer, primary_key=True, index=True)

    # 👤 Customer reference
    customer_id = Column(
        Integer,
        ForeignKey("customers.id"),
        nullable=False
    )

    # 🧾 Unique bill / invoice number
    bill_number = Column(
        String,
        unique=True,
        nullable=False
    )

    # 📅 Sale timestamp
    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )

    # 💰 Total amount
    total_amount = Column(
        Float,
        default=0.0
    )

    # 💳 Payment details
    payment_method = Column(String, nullable=True)  # CASH / UPI / CARD

    payment_status = Column(
        String,
        default="PENDING"  # SUCCESS / FAILED / PENDING
    )

    transaction_id = Column(String, nullable=True)

    # 🔗 Relationships
    customer = relationship("Customer", backref="sales")
    items = relationship("SaleItem", back_populates="sale")