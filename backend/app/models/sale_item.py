from sqlalchemy import Column, Integer, Float, ForeignKey
from sqlalchemy.orm import relationship

from app.database.connection import Base


class SaleItem(Base):
    __tablename__ = "sale_items"

    id = Column(Integer, primary_key=True, index=True)

    # 🔗 Link to Sale
    sale_id = Column(
        Integer,
        ForeignKey("sales.id"),
        nullable=False
    )

    # 🔗 Link to Product
    product_id = Column(
        Integer,
        ForeignKey("products.id"),
        nullable=False
    )

    # 📦 Quantity purchased
    quantity = Column(Integer, nullable=False)

    # 💰 Price per unit at time of sale
    price = Column(Float, nullable=False)

    # 🔗 Relationships (for joins and invoice generation)
    sale = relationship("Sale", back_populates="items")
    product = relationship("Product")