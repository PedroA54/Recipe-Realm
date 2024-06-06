import React, { useState, useEffect } from 'react';

function AllRecipes() {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        fetch('/recipes')
            .then(response => response.json())
            .then(data => setRecipes(data))
            .catch(error => console.error('Error fetching recipes:', error));
    }, []);

    return (
        <div>
            <h2>All Recipes</h2>
            {recipes.length === 0 ? (
                <p>No recipes available.</p>
            ) : (
                <ul>
                    {recipes.map(recipe => (
                        <li key={recipe.id}>
                            {recipe.name} - {recipe.description}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default AllRecipes;
