from config import bcrypt, db
from sqlalchemy import Column, ForeignKey, Integer, String, Text, DateTime
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates, relationship
from datetime import datetime
import itertools


# User #
class User(db.Model, SerializerMixin):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True)
    userName = Column(String(100), nullable=False, unique=True)
    _password_hash = Column(String(128), nullable=False)
    created_at = Column(DateTime, default=datetime.now)

    # Relationships
    recipes = relationship("Recipe", backref="user")
    comments = relationship("Comment", backref="user")

    @validates("userName")
    def validate_userName(self, _, userName):
        if not userName:
            raise ValueError("userName cannot be empty")
        if len(userName) > 100:
            raise ValueError("userName cannot exceed 100 characters")
        return userName

    @hybrid_property
    def password_hash(self):
        raise AttributeError("password is not readable")

    @password_hash.setter
    def password_hash(self, password):
        self._password_hash = bcrypt.generate_password_hash(password).decode("utf-8")

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password)

    def __repr__(self):
        return f"User(id={self.id}, userName='{self.userName}', created_at='{self.created_at}')"


# Recipe #
class Recipe(db.Model, SerializerMixin):
    __tablename__ = "recipes"
    id = Column(Integer, primary_key=True)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)
    ingredients = Column(Text, nullable=False)
    instructions = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.now)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    tag_id = Column(Integer, ForeignKey("tags.id", ondelete="CASCADE"), nullable=False)

    # Relationships
    comments = relationship("Comment", backref="recipe")
    tags = relationship("Tag", secondary="recipe_tags", backref="recipes")

    def __repr__(self):
        return f"Recipe(id={self.id}, title='{self.title}', description='{self.description}', ingredients='{self.ingredients}', instructions='{self.instructions}')"


# Food Type Tag #
class Tag(db.Model, SerializerMixin):
    __tablename__ = "tags"
    id = Column(Integer, primary_key=True)
    category = Column(String(100), unique=True, nullable=False)
    created_at = Column(DateTime, default=datetime.now)

    def __repr__(self):
        return f"Tag(id={self.id}, category='{self.category}')"


# Combines Tag With Recipe #
class RecipeTag(db.Model, SerializerMixin):
    __tablename__ = "recipe_tags"
    recipe_id = Column(
        Integer, ForeignKey("recipes.id", ondelete="CASCADE"), primary_key=True
    )
    tag_id = Column(
        Integer, ForeignKey("tags.id", ondelete="CASCADE"), primary_key=True
    )

    def __repr__(self):
        return f"RecipeTag(recipe_id={self.recipe_id}, tag_id={self.tag_id})"


# Comment On Recipes #
class Comment(db.Model, SerializerMixin):
    __tablename__ = "comments"
    id = Column(Integer, primary_key=True)
    comment = Column(String(300), nullable=False)
    created_at = Column(DateTime, default=datetime.now)
    recipe_id = Column(
        Integer, ForeignKey("recipes.id", ondelete="CASCADE"), nullable=False
    )
    user_id = Column(
        Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False
    )

    def __repr__(self):
        return f"Comment(id={self.id}, recipe_id={self.recipe_id}, user_id={self.user_id}, comment='{self.comment}')"
