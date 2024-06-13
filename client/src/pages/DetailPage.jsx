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
            
            <RecipeCard recipeId={id} />
            <AddComment recipeId={id} /> 
            
            <button onClick={redirectToHome}>Back </button>
        </div>
    );
}

export default DetailPage;
