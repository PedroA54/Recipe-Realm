import React, { useContext } from "react";
import UserRecipes from "../components/Recipe/Usersrecipes";
import { Redirect } from "react-router-dom";
import Footer from "../components/Footer";
import { UserContext } from "../components/UserContext"; 

function ManagementPage() {
    const { user, handleLogout } = useContext(UserContext);

    
    if (!user) {
        return <Redirect to="/" />;
    }

    return (
        <>
        

        <div>
            <UserRecipes />
        </div>
            <div>
                <Footer />
            </div>
        </>
    );
}

export default  ManagementPage;