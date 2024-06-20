import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { UserContext } from '../UserContext';

function LogOut() {
    const {setUser, handleLogout} = useContext(UserContext)
    const [loggedOut, setLoggedOut] = useState(false);
    
    const handleLogout = async () => {
        try {
            const response = await fetch('/logout', {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Logout failed');
            }
            setUser(null); 
            setLoggedOut(true); 
        } catch (error) {
            console.error('Logout failed:', error);
            toast.error('Logout failed. Please try again later.');
        }
    };
    
    if (loggedOut) {
        return <Redirect to="/entry" />;
    }
    
    return (
        <button onClick={handleLogout}>Log Out</button>
    );
}

export default LogOut;