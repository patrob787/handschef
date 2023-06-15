#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, session, make_response
from flask_restful import Resource

# Local imports
from config import app, db, api
from models import User, Item, SubItem, Check, Order, Modifier

# Views go here!

if __name__ == '__main__':
    app.run(port=5555, debug=True)
