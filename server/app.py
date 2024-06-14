#!/usr/bin/env python3

# Local imports
from config import api, app, bcrypt, db

# Remote library imports
from flask import jsonify, request, session
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError, NoResultFound

# Add your model imports
from models import User, Recipe, Tag, Comment


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


class UserProfile(Resource):
    def get(self):
        user_id = session.get("user_id")
        if not user_id:
            return {"error": "Unauthorized"}, 401

        user = User.query.get(user_id)
        if not user:
            return {"error": "User not found"}, 404

        return {
            "photo_url": user.photo_url,
            "email": user.email,
            "phone": user.phone,
        }, 200

    def patch(self):
        user_id = session.get("user_id")
        if not user_id:
            return {"error": "Unauthorized"}, 401

        user = User.query.get(user_id)
        if not user:
            return {"error": "User not found"}, 404

        data = request.get_json()

        if "photo_url" in data:
            user.photo_url = data["photo_url"]
        if "email" in data:
            user.email = data["email"]
        if "phone" in data:
            user.phone = data["phone"]

        try:
            db.session.commit()
            return {
                "photo_url": user.photo_url,
                "email": user.email,
                "phone": user.phone,
            }, 200
        except IntegrityError as e:
            db.session.rollback()
            return {"errors": [str(e)]}, 422

    def delete(self):
        user_id = session.get("user_id")
        if not user_id:
            return {"error": "Unauthorized"}, 401

        user = User.query.get(user_id)
        if not user:
            return {"error": "User not found"}, 404

        db.session.delete(user)
        db.session.commit()
        session.pop("user_id", None)
        return "", 204


# Recipe
# ********


# Recipes made only by user
class RecipeListUser(Resource):
    def get(self):
        user_id = session.get("user_id")
        if not user_id:
            return {"error": "Unauthorized"}, 401

        try:
            user = User.query.get(user_id)
            if not user:
                return {"error": "User not found"}, 404

            recipes = Recipe.query.filter_by(user_id=user_id).all()
            return [recipe.to_dict() for recipe in recipes], 200
        except NoResultFound:
            return {"error": "No recipes found for this user"}, 404

    def post(self):
        user_id = session.get("user_id")
        if not user_id:
            return {"error": "Unauthorized"}, 401

        if request.is_json:
            data = request.get_json()
            tag_id = data.get("tag")

            try:
                tag = Tag.query.get(tag_id)
                if not tag:
                    return {"error": "Invalid tag"}, 400

                new_recipe = Recipe(
                    title=data["title"],
                    description=data["description"],
                    ingredients=data["ingredients"],
                    instructions=data["instructions"],
                    user_id=user_id,
                )
                new_recipe.tags.append(tag)

                db.session.add(new_recipe)
                db.session.commit()

                return new_recipe.to_dict(), 201
            except IntegrityError as e:
                db.session.rollback()
                return {"errors": [str(e)]}, 422

        return {"error": "Request must be JSON"}, 400


# All Recipes by any user
class RecipeListAll(Resource):
    def get(self):
        try:
            recipes = Recipe.query.all()
            return [recipe.to_dict() for recipe in recipes], 200
        except Exception as e:
            return {"error": str(e)}, 500

    def post(self):
        user_id = session.get("user_id")
        if not user_id:
            return {"error": "Unauthorized"}, 401

        if request.is_json:
            data = request.get_json()
            tag_id = data.get("tag")

            try:
                tag = Tag.query.get(tag_id)
                if not tag:
                    return {"error": "Invalid tag"}, 400

                new_recipe = Recipe(
                    title=data["title"],
                    description=data["description"],
                    ingredients=data["ingredients"],
                    instructions=data["instructions"],
                    user_id=user_id,
                    photo_url=data["photo"],
                )
                new_recipe.tags.append(tag)

                db.session.add(new_recipe)
                db.session.commit()

                return new_recipe.to_dict(), 201
            except IntegrityError as e:
                db.session.rollback()
                return {"errors": [str(e)]}, 422

        return {"error": "Request must be JSON"}, 400


class RecipeDetail(Resource):
    def get(self, id):
        recipe = Recipe.query.get_or_404(id)
        return recipe.to_dict(), 200

    def patch(self, id):
        recipe = Recipe.query.get_or_404(id)
        data = request.get_json()

        for field in [
            "title",
            "description",
            "ingredients",
            "instructions",
            "phot_url",
        ]:
            if field in data:
                setattr(recipe, field, data[field])

        db.session.commit()
        return recipe.to_dict(), 200

    def delete(self, id):
        recipe = Recipe.query.get_or_404(id)
        db.session.delete(recipe)
        db.session.commit()
        return "", 204


# *******
# Comment
# *******


class CommentRecipe(Resource):
    def get(self, id):
        comments = Comment.query.filter_by(recipe_id=id).all()
        return [comment.to_dict() for comment in comments], 200

    def post(self, id):
        data = request.get_json()
        user_id = session.get("user_id")
        new_comment = Comment(comment=data["comment"], user_id=user_id, recipe_id=id)
        db.session.add(new_comment)
        db.session.commit()
        return new_comment.to_dict(), 201

    def patch(self, id, comment_id):
        comment = Comment.query.get_or_404(comment_id)
        data = request.get_json()
        comment.comment = data.get("comment", comment.comment)
        db.session.commit()
        return comment.to_dict(), 200

    def delete(self, id, comment_id):
        comment = Comment.query.get_or_404(comment_id)
        db.session.delete(comment)
        db.session.commit()
        return "", 204


# ****
# Tag
# ****


class TagList(Resource):
    def get(self):
        tags = Tag.query.all()
        return [tag.to_dict() for tag in tags], 200


# Add resources to the API
api.add_resource(SignUp, "/signup")
api.add_resource(LogIn, "/login")
api.add_resource(LogOut, "/logout")
api.add_resource(CheckSession, "/check_session")
api.add_resource(UpdateUser, "/users/<int:id>")
api.add_resource(RecipeListAll, "/recipes")
api.add_resource(RecipeListUser, "/recipesuser")
api.add_resource(RecipeDetail, "/recipes/<int:id>")
api.add_resource(CommentRecipe, "/recipes/<int:id>/comments")
api.add_resource(TagList, "/tags")
api.add_resource(UserProfile, "/user_profile")


@app.errorhandler(404)
def not_found(error):
    return {"error": str(error)}, 404


if __name__ == "__main__":
    app.run(port=5555, debug=True)
