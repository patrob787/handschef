from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property

from config import db

# Models go here!
class User(db, SerializerMixin):
    __tablename__ = "users"

    def __repr__(self):
        pass

class Item(db, SerializerMixin):
    __tablename__ = "items"

    def __repr__(self):
        pass

class Check(db, SerializerMixin):
    __tablename__ = "checks"

    def __repr__(self):
        pass

class Order(db, SerializerMixin):
    __tablename__ = "orders"

    def __repr__(self):
        pass