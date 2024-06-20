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
        <header>
        <h1 className="profile-header">{user ? `${user.userName}'s Recipe's`: `Profiles`}</h1>
        </header>
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