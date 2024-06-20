import React from "react";
import AllRecipes from "../components/Recipe/DisplayAllRecipes";
import AddRecipe from "../components/Recipe/RecipeForm";
import { Redirect } from "react-router-dom";
import Footer from "../components/Footer";
import '../styles/HomePage.css';


function HomePage({ user }) {
    if (user === null) {
        return <Redirect to="/" />;
    }
    return (
        <> 
            <div className="home-page-container">
            <div className="top-row">
                <p className="welcome-p">Welcome to Recipe Realm, your ultimate destination 
                for discovering and sharing mouth-watering recipes from
                around the world! Whether you're a seasoned chef or a kitchen
                novice, our platform offers an extensive collection of delicious 
                recipes to suit every taste and occasion. Dive into our treasure trove 
                of culinary delights, explore new flavors, and find inspiration for 
                your next meal. Have a favorite recipe of your own? We invite you to join 
                our community of food enthusiasts by submitting your unique creations for 
                others to enjoy. Together, let’s make cooking an exciting and communal experience.
                Happy cooking!
                </p>
                
                <AddRecipe className="add-recipe" />
                
            </div>
                <AllRecipes className="all-recipes" />
            </div>
            
            <div>
                <Footer />
            </div>
        </>
    );
}

export default HomePage;
