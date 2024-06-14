import React from "react";
import { Redirect } from "react-router-dom";
import AddRecipe from "../components/Recipe/RecipeForm";
import AllRecipes from "../components/Recipe/DisplayAllRecipes";
import CategoryTag from "../components/Tags/CategoryTag";
import Footer from "../components/Footer";
function HomePage({ user }) {
    if (user === null) {
        return <Redirect to="/" />;
    }
    return (
        <> 
            <div className="home-page-container">
            <div className="top-row">
                <CategoryTag className="category-tag" />
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
