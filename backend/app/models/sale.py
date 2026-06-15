from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import Float
from sqlalchemy import DateTime
from sqlalchemy import String
from sqlalchemy import ForeignKey

from datetime import datetime

from app.database.connection import Base


class Sale(Base):
    __tablename__ = "sales"

    id = Column(Integer, primary_key=True, index=True)

    customer_id = Column(
        Integer,
        ForeignKey("customers.id")
    )

    bill_number = Column(
        String,
        unique=True,
        nullable=False
    )

    date = Column(
        DateTime,
        default=datetime.utcnow
    )

    total_amount = Column(Float)

    payment_method = Column(String)

    payment_status = Column(String)

    transaction_id = Column(String)