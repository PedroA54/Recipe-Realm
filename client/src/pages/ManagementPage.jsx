import React from "react";
import { Redirect } from "react-router-dom";
import UserRecipes from "../components/Recipe/Usersrecipes";

function ManagementPage({ user }) {
    if (user === null) {
        return <Redirect to="/login" />
    }
    return (
        <>
        <header>
        <h1>ManagementPage</h1>
        </header>

        <div>
            <UserRecipes />
        </div>
        </>
    );
}

export default  ManagementPage;