import React, { useState } from 'react';

function AddComment({ recipeId }) {
    const [comment, setComment] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    
    const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setSuccess(false);
    
    try {
        const response = await fetch(`/recipes/${recipeId}/comments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ comment }),
        });
        
        if (response.ok) {
        setComment('');
        setSuccess(true);
        } else {
        const errorData = await response.json();
        setError(errorData.message || 'Something went wrong');
        }
    } catch (err) {
        setError('An error occurred: ' + err.message);
    }
    };
    
    return (
    
    <div className="comment-recipe-container">
        <form onSubmit={handleSubmit}>
        <div className="add-comment-form">
            <label className="add-comment-title" > Add Comment</label>
            
            <input className="comment-input"
            type="text"
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
            />
        </div>
                <div className="submit-button-container">
                    <button type="submit" className="submit-button">Submit</button>
                </div>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>Comment added successfully!</p>}
    </div>
    );
}

export default AddComment;
