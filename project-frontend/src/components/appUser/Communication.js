import React from 'react';
import { Link } from "react-router-dom";

const Communication = () => {
  const isLoggedIn = localStorage.getItem('loggedIn') === 'true';

  return (
    <div className="communication-page" style={styles.container}>
      {isLoggedIn ? (
        <>
          <h1 style={styles.heading}>User Communication Page</h1>
          <h3 style={styles.subHeading}>Make a report here (Complaint/Suggestion)- </h3>
          <Link to="/report" style={styles.link}>Report</Link>

          <hr style={styles.hr} />
          <h2 style={styles.heading}>All Reports made by you:</h2>
          <Link to="/user-reports" style={styles.link}>View</Link>

          <hr style={styles.hr} />
          <h2 style={styles.heading}>All Suggestions by residents:</h2>
          <Link to="/all-suggestions" style={styles.link}>View</Link>

          <h2 style={styles.heading}>Notices by the city:</h2>
          <Link to="/user-notices" style={styles.link}>View</Link>
        </>
      ) : (
        <>
          <h1 style={styles.heading}>Login First</h1>
          <p style={styles.loginMessage}>
            Please <Link to="/login" style={styles.link}>
              login
            </Link>{' '}
            to access the communication page.
          </p>
        </>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
  },
  heading: {
    fontSize: '24px',
    marginBottom: '10px',
  },
  subHeading: {
    fontSize: '18px',
    marginBottom: '10px',
  },
  link: {
    fontSize: '16px',
    color: 'blue',
    textDecoration: 'underline',
    marginBottom: '20px',
    display: 'block',
  },
  hr: {
    border: '1px solid #ccc',
    margin: '20px 0',
  },
  loginMessage: {
    fontSize: '16px',
  },
};

export default Communication;
