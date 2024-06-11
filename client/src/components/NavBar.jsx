import React from "react";
import { NavLink} from "react-router-dom";


function NavBar({ user, onLogout }) {
    return (
        <nav className="navbar">

            {user ? (
                <>
                    <NavLink to="/home" >
                        Home
                    </NavLink>
                    <NavLink to="/management" >
                        Manage
                    </NavLink>
                    <NavLink to="/profile" >
                        Profile
                    </NavLink>

                    <button onClick={onLogout} >
                        Log Out
                    </button>
                </>
            ) : (
                <>
                    <NavLink to="/login" >
                        Log In
                    </NavLink>
                    <NavLink to="/signup" >
                        Sign Up
                    </NavLink>
                </>
            )}
        </nav>
    );
}

export default NavBar;