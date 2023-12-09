import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { login } from '../../services/UserService';

const UserProfile = () => {
    const navigate = useNavigate();
    const [userProfile, setUserProfile] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        try {
            const currentProfile = localStorage.getItem('currentProfile');

            if (!currentProfile) {
                // Redirect to login if the user is not logged in
                navigate('/login');
                return;
            }

            // Parse the user profile from the string stored in localStorage
            const parsedProfile = JSON.parse(currentProfile);

            // Make a request to the backend to get user profile data
            login(parsedProfile.username)
                .then((resp) => {
                    if (resp.status === 200) {
                        console.log(resp.data);
                        setUserProfile(resp.data);
                    }
                })
                .catch((error) => {
                    console.error('Error fetching user profile:', error.message);
                    alert('Error fetching user profile. Please try again');
                });

        } catch (error) {
            console.error('Error fetching user profile:', error.message);
            // Handle errors, e.g., redirect to login or display an error message
            navigate('/login');
        } finally {
            setLoading(false);
        };

    }, [navigate]);

    return (
        <div style={profileContainer}>
            <h2 style={headerStyle}>User Profile</h2>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div style={profileDetailsContainer}>
                    <img src={userProfile.avatar} alt="User Avatar" style={avatarStyle} />
                    <div style={detailsStyle}>
                        <p>
                            <strong>Username:</strong> {userProfile.username}
                        </p>
                        <p>
                            <strong>Name:</strong> {userProfile.name}
                        </p>
                        <p>
                            <strong>Email:</strong> {userProfile.email}
                        </p>
                        <p>
                            <strong>Pincode:</strong> {userProfile.pincode}
                        </p>
                    </div>
                </div>
            )}
            {/* Add other user details as needed */}
            <button style={editButtonStyle} onClick={() => navigate('/update-profile')}>
                Edit Profile
            </button>
        </div>
    );
};

const profileContainer = {
    maxWidth: '600px',
    margin: 'auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    marginTop: '50px',
    // Responsive styles
    '@media (max-width: 768px)': {
        padding: '15px',
    },
    '@media (max-width: 480px)': {
        padding: '10px',
    },
};

const headerStyle = {
    textAlign: 'center',
    color: '#333',
};

const profileDetailsContainer = {
    display: 'flex',
    alignItems: 'left',
    marginTop: '20px',
};

const avatarStyle = {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    marginRight: '20px',
};

const detailsStyle = {
    flex: '1',
};

const editButtonStyle = {
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
    marginTop: '20px',
};

export default UserProfile;
