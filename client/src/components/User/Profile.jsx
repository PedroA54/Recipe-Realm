
import React, { useState, useEffect } from 'react';

function Profile() {
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
    fetch('/user_profile')
        .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
        })
        .then(data => setProfile(data))
        .catch(error => setError(error.message));
    }, []);

    if (error) {
    return <div>Error: {error}</div>;
    }

    if (!profile) {
    return <div>Loading...</div>;
    }

    return (
    <div>
        <h1>Profile</h1>
        <img src={profile.photo_url} alt="User Profile" />
        <p><strong>Username:</strong> {profile.userName}</p>
        <p><strong>Email:</strong> {profile.email}</p>
        <p><strong>Phone:</strong> {profile.phone}</p>
    </div>
    );
}

export default Profile;
