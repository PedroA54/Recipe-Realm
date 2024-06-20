import React, { useContext } from "react";
import Profile from "../components/User/Profile";
import { Redirect } from "react-router-dom";
import Footer from "../components/Footer";
import { UserContext } from "../components/UserContext"; 


function ProfilePage() {
    const { user, handleLogout } = useContext(UserContext);

    
    if (!user) {
        return <Redirect to="/" />;
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