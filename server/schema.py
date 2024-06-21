import re
from config import ma
from models import User, Recipe, Tag, Comment
from marshmallow import fields, ValidationError, validates


class UserSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = User
        load_instance = True
        exclude = ("_password_hash",)

    @validates("userName")
    def validate_userName(self, value):
        if not value:
            raise ValidationError("userName cannot be empty")
        if len(value) > 10:
            raise ValidationError("userName cannot exceed 10 characters")

    @validates("email")
    def validate_email(self, value):
        if not isinstance(value, str):
            raise ValidationError("Email must be a string.")
        elif not 5 <= len(value) <= 40:
            raise ValidationError("Email must be between 5 and 40 characters.")
        email_regex = r"[^@]+@[^@]+\.[^@]+"
        if not re.match(email_regex, value):
            raise ValidationError("Invalid email format.")

    @validates("about_me")
    def validate_about_me(self, value):
        if value and len(value) > 300:
            raise ValidationError("about_me cannot exceed 300 characters")


class RecipeSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Recipe
        load_instance = True
        exclude = ("photo_url",)


class TagSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Tag
        load_instance = True


class CommentSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Comment
        load_instance = True
