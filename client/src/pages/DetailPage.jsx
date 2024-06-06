import React from 'react';
import ReactModal from 'react-modal';
import { Redirect, useParams } from 'react-router-dom';


function DetailPage({ user }) {
    const { id } = useParams();

    if (user === null) {
        return <Redirect to="/login" />
    }

    return (
        <>
            <h1>DetailPage</h1>
            <p>Recipe ID: {id}</p>
            
        </>
    );
}

export default DetailPage;
