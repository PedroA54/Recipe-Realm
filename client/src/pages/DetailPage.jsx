import React from "react";
import { Redirect } from "react-router-dom";

function DetailPage({ user }) {
    if (user === null) {
        return <Redirect to="/login" />
    }
    return (
        <>
        <h1>  DetailPage</h1>
        </>
    );
}

export default  DetailPage;