#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, session, make_response
from flask_restful import Resource

# Local imports
from config import app, db, api
from models import User, Item, SubItem, Check, Order, Modifier

# Views go here!
app.route('/')
def home():
    return "Welcome to the Handchef API!!"


# USER VIEWS
class Users(Resource):
    def get(self):
        users = [user.to_dict() for user in User.query.all()]

        return users, 200
    
    def post(self):
        
        try:
            new_user = User(
                first_name = request.form['first_name'],
                last_name = request.form['last_name'],
                password = request.form['password'],
                avatar = request.form['avatar'],
                admin = request.form['admin'],
                emp_code = request.form['emp_code']
            )

            db.session.add(new_user)
            db.session.commit()

            return new_user.to_dict(), 201
        except:
            return {"error": "400 Validation Error"}, 400
    
api.add_resource(Users, '/users')

class UserById(Resource):
    def get(self, id):
        user = User.query.filter_by(id=id).first()

        if user:
            return user.to_dict(), 200
        else:
            return {"error": "404 User not Found"}, 404
        
    def patch(self, id):
        user = User.query.filter_by(id=id).first()

        if user:
            for attr in request.json():
                setattr(user, attr, request.json()[attr])
            
            db.session.add(user)
            db.session.commit()

            return user.to_dict(), 202
        else:
            return {"error": "404 User not found"}, 404
        
    def delete(self, id):
        user = User.query.filter_by(id=id).first()

        if user:
            db.session.delete(user)
            db.session.commit()

            return {"message": "delete successful"}, 204
        
        else:
            return {"error": "404 User not found"}, 404
        
api.add_resource(UserById, '/users/<int:id>')

class ChecksByUser(Resource):
    def get(self, id):
        userChecks = [check.to_dict() for check in Check.query.filter(Check.user_id == id).all()]

        return userChecks, 200
    
api.add_resource(ChecksByUser, "/checks/user/<int:id>")

# CHECK VIEWS
class Checks(Resource):
    def get(self):
        
        return [check.to_dict() for check in Check.query.all()], 200
    
    def post(self):
        
        new_check = Check(
            user_id = request.json["user_id"],
            table_number = request.json["table_number"]
        )

        db.session.add(new_check)
        db.session.commit()

        return new_check.to_dict(), 201
    
api.add_resource(Checks, "/checks")

class ChecksById(Resource):
    def get(self, id):
        try:
            check = Check.query.filter_by(id=id).first().to_dict()

            return check, 200
        except:
            return {"error": "404 Check not found"}, 404
        
    def patch(self, id):
        try:
            check = Check.query.filter_by(id=id).first()

            for attr in request.json:
                setattr(check, attr, request.json[attr])

            db.session.add(check)
            db.session.commit()

            return check.to_dict(), 201
        except:
            return {"error": "400 Failed"}, 400
        
    def delete(self, id):
        try:
            check = Check.query.filter_by(id=id).first()

            db.session.delete(check)
            db.session.commit()

            return {}, 202
        except:
            return {"error", "404 Check not found"}, 404
        
api.add_resource(ChecksById, "/checks/<int:id>")

# ITEM VIEWS
class Items(Resource):
    def get(self):

        return [item.to_dict() for item in Item.query.all()], 200
    
api.add_resource(Items, "/items")

class ItemsByCategory(Resource):
    def get(self, cat):
        try:
            items = [item.to_dict() for item in Item.query.filter(Item.category == cat)]

            return items, 200
        
        except:
            return {"error": "404 Items not found."}, 404
        
api.add_resource(ItemsByCategory, "/items/<string:cat>")

# ORDER VIEWS
class Orders(Resource):
    def get(self):

        return [order.to_dict() for order in Order.query.all()], 200
    
    def post(self):
        try:
            new_order = Order(
                item_id = request.json["item_id"],
                check_id = request.json["check_id"],
                seat_number = request.json["seat_number"]
            )

            db.session.add(new_order)
            db.session.commit()

            return new_order.to_dict(), 201
        except:
            
            return {"error": "400 Order not acceptable"}, 400
        
api.add_resource(Orders, "/orders")

class OrdersByCheck(Resource):
    def get(self, id):
        
        try:
            orders = [order.to_dict() for order in Order.query.filter(Order.check_id == id).all()]

            return orders, 200
        except:
            return {"error": "404 cannot find orders"}, 404
        
api.add_resource(OrdersByCheck, "/orders/check/<int:id>")

# Authentication Routes
class SignUp(Resource):
    
    def post(self):
        
        try:
            new_user = User(
                    first_name = request.json['first_name'],
                    last_name = request.json['last_name'],
                    password = request.json['password'],
                    emp_code = request.json['emp_code']
                )
            
            # print(new_user)
            
            db.session.add(new_user)
            db.session.commit()

            # session["user_id"] = new_user.id

            return new_user.to_dict(), 201
        
        except:
            return {"error": "401 Invalid"}, 401
    
api.add_resource(SignUp, "/signup")

class CheckSession(Resource):
    
    def get(self):

        if session.get("user_id"):
            user = User.query.filter(User.id == session["user_id"]).first()

            return user.to_dict(), 200
        
        else:
            return {"error": "401 No Session Detected"}, 401
        
api.add_resource(CheckSession, "/check_session")


class Login(Resource):
    
    def post(self):

        number = request.json["number"]
        password = request.json["password"]

        user = User.query.filter(User.emp_code == number).first()
        # print(user)

        if user:
            if user.password == password:
                session["user_id"] = user.id

                return user.to_dict(), 200
            
        else:
            return {"error": "401 Not Authorized"}, 401
        
api.add_resource(Login, "/login")
        

class Logout(Resource):
    
    def delete(self):
        if session.get("user_id"):
            session["user_id"] = None

            return {"message": "Logout Succesful"}, 204
        else:
            return {"error": "401 Unauthorized"}, 401
        
api.add_resource(Logout, "/logout")
    

if __name__ == '__main__':
    app.run(port=5555, debug=True)
