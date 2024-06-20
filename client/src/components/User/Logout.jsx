import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { UserContext } from '../UserContext';

function LogOut() {
    const { setUser } = useContext(UserContext); 
    const [loggedOut, setLoggedOut] = useState(false);

    const handleLogout = async () => {
        try {
            const response = await fetch('/logout', {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Logout failed');
            }
            setUser(null); // Update user state to null upon successful logout
            setLoggedOut(true); // Set loggedOut state to true to trigger redirection
        } catch (error) {
            console.error('Logout failed:', error);
            toast.error('Logout failed. Please try again later.');
        }
    };

    if (loggedOut) {
        return <Redirect to="/entry" />; // Redirect to "/entry" after logout
    }

    return (
        <button onClick={handleLogout}>Log Out</button> // Render log out button
    );
}

export default LogOut;
