import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { UserContext } from '../UserContext';
import '../../styles/Signup.css';

function SignUp() {
    const { user, handleLogin } = useContext(UserContext);
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userName, password }),
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.errors ? errorData.errors.join(', ') : 'Sign Up failed');
            }
            
            const data = await response.json();
            handleLogin(data); // Update user state upon successful signup
        } catch (error) {
            console.error('Sign Up failed:', error);
            toast.error(error.message);
        }
    };
    
    if (user) {
        return <Redirect to="/home" />;
    }
    
    return (
        <form onSubmit={handleSubmit} className="signup-container">
            <h2 className="signup-heading">Sign Up</h2>
            <div className="signup-input-group">
                <label className="signup-label">Username:</label>
                <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    required
                    className="signup-input"
                />
            </div>
            <div className="signup-input-group">
                <label className="signup-label">Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="signup-input"
                />
            </div>
            <button type="submit" className="signup-button">Sign Up</button>
        </form>
    );
}

export default SignUp;
