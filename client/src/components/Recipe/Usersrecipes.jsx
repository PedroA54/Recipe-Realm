import React, { useState, useEffect } from 'react';

function UserRecipes() {
    const [recipes, setRecipes] = useState([]);
    const [editRecipe, setEditRecipe] = useState(null);
    const [editedData, setEditedData] = useState({
        title: '',
        description: '',
        ingredients: '',
        instructions: ''
    });

    useEffect(() => {
        fetch('/recipesuser')
            .then(response => response.json())
            .then(data => setRecipes(data))
            .catch(error => console.error('Error fetching recipes:', error));
    }, []);

    const handleDelete = (recipeId) => {
        fetch(`/recipes/${recipeId}`, {  // Update endpoint for DELETE request
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
        // Set default values for editedData
        const selectedRecipe = recipes.find(recipe => recipe.id === recipeId);
        setEditedData({
            title: selectedRecipe.title,
            description: selectedRecipe.description,
            ingredients: selectedRecipe.ingredients,
            instructions: selectedRecipe.instructions
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
        fetch(`/recipes/${editRecipe}`, {  // Update endpoint for PATCH request
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(editedData)
        })
        .then(response => {
            if (response.ok) {
                // Update the recipe in the local state
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
        <div>
            <h2>All Recipes</h2>
            {recipes.length === 0 ? (
                <p>No recipes available.</p>
            ) : (
                <div>
                    {recipes.map(recipe => (
                        <div key={recipe.id}>
                            {editRecipe === recipe.id ? (
                                <div>
                                    {/* Form for editing recipe details */}
                                    <input type="text" name="title" value={editedData.title} onChange={handleChange} />
                                    <textarea name="description" value={editedData.description} onChange={handleChange}></textarea>
                                    <textarea name="ingredients" value={editedData.ingredients} onChange={handleChange}></textarea>
                                    <textarea name="instructions" value={editedData.instructions} onChange={handleChange}></textarea>
                                    <input type="text" name="photo" value={editedData.photo} onChange={handleChange} placeholder="Photo URL" />
                                    <button onClick={cancelEdit}>Cancel</button>
                                    <button onClick={saveEdit}>Save</button>
                                </div>
                            ) : (
                                <div>
                                    {/* Displaying recipe details */}
                                    <h3>{recipe.title}</h3>
                                    <p><strong>Description:</strong> {recipe.description}</p>
                                    <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
                                    <p><strong>Instructions:</strong> {recipe.instructions}</p>
                                    <p><strong></strong><img className='recipe-photo' src={recipe.photo} alt={recipe.title} style={{ maxWidth: '200px', maxHeight: '200px' }} /></p>
                                    <p><strong>Category:</strong> {recipe.tags.map(tag => tag.category).join(', ')}</p>
                                    <p><strong>Number Of Comments:</strong> {recipe.comments.length}</p>
                                    <button onClick={() => handleEdit(recipe.id)}>Edit</button>
                                    <button onClick={() => handleDelete(recipe.id)}>Delete</button>
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
