import React from 'react';
import { useParams } from 'react-router-dom';
import RecipeCard from '../components/Recipe/RecipeCard';

function DetailPage({ user }) {
    const { id } = useParams();
    
    return (
        <div>
            <h2>Recipe Detail</h2>
            <RecipeCard recipeId={id} />
        </div>
    );
}

export default DetailPage;
