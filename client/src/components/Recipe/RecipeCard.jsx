import React from 'react';

function RecipeCard({ recipe }) {
    return (
        <div className="recipe-card">
            <h3>{recipe.title}</h3>
            <p><strong>Description:</strong> {recipe.description}</p>
            <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
            <p><strong>Instructions:</strong> {recipe.instructions}</p>
            <p><strong>Category:</strong> {recipe.tags.map(tag => tag.category).join(', ')}</p>
        </div>
    );
}

export default RecipeCard;
