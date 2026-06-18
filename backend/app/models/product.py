from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import Float

from app.database.connection import Base


class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String, nullable=False)

    barcode = Column(String, unique=True)

    selling_price = Column(Float)

    cost_price = Column(Float)

    stock_quantity = Column(Integer)