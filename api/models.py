from sqlalchemy import Column, Integer, String, ForeignKey, Text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship

Base = declarative_base()


class Item(Base):
    __tablename__ = 'item'

    id = Column(Integer, primary_key=True)
    name = Column(String())
    data = Column(Text())
    cart = relationship('CartFilling', backref='items')

    def __repr__(self):
        return {'id': self.id, 'name': self.name, 'src': self.data}


class CartFilling(Base):
    __tablename__ = 'cart_filling'

    id = Column(Integer, primary_key=True)
    item_id = Column(Integer, ForeignKey('item.id'))
    cart_id = Column(Integer, ForeignKey('cart.id'))


class Cart(Base):
    __tablename__ = 'cart'

    id = Column(Integer, primary_key=True)

    def __repr__(self):
        return {'id': self.id, 'items': self.items if hasattr(self, 'items') else []}
