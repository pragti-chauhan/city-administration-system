import { useNavigate } from "react-router";

const Logout = () => {

  const navigate = useNavigate();

  const logoutFromHere = () => {
    const confirmation = window.confirm('Are you sure to logout?');
    if (confirmation) {
      localStorage.removeItem('loggedIn');
      localStorage.removeItem('currentProfile');
      localStorage.clear();
      // localStorage.setItem('loggedIn', 'false');

      alert('You have successfully logged out. Redirecting you to home...');
      
      window.location.replace('/home');
      // navigate('/home');

    }
    else {
      navigate('/logout');
    }
  };

  const containerStyle = {
    textAlign: "center",
    marginTop: "50px",
  };

  const buttonStyle = {
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
    backgroundColor: "#ff5c5c",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    outline: "none",
  };

  return (
    <div style={containerStyle}>
      <h1>Logout</h1>
      <button onClick={logoutFromHere} style={buttonStyle}>
        Logout
      </button>
    </div>
  );
};

export default Logout;