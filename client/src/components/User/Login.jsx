import React, { useState, useContext} from 'react';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import '../../styles/Login.css';
import { UserContext } from '../UserContext';

function LogIn() {
    const {user, handleLogin} = useContext(UserContext)
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userName: username, password: password }),
            credentials: 'include',
        })
            .then(response => response.json())
            .then(data => {
                if (data.id) {
                    handleLogin(data)
                } else {
                    console.error('Login failed:', data.errors);
                }
            })
            .catch(error => {
                console.error('Error logging in:', error);
            });
    };
    
    if (user) {
        return <Redirect to="/home" />
    }
    
    return (
        <form onSubmit={handleSubmit} className="login-container">
            <div className="login-input-group">
                <h2 className="login-heading"> Log in</h2>
                <label className="login-label">Username:</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="login-input"
                />
            </div>
            <div className="login-input-group">
                <label className="login-label"> Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="login-input"
                />
            </div>
            <button type="submit" className="login-button">Log In</button>
        </form>
    );
}

export default LogIn;
