import React from "react";
import { Redirect } from "react-router-dom";
import AddRecipe from "../components/Recipe/RecipeForm";
import AllRecipes from "../components/Recipe/DisplayRecipes";

function HomePage({ user }) {
    if (user === null) {
        return <Redirect to="/login" />
    }
    return (
        
            <>
            <header>
                <h1>HomePage</h1>
            </header>
            

            <div>

                <AddRecipe />
                <AllRecipes />
            </div>
            
            </>
            
        
        
    );
}

export default HomePage;