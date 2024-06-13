import React from 'react';
import { useParams } from 'react-router-dom';
import RecipeCard from '../components/Recipe/RecipeCard';
import AddComment from '../components/Comment/CommentForm';

function DetailPage({ user }) {
    const { id } = useParams();
    


    
    return (

        <div className="detail-page-container">
            <RecipeCard recipeId={id} />
            <AddComment recipeId={id} /> 
        </div>
    );
}

export default DetailPage;
