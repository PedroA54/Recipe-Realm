import React from "react";
import { Redirect } from "react-router-dom";

function HomePage({ user }) {
    if (user === null) {
        return <Redirect to="/login" />
    }
    return (
        <>
        <h1> HomePage</h1>
        </>
    );
}

export default HomePage;