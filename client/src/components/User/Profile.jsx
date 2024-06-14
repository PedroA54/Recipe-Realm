import React, { useState, useEffect } from 'react';

function Profile() {
    const [profile, setProfile] = useState({
        photo_user: "",
        email: "",
        phone: "",
        about_me: "",
    });

    const [editing, setEditing] = useState(false);
    const [editedProfile, setEditedProfile] = useState({
        photo_user: "",
        email: "",
        phone: "",
        about_me: "",
    });

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

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
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedProfile((prevProfile) => ({
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
            body: JSON.stringify(editedProfile),
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
        // Set editedProfile to current profile state when entering edit mode
        setEditedProfile({
            ...profile,
        });
    };

    const cancelEdit = () => {
        setEditing(false);
        // Optionally reset editedProfile back to original profile state
        setEditedProfile({
            photo_user: profile.photo_user,
            email: profile.email,
            phone: profile.phone,
            about_me: profile.about_me,
        });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Profile</h1>
            <img
                src={profile.photo_user}
                alt="User Profile"
                className="profile-image"
            />

            {editing ? (
                <div>
                    <label>
                        <strong>Photo URL: </strong>
                        <input
                            type="text"
                            name="photo_user"
                            value={editedProfile.photo_user}
                            onChange={handleChange}
                        />
                    </label>
                    <br />
                </div>
            ) : null}

            <div className="profile-field">
                <p>
                    <strong>Email: </strong>
                    {editing ? (
                        <input
                            type="email"
                            name="email"
                            value={editedProfile.email}
                            onChange={handleChange}
                            className="profile-input"
                        />
                    ) : (
                        <span className="profile-text">{profile.email}</span>
                    )}
                </p>
            </div>

            <div className="profile-field">
                <p>
                    <strong>Phone: </strong>
                    {editing ? (
                        <input
                            type="tel"
                            name="phone"
                            value={editedProfile.phone}
                            onChange={handleChange}
                            className="profile-input"
                        />
                    ) : (
                        <span className="profile-text">{profile.phone}</span>
                    )}
                </p>
            </div>

            <div className="profile-field">
                <p>
                    <strong>About Me: </strong>
                    {editing ? (
                        <textarea
                            name="about_me"
                            value={editedProfile.about_me}
                            onChange={handleChange}
                            className="profile-textarea"
                        />
                    ) : (
                        <span className="profile-text">{profile.about_me}</span>
                    )}
                </p>
            </div>

            {editing ? (
                <React.Fragment>
                    <button onClick={handleUpdate}>Save</button>
                    <button onClick={cancelEdit}>Cancel</button>
                </React.Fragment>
            ) : (
                <button onClick={handleEdit}>Edit</button>
            )}
        </div>
    );
}

export default Profile;
