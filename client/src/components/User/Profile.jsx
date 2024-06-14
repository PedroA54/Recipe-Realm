import React, { useState, useEffect } from 'react';

function Profile() {
    const [profile, setProfile] = useState({
    
    photo_url: "",
    email: "",
    phone: "",
    
    });
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

    const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
        ...prevProfile,
        [name]: value,
    }));
    };

    const handleUpdate = () => {
    fetch('/user_profile', {
        method: 'PATCH',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(profile),
    })
        .then(response => {
        if (!response.ok) {
            throw new Error('Failed to update profile');
        }
        return response.json();
        })
        .then(data => setProfile(data))
        .catch(error => setError(error.message));
    };

    const handleDelete = () => {
    fetch('/user_profile', {
        method: 'DELETE',
    })
        .then(response => {
        if (response.ok) {
          // Handle user logout or redirection after deletion
          // For now, just resetting the profile state
            setProfile(null);
        } else {
            throw new Error('Failed to delete profile');
        }
        })
        .catch(error => setError(error.message));
    };

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
        
        <p>
        <strong>Email:</strong>
        <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
        />
        </p>
        <p>
        <strong>Phone:</strong>
        <input
            type="tel"
            name="phone"
            value={profile.phone}
            onChange={handleChange}
        />
        </p>
        <button onClick={handleUpdate}>Update Profile</button>
        <button onClick={handleDelete}>Delete Profile</button>
    </div>
    );
}

export default Profile;
