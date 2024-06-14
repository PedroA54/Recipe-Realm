import React from "react";
import { Redirect } from "react-router-dom";
import Profile from "../components/User/Profile";

function ProfilePage({ user }) {
    if (user === null) {
        return <Redirect to="/" />
    }
    return (
        <>
        
        <header>
        <h1 className="profile-header">{user ? `${user.userName}'s Profile Page`: `Profiles`}</h1>
        </header>
        <div>
        <Profile />
        </div>
        </>
    );
}

export default  ProfilePage;