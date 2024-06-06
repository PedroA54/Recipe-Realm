import React from "react";
import { Redirect } from "react-router-dom";

function ManagementPage({ user }) {
    if (user === null) {
        return <Redirect to="/login" />
    }
    return (
        <>
        <h1>ManagementPage</h1>
        </>
    );
}

export default  ManagementPage;