import React from "react";
import { NavLink } from "react-router-dom";
import Login from '../components/User/Login';


function EntryPage({ onLogin, user, setUser}) {
    return (
        <>
            <h1> Recipe Realm</h1>
            
            
            <section>
                <Login onLogin={onLogin} user={user} setUser={setUser}/>
            </section>
            
            <div className="log-in-link">
                <span>Not a member yet?</span>
                <NavLink to="/signup">
                    Sign Up
                </NavLink>
            </div>
        </>
    );
}

export default EntryPage;
