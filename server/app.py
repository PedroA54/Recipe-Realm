#!/usr/bin/env python3

# Local imports
from config import api, app, bcrypt, db

# Remote library imports
from flask import jsonify, request, session
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError

# Add your model imports
from models import User, Recipe, Tag, RecipeTag, Like


@app.route("/")
def index():
    return "<h1>Project Server</h1>"


# ********
# User Authentication
# ********


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

        if user and user.authenticate(password):
            session["user_id"] = user.id
            return user.to_dict(), 200
        else:
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


# ********
# Recipe
# ********


class RecipeList(Resource):
    def get(self):
        recipes = Recipe.query.all()
        return [recipe.to_dict() for recipe in recipes], 200

    def post(self):
        data = request.get_json()
        new_recipe = Recipe(
            title=data["title"],
            description=data["description"],
            ingredients=data["ingredients"],
            instructions=data["instructions"],
            user_id=session.get("user_id"),
        )
        db.session.add(new_recipe)
        db.session.commit()
        return new_recipe.to_dict(), 201


class RecipeDetail(Resource):
    def get(self, id):
        recipe = Recipe.query.get_or_404(id)
        return recipe.to_dict(), 200

    def patch(self, id):
        recipe = Recipe.query.get_or_404(id)
        data = request.get_json()
        recipe.title = data.get("title", recipe.title)
        recipe.description = data.get("description", recipe.description)
        recipe.ingredients = data.get("ingredients", recipe.ingredients)
        recipe.instructions = data.get("instructions", recipe.instructions)
        db.session.commit()
        return recipe.to_dict(), 200

    def delete(self, id):
        recipe = Recipe.query.get_or_404(id)
        db.session.delete(recipe)
        db.session.commit()
        return "", 204


class LikeRecipe(Resource):
    def post(self, id):
        recipe = Recipe.query.get_or_404(id)
        user_id = session.get("user_id")
        user = User.query.get_or_404(user_id)
        if recipe not in user.liked_recipes:
            user.liked_recipes.append(recipe)
            db.session.commit()
        return recipe.to_dict(), 200


class UnlikeRecipe(Resource):
    def post(self, id):
        recipe = Recipe.query.get_or_404(id)
        user_id = session.get("user_id")
        user = User.query.get_or_404(user_id)
        if recipe in user.liked_recipes:
            user.liked_recipes.remove(recipe)
            db.session.commit()
        return recipe.to_dict(), 200


# Add resources to the API
api.add_resource(SignUp, "/signup")
api.add_resource(LogIn, "/login")
api.add_resource(LogOut, "/logout")
api.add_resource(CheckSession, "/check_session")
api.add_resource(UpdateUser, "/users/<int:id>")
api.add_resource(RecipeList, "/recipes")
api.add_resource(RecipeDetail, "/recipes/<int:id>")
api.add_resource(LikeRecipe, "/recipes/<int:id>/like")
api.add_resource(UnlikeRecipe, "/recipes/<int:id>/unlike")


@app.errorhandler(404)
def not_found(error):
    return {"error": str(error)}, 404


if __name__ == "__main__":
    app.run(port=5555, debug=True)
