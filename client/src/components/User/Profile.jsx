import React, { useState, useEffect } from 'react';

function Profile() {
    const [profile, setProfile] = useState({
        photo_url: "",
        email: "",
        phone: "",
    });
    const [initialProfile, setInitialProfile] = useState(null); // To store initial profile state for editing
    const [editing, setEditing] = useState(false); // State to track editing mode
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('/user_profile')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setProfile(data);
                setInitialProfile(data); // Store initial profile data for editing
            })
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
            .then(data => {
                setProfile(data);
                setInitialProfile(data); // Update initial profile data after successful update
                setEditing(false); // Exit editing mode
            })
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

    const handleEdit = () => {
        // Enter editing mode, copy current profile to state
        setEditing(true);
        setProfile({ ...initialProfile }); // Reset profile to initial state for editing
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
                <strong>Email: </strong>
                {editing ? (
                    <input
                        type="email"
                        name="email"
                        value={profile.email}
                        onChange={handleChange}
                    />
                ) : (
                    <span>{profile.email}</span>
                )}
            </p>
            <p>
                <strong>Phone: </strong>
                {editing ? (
                    <input
                        type="tel"
                        name="phone"
                        value={profile.phone}
                        onChange={handleChange}
                    />
                ) : (
                    <span>{profile.phone}</span>
                )}
            </p>
            {editing ? (
                <React.Fragment>
                    <button onClick={handleUpdate}>Save</button>
                    <button onClick={() => setEditing(false)}>Cancel</button>
                </React.Fragment>
            ) : (
                <button onClick={handleEdit}>Edit</button>
            )}
            <button onClick={handleDelete}>Delete Profile</button>
        </div>
    );
}

export default Profile;
