from config import bcrypt, db
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, Date, ForeignKey, Integer
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
import itertools

# Models


class User(db.Model, SerializerMixin):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    userName = db.Column(db.String(100), nullable=False)
    _password_hash = db.Column(db.String(128), nullable=False)

    # Relationships

    @validates("userName")
    def validate_userName(self, _, userName):
        if not userName:
            raise ValueError("userName cannot be empty")
        if len(userName) > 100:
            raise ValueError("userName cannot exceed 100 characters")
        return userName

    @hybrid_property
    def bookings(self):
        return list(itertools.chain(*self.bookings_per_animal))

    @hybrid_property
    def password_hash(self):
        raise AttributeError("password is not readable")

    @password_hash.setter
    def password_hash(self, password):
        self._password_hash = bcrypt.generate_password_hash(password).decode("utf-8")

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password)

    def __repr__(self):
        return f"User(id={self.id}, userName='{self.userName}')"


class Recipe:
    __tablename__ = "recipes"
    id = db.Column()
    title = db.Column()
    description = db.Column()
    ingredients = db.Column()
    instructions = db.Column()

    # Relationships

    def __repr__(self):
        return f"Recipe(id={self.id}, title='{self.title}', description='{self.description}', ingredients='{self.ingredients}', instructions='{self.instructions}')"


class Tag:
    __tablename__ = "tags"
    id = db.Column()
    category = db.Column()

    # Relationships


class RecipeTag:
    __tablename__ = ""


class Like:
    __tablename__ = ""
