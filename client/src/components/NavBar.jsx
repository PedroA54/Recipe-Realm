import React from "react";
import { NavLink} from "react-router-dom";


function NavBar({ user, onLogout }) {
    return (
        <nav className="navbar">

            {user ? (
                <>
                    <h1 className="Title-nav-bar"> Recipe Realm</h1>
                    <NavLink to="/" className='nav-link' onClick={onLogout}>Logout</NavLink>
                    
                    <NavLink to="/profile" className='nav-link'>
                        Profile
                    </NavLink>
                
                    <NavLink to="/management" className='nav-link'>
                        Manage
                    </NavLink>
                
                    <NavLink to="/home" className='nav-link'>
                        Home
                    </NavLink>
                
                    
                    
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