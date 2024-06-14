import React, { useState, useEffect } from 'react';

function Profile() {
    const [profile, setProfile] = useState({
        photo_user: "",
        email: "",
        phone: "",
    });
    
    const [editing, setEditing] = useState(false);
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
                
                setEditing(false);
            })
            .catch(error => setError(error.message));
    };

    const handleEdit = () => {
        setEditing(true);
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
            <img src={profile.photo_user} alt="User Profile" />
            
            {editing ? (
                <div>
                    <label>
                        <strong>Photo URL: </strong>
                        <input
                            type="text"
                            name="photo_user"
                            value={profile.photo_user}
                            onChange={handleChange}
                        />
                    </label>
                    <br />
                </div>
            ) : null}

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
        </div>
    );
}

export default Profile;
