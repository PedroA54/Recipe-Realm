import React from 'react';
import { useParams, Redirect} from 'react-router-dom';
import RecipeCard from '../components/Recipe/RecipeCard';
import AddComment from '../components/Comment/CommentForm';
import Footer from "../components/Footer";

function DetailPage({ user }) {
    const { id } = useParams();
    if (user === null) {
        return <Redirect to="/" />;
    }
    
    
    return (
    <>
        <div className="detail-page-container">
            <RecipeCard recipeId={id} />
            <AddComment recipeId={id} /> 
        </div>
        <div>
            <Footer />
        </div>
    </>


    );
}

export default DetailPage;
