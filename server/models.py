from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property

from config import db

# Models go here!

#Users table
class User(db, SerializerMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)
    avatar = db.Column(db.String)
    admin = db.Column(db.Boolean, default=False)
    emp_code = db.Column(db.Integer, unique=True, nullable=False)
    job_code = db.Column(db.Integer, nullable=False)
    start_date = db.Column(db.DateTime, server_default=db.func.now())

    def __repr__(self):
        return f"<Employee: {self.emp_code}, Name: {self.first_name} {self.last_name}>"

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