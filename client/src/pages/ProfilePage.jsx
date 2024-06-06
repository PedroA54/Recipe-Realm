import React from "react";
import { Redirect } from "react-router-dom";


function ProfilePage({ user }) {
    if (user === null) {
        return <Redirect to="/login" />
    }
    return (
        <>
        <h1>ProfilePage</h1>
        </>
    );
}

export default  ProfilePage;