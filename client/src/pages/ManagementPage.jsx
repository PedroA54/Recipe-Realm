import React from "react";
import { Redirect } from "react-router-dom";
import UserRecipes from "../components/Recipe/Usersrecipes";
import Footer from "../components/Footer";
function ManagementPage({ user }) {
    if (user === null) {
        return <Redirect to="/" />
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