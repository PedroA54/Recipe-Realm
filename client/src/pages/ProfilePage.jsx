import React from "react";
import { Redirect } from "react-router-dom";


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
        </>
    );
}

export default  ProfilePage;