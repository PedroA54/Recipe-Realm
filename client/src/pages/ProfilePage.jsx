import React from "react";
import { Redirect } from "react-router-dom";
import Profile from "../components/User/Profile";

function ProfilePage({ user }) {
    if (user === null) {
        return <Redirect to="/" />
    }
    return (
        <>
        <h1>ProfilePage</h1>
        <header>
        <h1 className="profile-header">{user ? `${user.userName}'s Profile Page` : 'Profile'}</h1>
        </header>

        <Profile />
        </>
    );
}

export default  ProfilePage;