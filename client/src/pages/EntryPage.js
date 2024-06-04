import React from "react";
import { NavLink } from "react-router-dom";
import Login from '../components/User/Login';
import Logout from '../components/User/Logout';


function EntryPage() {
    return (
        <>
            <h1>This is the entry page</h1>
            
            <section>
                <Login />
                <Logout />
            </section>
            
            <NavLink to="/signup" >
                Sign Up
            </NavLink>
            
            
        </>
    );
}

export default EntryPage;