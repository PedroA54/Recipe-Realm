import React, {useContext} from "react";
import { NavLink} from "react-router-dom";
import { UserContext } from "./UserContext";

function NavBar() {
    const {user, handleLogout} = useContext(UserContext)
    return (
        <nav className="navbar">
        
            {user ? (
                <>
                    <h1 className="Title-nav-bar"> Recipe Realm</h1>
                    
                    <NavLink to="/" className='nav-link' onClick={handleLogout}>Logout</NavLink>
                    
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