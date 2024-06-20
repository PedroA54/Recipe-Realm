import React from "react";
import Profile from "../components/User/Profile";
import { Redirect } from "react-router-dom";
import Footer from "../components/Footer";


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
            <div>
                <Footer />
            </div>
        </>
    );
}

export default  ProfilePage;