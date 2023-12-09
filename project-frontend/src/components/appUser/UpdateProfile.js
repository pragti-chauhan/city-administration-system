import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { getAllUsers, updateUser } from '../../services/UserService';

const UpdateProfile = () => {
    const navigate = useNavigate();
    const [userProfile, setUserProfile] = useState({});

    useEffect(() => {
        const currentProfile = localStorage.getItem('currentProfile');
        if (!currentProfile) {
            // Redirect to login if the user is not logged in
            navigate('/login');
        } else {
            // Parse the user profile from the string stored in localStorage
            const parsedProfile = JSON.parse(currentProfile);
            setUserProfile(parsedProfile);
        }
    }, []);

    const handleUpdate = async () => {
        try {
            // Call the updateUser service function with the updated user profile
            // await updateUser(userProfile);
            const resp = await updateUser(userProfile);
            if (resp.status === 201) {
                alert('Profile updated successfully!');
                window.location.replace('/profile');
            }
            else {
                alert('Profile failed to update!');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Error updating profile. Please try again.');
        }
    };

    return (
        <div style={updateContainer}>
            <h2 style={headerStyle}>Edit Profile</h2>
            
            <label style={labelStyle}>Email:</label>
            <input
                type="text"
                value={userProfile.name || ''}
                onChange={(e) => setUserProfile({ ...userProfile, name: e.target.value })}
                style={inputStyle}
            />
            <input
                type="text"
                value={userProfile.email || ''}
                onChange={(e) => setUserProfile({ ...userProfile, email: e.target.value })}
                style={inputStyle}
            />
            <input
                type="number"
                value={userProfile.pincode || ''}
                onChange={(e) => setUserProfile({ ...userProfile, pincode: e.target.value })}
                style={inputStyle}
            />
            {/* Add other input fields for additional user details */}

            <button style={updateButtonStyle} onClick={handleUpdate}>
                Save Changes
            </button>
            <button style={cancelButtonStyle} onClick={() => navigate('/profile')}>
                Cancel
            </button>
        </div>
    );
};

const updateContainer = {
    maxWidth: '400px',
    margin: 'auto',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    marginTop: '50px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
};

const headerStyle = {
    textAlign: 'center',
    color: '#333',
};

const labelStyle = {
    display: 'block',
    margin: '10px 0',
    color: '#555',
};

const inputStyle = {
    width: '100%',
    padding: '10px',
    marginBottom: '20px',
    border: '1px solid #ddd',
    borderRadius: '4px',
};

const updateButtonStyle = {
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '16px',
    borderRadius: '4px',
    cursor: 'pointer',
    marginRight: '10px',
};

const cancelButtonStyle = {
    backgroundColor: '#ddd',
    color: '#333',
    border: 'none',
    padding: '10px 20px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '16px',
    borderRadius: '4px',
    cursor: 'pointer',
};

export default UpdateProfile;