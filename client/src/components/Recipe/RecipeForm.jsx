import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function AddRecipe() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [instructions, setInstructions] = useState('');
    const [tag, setTag] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/recipes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: title,
                    description: description,
                    ingredients: ingredients,
                    instructions: instructions,
                    tag: tag  // Corrected the variable name to lowercase and added missing comma
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to add recipe');
            }

            const newRecipe = await response.json();
            console.log('Recipe added:', newRecipe);

            // Set the success message
            setSuccessMessage('Recipe has been added');

            // Clear the form fields
            setTitle('');
            setDescription('');
            setIngredients('');
            setInstructions('');
            setTag('');

            // Navigate to the desired route after successful submission
            // history.push('/home');
        } catch (error) {
            console.error('Failed to add recipe:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add Recipe</h2>
            <div>
                <label>Title:</label>
                <textarea
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                ></textarea>
            </div>
            <div>
                <label>Description:</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                ></textarea>
            </div>
            <div>
                <label>Ingredients:</label>
                <textarea
                    value={ingredients}
                    onChange={(e) => setIngredients(e.target.value)}
                    required
                ></textarea>
            </div>
            <div>
                <label>Instructions:</label>
                <textarea
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    required
                ></textarea>
            </div>
            <div>
                <label>Category:</label>
                <select
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                    required
                >
                    <option value="">Select Category</option>
                    <option value="1">Italian</option>
                    <option value="2">Mexican</option>
                    <option value="3">Asian</option>
                    <option value="4">Vegetarian</option>
                    <option value="5">Indian</option>
                    <option value="6">American</option>
                </select>
            </div>
            <button type="submit">Add Recipe</button>
            {successMessage && <p>{successMessage}</p>}
        </form>
    );
}

export default AddRecipe;
