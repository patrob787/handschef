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
    
    # def post(self):
    #     new_user = User(
    #         first_name = request.form['first_name']
    #     )
    
api.add_resource(Users, '/users')


if __name__ == '__main__':
    app.run(port=5555, debug=True)
