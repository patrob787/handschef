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

class Users(Resource):
    def get(self):
        users = [user.to_dict() for user in User.query.all()]

        return users, 200
    
    def post(self):
        
        try:
            new_user = User(
                first_name = request.form['first_name'],
                last_name = request.form['last_name'],
                avatar = request.form['avatar'],
                admin = request.form['admin'],
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


if __name__ == '__main__':
    app.run(port=5555, debug=True)
