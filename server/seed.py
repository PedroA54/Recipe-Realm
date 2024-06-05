# Standard library imports
from random import randint, choice as rc


# Local imports
from app import app
from config import db
from models import User, Recipe, RecipeTag, Tag, Comment

if __name__ == "__main__":
    with app.app_context():

        print("Starting seed...")

        # Users

        u1 = User(id=1, userName="username1", _password_hash="password_hash1")
        u2 = User(id=2, userName="username2", _password_hash="password_hash2")

        db.session.add_all([u1, u2])
        db.session.commit()

        # Recipes
        # id, title, description, ingredients, instructions user_id

        r1 = Recipe(
            title="Pasta",
            description="A classic Italian dish",
            ingredients="Pasta, tomato sauce, garlic, olive oil, salt, pepper",
            instructions=" Boil pasta in salted water until al dente. In a separate pan, heat olive oil and sauté minced garlic until fragrant.  Add tomato sauce and simmer for 10 minutes.  Toss cooked pasta with the sauce. Season with salt and pepper to taste.",
            user_id=1,
        )

        r2 = Recipe(
            title="Burger",
            description="An American classic",
            ingredients="Ground beef, burger buns, lettuce, tomato, onion, cheese, ketchup, mustard",
            instructions=" Divide ground beef into patties and season with salt and pepper.  Grill or fry the patties until cooked to your liking.  Toast the burger buns on the grill or in a toaster.  Assemble the burger with lettuce, tomato, onion, cheese, ketchup, and mustard.  Serve hot.",
            user_id=2,
        )
        r3 = Recipe(
            title="Torta",
            description="A delicious dessert",
            ingredients="Flour, sugar, eggs, butter, milk, vanilla extract, baking powder",
            instructions=" Preheat oven to 350°F (175°C) and grease a baking pan.  In a mixing bowl, cream together butter and sugar until light and fluffy.  Add eggs one at a time, beating well after each addition.  Stir in vanilla extract.  Gradually add flour and baking powder alternately with milk, beginning and ending with flour.  Pour batter into prepared pan and bake for 30-35 minutes or until a toothpick inserted into the center comes out clean.  Let cool before serving.",
            user_id=2,
        )

        db.session.add_all([r1, r2, r3])
        db.session.commit()

        # Tag
        # id, category
        t1 = Tag(category="Italian")
        t2 = Tag(category="Mexican")
        t3 = Tag(category="Asian")
        t4 = Tag(category="Vegetarian")
        t5 = Tag(category="Indian")
        t6 = Tag(category="American")

        db.session.add_all([t1, t2, t3, t4, t5])
        db.session.commit()

        # Recipe Tag
        # recipe_id, user_id

        rt1 = RecipeTag(recipe_id=1, tag_id=1)
        rt2 = RecipeTag(recipe_id=2, tag_id=6)
        rt3 = RecipeTag(recipe_id=3, tag_id=2)

        db.session.add_all([rt1, rt2, rt3])
        db.session.commit()

        # Comment
        # comment, recipe_id, user_id

        c1 = Comment(comment="wow great recipe", recipe_id=1, user_id=2)
        c2 = Comment(comment="wow great recipe", recipe_id=2, user_id=1)

        db.session.add_all([c1, c2])
        db.session.commit()

print("Seeding finished.")
