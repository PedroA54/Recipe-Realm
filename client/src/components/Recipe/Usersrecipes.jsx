import React, { useState, useEffect } from 'react';

function UserRecipes() {
    const [recipes, setRecipes] = useState([]);
    const [editRecipe, setEditRecipe] = useState(null);
    const [editedData, setEditedData] = useState({
        title: '',
        description: '',
        ingredients: '',
        instructions: '',
        
    });

    useEffect(() => {
        fetch('/recipesuser')
            .then(response => response.json())
            .then(data => setRecipes(data))
            .catch(error => console.error('Error fetching recipes:', error));
    }, []);

    const handleDelete = (recipeId) => {
        fetch(`/recipes/${recipeId}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (response.ok) {
                setRecipes(recipes.filter(recipe => recipe.id !== recipeId));
            } else {
                console.error('Error deleting recipe:', response.statusText);
            }
        })
        .catch(error => console.error('Error deleting recipe:', error));
    };

    const handleEdit = (recipeId) => {
        setEditRecipe(recipeId);
        const selectedRecipe = recipes.find(recipe => recipe.id === recipeId);
        setEditedData({
            title: selectedRecipe.title,
            description: selectedRecipe.description,
            ingredients: selectedRecipe.ingredients,
            instructions: selectedRecipe.instructions,
            photo_url: selectedRecipe.photo_url
        });
    };

    const cancelEdit = () => {
        setEditRecipe(null);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const saveEdit = () => {
        fetch(`/recipes/${editRecipe}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(editedData)
        })
        .then(response => {
            if (response.ok) {
                setRecipes(prevRecipes => prevRecipes.map(recipe => {
                    if (recipe.id === editRecipe) {
                        return { ...recipe, ...editedData };
                    }
                    return recipe;
                }));
                setEditRecipe(null);
            } else {
                console.error('Error updating recipe:', response.statusText);
            }
        })
        .catch(error => console.error('Error updating recipe:', error));
    };

    return (
        <div className="recipe-container-user">
            <h2>All Recipes</h2>
            {recipes.length === 0 ? (
                <p>No recipes available.</p>
            ) : (
                <div className="recipes-grid">
                    {recipes.map(recipe => (
                        <div key={recipe.id} className="recipe-card">
                            {editRecipe === recipe.id ? (
                                <form className="edit-form-user">
                                    <div className="edit-field">
                                    <input type="text" name="title" value={editedData.title} onChange={handleChange} className="edit-input" />
                                    <textarea name="description" value={editedData.description} onChange={handleChange} className="edit-textarea"></textarea>
                                    <textarea name="ingredients" value={editedData.ingredients} onChange={handleChange} className="edit-textarea"></textarea>
                                    <textarea name="instructions" value={editedData.instructions} onChange={handleChange} className="edit-textarea"></textarea>
                                    <button onClick={cancelEdit} className="cancel-button">Cancel</button>
                                    <button onClick={saveEdit} className="save-button">Save</button>
                                    </div>
                                </form>
                            ) : (
                                <div>
                                    <h3>{recipe.title}</h3>
                                    <img src={recipe.photo_url} alt={recipe.title} className="recipe-photo" />
                                    <p><strong>Description:</strong> {recipe.description}</p>
                                    <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
                                    <p><strong>Instructions:</strong> {recipe.instructions}</p>
                                    <p><strong>Category:</strong> {recipe.tags.map(tag => tag.category).join(', ')}</p>
                                    <p><strong>Number Of Comments:</strong> {recipe.comments.length}</p>
                                    <button onClick={() => handleEdit(recipe.id)} className="edit-button">Edit</button>
                                    <button onClick={() => handleDelete(recipe.id)} className="delete-button">Delete</button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default UserRecipes;
