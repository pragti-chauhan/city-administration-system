import { useState } from "react";
import { useNavigate } from "react-router";
import AppUser from "../../models/AppUser";
import { login } from "../../services/UserService";

const Login = () => {

    const [loginData, setLoginData] = useState(new AppUser());
    const [failedLogin, setFailedLogin] = useState('');
    const navigate = useNavigate();

    const handleLogin = (evt) => {
        console.log(evt.target.value);
        setLoginData({
            ...loginData,
            [evt.target.name]: evt.target.value
        });
    };


    const isFormValid = loginData.username && loginData.password;

    const submitLogin = (evt) => {
        console.log(loginData);
        login(loginData.username)
            .then((resp) => {
                if (resp.data.username === loginData.username && resp.data.password === loginData.password) {
                    localStorage.setItem('loggedIn', true);
                    localStorage.setItem('currentProfile', JSON.stringify(resp.data));
                    alert(`Hi ${JSON.parse(localStorage.getItem('currentProfile')).username}! You've logged in successfully. Redirecting you to home...`);
                    setLoginData(new AppUser());
                    setFailedLogin('');
                    window.location.replace('/home');
                } else {
                    setLoginData(new AppUser());
                    setFailedLogin('Invalid credentials!');
                }
            })
            .catch((err) => {
                console.log(err);
                setFailedLogin('Some error occurred. Login again !');
                setLoginData(new AppUser());
                localStorage.setItem('loggedIn', false);
                localStorage.removeItem('currentProfile');
            });
        evt.preventDefault();
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Login</h1>
            <div style={styles.formContainer}>
                <form onSubmit={submitLogin}>
                    <label style={styles.label} htmlFor="username">Username:</label>
                    <input style={styles.input} type="text" name="username" value={loginData.username} onChange={handleLogin} />

                    <label style={styles.label} htmlFor="password">Password:</label>
                    <input style={styles.input} type="password" name="password" value={loginData.password} onChange={handleLogin} />

                    {/* <input style={styles.submitButton} type="submit" name="login" value="Login" /> */}
                    <input
                        // style={{ ...styles.submitButton, backgroundColor: isFormValid ? '#4CAF50' : '#ccc' }}
                        style={{ ...styles.submitButton, ...(isFormValid ? {} : styles.disabledButton) }}
                        type="submit"
                        name="login"
                        value="Login"
                        disabled={!isFormValid}
                    />
                </form>
            </div>
            <p style={styles.error}>{failedLogin}</p>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
    },
    formContainer: {
        width: '300px',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        marginBottom: '20px',
    },
    title: {
        fontSize: '24px',
        marginBottom: '10px',
    },
    label: {
        marginBottom: '6px',
    },
    input: {
        width: '100%',
        padding: '8px',
        marginBottom: '14px',
        borderRadius: '4px',
        border: '1px solid #ccc',
    },
    submitButton: {
        backgroundColor: '#4CAF50',
        color: 'white',
        padding: '10px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    error: {
        color: 'red',
        textAlign: 'center',
    },
    disabledButton: {
        backgroundColor: '#a0a0a0', // Grey color for disabled state
        cursor: 'not-allowed',
    },
};

export default Login;