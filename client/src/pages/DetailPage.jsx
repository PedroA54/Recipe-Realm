import React from 'react';
import { useParams } from 'react-router-dom';
import RecipeCard from '../components/Recipe/RecipeCard';
import AddComment from '../components/Comment/CommentForm';

function DetailPage({ user }) {
    const { id } = useParams();
    
    return (
        <div>
            <h2>Recipe Detail</h2>
            <RecipeCard recipeId={id} />
            <AddComment recipeId={id} /> {}
        </div>
    );
}

export default DetailPage;
