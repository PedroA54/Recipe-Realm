import React, { useContext } from "react";
import AddComment from '../components/Comment/CommentForm';
import RecipeCard from '../components/Recipe/RecipeCard';
import { useParams, Redirect } from 'react-router-dom';
import Footer from "../components/Footer";
import { UserContext } from "../components/UserContext"; // Import UserContext

function DetailPage() {
    const { id } = useParams();
    const { user } = useContext(UserContext); // Use useContext to get user from UserContext

    if (!user) {
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
