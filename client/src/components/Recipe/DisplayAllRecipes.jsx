import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function AllRecipes() {
    const [recipes, setRecipes] = useState([]);
    const history = useHistory();

    useEffect(() => {
        fetch('/recipes')
            .then(response => response.json())
            .then(data => setRecipes(data))
            .catch(error => console.error('Error fetching recipes:', error));
    }, []);

    const handleViewClick = (id) => {
        history.push(`/detail/${id}`);
    };

    return (
        <div>
            <h2>All Recipes</h2>
            {recipes.length === 0 ? (
                <p>No recipes available.</p>
            ) : (
                <div>
                    {recipes.map(recipe => (
                        <div key={recipe.id}>
                            <h3>{recipe.title}</h3>
                            <p><strong>Description:</strong> {recipe.description}</p>
                            <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
                            <p><strong>Instructions:</strong> {recipe.instructions}</p>
                            <p><strong>Category:</strong> {recipe.tags.map(tag => tag.category).join(', ')}</p>
                            <p><strong>Number Of Comments:</strong> {recipe.comments.length}</p>
                            <button onClick={() => handleViewClick(recipe.id)}>View</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default AllRecipes;
