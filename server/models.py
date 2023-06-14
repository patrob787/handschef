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

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    image = db.Column(db.String)
    price = db.Column(db.Float, default=0)
    temperature = db.Column(db.Boolean, default=False)
    category = db.Column(db.String, nullable=False)
    menu = db.Column(db.String, nullable=False)
    count = db.Column(db.Integer)
    # allergies = db.Column(db.String)

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    def __repr__(self):
        return f"<Item: {self.name}, Price: {self.price}, Category: {self.category}>"

class SubItem(db, SerializerMixin):
    __tablename__ = "sub_items"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    image = db.Column(db.String)
    price = db.Column(db.Float, default=0)
    temperature = db.Column(db.Boolean, default=False)
    category = db.Column(db.String, nullable=False)
    menu = db.Column(db.String, nullable=False)
    stocked = db.Column(db.Boolean, default=True)
    # allergies = db.Column(db.String)

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    
    def __repr__(self):
        return f"<Sub-Item: {self.name}, Price: {self.price}, Category: {self.category}>"    

class Check(db, SerializerMixin):
    __tablename__ = "checks"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    table_number = db.Column(db.Integer, default=999)
    total = db.Column(db.Float, default=0)
    tax = db.Column(db.Float, default=0)
    paid = db.Column(db.Boolean, default=False)

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    def __repr__(self):
        return f"<Check #: {self.id}, Server: {self.user_id}, Total: {self.total}, Table: {self.table_number}>"

class Order(db, SerializerMixin):
    __tablename__ = "orders"

    def __repr__(self):
        pass

class Modifier(db, SerializerMixin):
    __tablename__ = "modifiers"

    def __repr__(self):
        pass