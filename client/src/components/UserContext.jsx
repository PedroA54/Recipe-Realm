
import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null); 

    const handleLogin = (userData) => {
    setUser(userData);
    };

    const handleLogout = () => {
    fetch('/logout', {
        method: 'DELETE',
        credentials: 'include'
    })
    .then(response => {
        if (response.ok) {
        setUser(null);
        }
    });
    };

    return (
    <UserContext.Provider value={{ user, handleLogin, handleLogout }}>
        {children}
    </UserContext.Provider>
    );
};
