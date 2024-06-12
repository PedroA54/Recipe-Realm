import React from "react";
import { NavLink } from "react-router-dom";
import Login from '../components/User/Login';



function EntryPage() {
    return (
        <>
            <h1>This is the entry page</h1>
            
            <section>
                <Login />
            
            </section>
            
            <NavLink to="/signup" >
                Sign Up
            </NavLink>
            
            
        </>
    );
}

export default EntryPage;