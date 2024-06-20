import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import '../../styles/DisplayRecipes.css';


function AllRecipes() {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const history = useHistory();
    
    useEffect(() => {
        fetch('/recipes')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setRecipes(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, []);
    
    const handleViewClick = (id) => {
        history.push(`/detail/${id}`);
    };
    
    if (loading) {
        return <p>Loading recipes...</p>;
    }
    
    if (error) {
        return <p>Error fetching recipes: {error.message}</p>;
    }
    
    return (
        <div className="recipe-container">
            <h2>All Recipes</h2>
            {recipes.length === 0 ? (
                <p>No recipes available.</p>
            ) : (
                <div className="recipes-grid">
                    {recipes.map(recipe => (
                        <div key={recipe.id} className="recipe-card">
                            <h3>{recipe.title}</h3>
                            <img src={recipe.photo_url} alt={recipe.title} className="recipe-photo" />
                            <p><strong></strong> {recipe.description}</p>
                            <p><strong>Ingredients:</strong> Click View to see details</p>
                            <p><strong>Instructions:</strong> Click View to see details</p>
                            <p><strong>Category:</strong> {recipe.tags.map(tag => tag.category).join(', ')}</p>
                            <p><strong>Number Of Comments:</strong> {recipe.comments.length}</p>
                            <div className="view-button-group">
                            <button onClick={() => handleViewClick(recipe.id)} className="view-button">View</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default AllRecipes;
