import React, { useState, useEffect } from 'react';

function RecipeCard({ recipeId }) {
    const [recipe, setRecipe] = useState(null);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        // Fetch recipe details
        fetch(`/recipes/${recipeId}`)
            .then(response => response.json())
            .then(data => setRecipe(data))
            .catch(error => console.error('Error fetching recipe:', error));

        // Fetch comments
        fetch(`/recipes/${recipeId}/comments`)
            .then(response => response.json())
            .then(data => setComments(data))
            .catch(error => console.error('Error fetching comments:', error));
    }, [recipeId]);

    if (!recipe) {
        return <div>Loading...</div>;
    }

    return (
        <div className="recipe-card">
            <h2>{recipe.title}</h2>
            <p><img  src={recipe.photo_url} alt={recipe.title} style={{ maxWidth: '200px', maxHeight: '200px' }} /></p>
            <p>{recipe.description}</p>
            <h3>Ingredients</h3>
            <ul>
                {recipe.ingredients.split(',').map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                ))}
            </ul>
            <h3>Instructions</h3>
            <p>{recipe.instructions}</p>
            <h3>Comments</h3>
            <ul>
                {comments.map(comment => (
                    <li key={comment.id}>{comment.comment}</li>
                ))}
            </ul>
        </div>
    );
}

export default RecipeCard;
