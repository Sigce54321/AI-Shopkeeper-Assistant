from sqlalchemy import Column, Integer, Float, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime

from app.database.connection import Base


class Sale(Base):
    __tablename__ = "sales"

    id = Column(Integer, primary_key=True, index=True)

    # 👤 Customer link
    customer_id = Column(
        Integer,
        ForeignKey("customers.id"),
        nullable=False
    )

    # 🧾 Invoice number
    bill_number = Column(
        String,
        unique=True,
        nullable=False
    )

    # 📅 Timestamp
    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )

    # 💰 Billing amount
    total_amount = Column(
        Float,
        default=0.0
    )

    # 💳 Payment details
    payment_method = Column(String, nullable=True)
    
    payment_status = Column(
        String,
        default="PENDING"
    )

    transaction_id = Column(String, nullable=True)

    # 🔗 Relationship (important for joins later)
    customer = relationship("Customer")