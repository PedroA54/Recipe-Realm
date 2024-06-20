import React from 'react';
import AddComment from '../components/Comment/CommentForm';
import RecipeCard from '../components/Recipe/RecipeCard';
import { useParams, Redirect} from 'react-router-dom';
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
