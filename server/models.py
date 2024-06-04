from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from config import bcrypt, db
import itertools

# Models


class User(db.Model, SerializerMixin):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    userName = db.Column(db.String(100), nullable=False)
    _password_hash = db.Column(db.String(128), nullable=False)

    # Relationships

    recipes = db.relationship("Recipe", backref="author", lazy=True)  # One-To-Many
    liked_recipes = db.relationship(
        "Recipe", secondary="likes", backref=db.backref("likes", lazy="dynamic")
    )

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
    users_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    # Relationships

    tags = db.relationship(
        "Tag", secondary="recipe_tags", backref=db.backref("recipes", lazy="dynamic")
    )

    def __repr__(self):
        return f"Recipe(id={self.id}, title='{self.title}', description='{self.description}', ingredients='{self.ingredients}', instructions='{self.instructions}')"


class Tag(db.Model, SerializerMixin):
    __tablename__ = "tags"
    id = db.Column(db.Integer, primary_key=True)
    category = db.Column(db.String, unique=True, nullable=False)

    def __repr__(self):
        return f"Tag(id={self.id}, category='{self.category}')"


class RecipeTag(db.Model, SerializerMixin):
    __tablename__ = "recipe_tags"
    recipe_id = db.Column(db.Integer, db.ForeignKey("recipes.id"), primary_key=True)
    tag_id = db.Column(db.Integer, db.ForeignKey("tags.id"), primary_key=True)


class Like(db.Model, SerializerMixin):
    __tablename__ = "likes"
    recipe_id = db.Column(db.Integer, db.ForeignKey("recipes.id"), primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), primary_key=True)
