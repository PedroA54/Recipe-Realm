#!/usr/bin/env python3

# Standard library imports

# Local imports
from config import api, app, bcrypt, db

# Remote library imports
from flask import Flask, jsonify, request, session
from flask_migrate import Migrate
from flask_restful import Api, Resource
from flask_sqlalchemy import SQLAlchemy

# Add your model imports
from models import User, Recipe, Tag, RecipeTag, Like
from sqlalchemy.exc import IntegrityError


@app.route("/")
def index():
    return "<h1>Project Server</h1>"


# *****
# USER
# *****


class SignUp(Resource):
    def post(self):
        data = request.get_json()
        username = data.get("userName")
        password = data.get("password")
        try:
            user = User(userName=username)
            user.password_hash = password
            db.session.add(user)
            db.session.commit()
            session["user_id"] = user.id
            return user.to_dict(), 201
        except IntegrityError as e:
            db.session.rollback()
            return {"errors": [str(e)]}, 422


class LogIn(Resource):
    def post(self):
        data = request.get_json()
        username = data.get("userName")
        password = data.get("password")
        user = User.query.filter_by(userName=username).first()

        if user:
            print(f"User found: {user}")
            hashed_password = user._password_hash
            print(f"Stored hashed password: {hashed_password}")

            if bcrypt.check_password_hash(hashed_password, password):
                session["user_id"] = user.id
                return user.to_dict(), 200
            else:
                print("Password does not match")
                return {"errors": ["Invalid username or password"]}, 401
        else:
            print("User not found")
            return {"errors": ["Invalid username or password"]}, 401


class LogOut(Resource):
    def delete(self):
        session.pop("user_id", None)
        return "", 204


class CheckSession(Resource):
    def get(self):
        user_id = session.get("user_id")
        if user_id:
            user = User.query.filter_by(id=user_id).first()
            if user:
                return user.to_dict(), 200
        return {"error": "User not found"}, 401


class UpdateUser(Resource):
    def patch(self, id):
        user = User.query.get_or_404(id)
        data = request.get_json()
        user.userName = data.get("userName", user.userName)
        if "password" in data:
            user.password_hash = data["password"]
        db.session.commit()
        return {"message": "User updated successfully"}, 200


# *******
# Recipe
# *******

# ****
# Tag
# ****

# ***********
# Recipe Tag
# **********

# *****
# Like
# *****


# End-Points


api.add_resource(SignUp, "/signup")
api.add_resource(LogIn, "/login")
api.add_resource(LogOut, "/logout")
api.add_resource(CheckSession, "/check_session")
api.add_resource()
api.add_resource()
api.add_resource()
api.add_resource()


@app.errorhandler(404)
def not_found(error):
    return {"error": str(error)}, 404


if __name__ == "__main__":
    app.run(port=5555, debug=True)
