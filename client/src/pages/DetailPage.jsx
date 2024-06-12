import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import RecipeCard from '../components/Recipe/RecipeCard';
import AddComment from '../components/Comment/CommentForm';

function DetailPage({ user }) {
    const { id } = useParams();
    const history = useHistory();

    const redirectToHome = () => {
        history.push('/home');
    };
    
    return (
        <div>
            <h2>Recipe Detail</h2>
            <RecipeCard recipeId={id} />
            <AddComment recipeId={id} /> 
            
            <button onClick={redirectToHome}>Back </button>
        </div>
    );
}

export default DetailPage;
