import React from 'react';
import { Link } from 'react-router-dom';

const Toolbar = () => {
    const isLoggedIn = localStorage.getItem('loggedIn') === 'true';

    return (
        <div style={navbarStyle}>
            <Link to="/" style={linkStyle}>
                Home
            </Link>

            <Link to="/register" style={linkStyle}>
                Register
            </Link>

            <Link to="/comm" style={linkStyle}>
                Communication
            </Link>
            {isLoggedIn ? (
                <Link to="/profile" style={linkStyle}>
                    Profile
                </Link>
            ) : (<></>)}

            <div style={{ marginLeft: 'auto' }}>
                {isLoggedIn ? (
                    <Link to="/logout" style={linkStyle}>
                        Logout
                    </Link>
                ) : (
                    <Link to="/login" style={linkStyle}>
                        Login
                    </Link>
                )}
            </div>
        </div>
    );
};

const navbarStyle = {
    background: '#333',
    color: '#fff',
    padding: '10px',
    display: 'flex',
};

const linkStyle = {
    color: '#fff',
    textDecoration: 'none',
    padding: '8px',
};

export default Toolbar;
