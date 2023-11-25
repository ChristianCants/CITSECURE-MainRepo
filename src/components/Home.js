import React from 'react';
import { Link } from 'react-router-dom';
 
const Home = () => {
  const containerStyle = {
    backgroundImage: `url('/images/GLE HOME.png')`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  };
 
  const buttonStyle = {
    width: '400px',
    height: '70px',
    flexShrink: 0,
    borderRadius: '100px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'black', // Set text color to black
    fontSize: '30px', // Set font size
    marginTop: '50px',
   
  };
 
  const loginButtonStyle = {
    ...buttonStyle,
    background: '#FFF9EB',
    border: '2px solid black', // Set border color to black
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 50), 0 8px 16px rgba(0, 0, 0, 91)', // Add box-shadow here
   
  };
 
  const signupButtonStyle = {
    ...buttonStyle,
    background: '#FFF9EB',
    border: '2px solid black', // Set border color to black
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 50), 0 8px 16px rgba(0, 0, 0, 91)', // Add box-shadow here
  };
 
  return (
    <div style={containerStyle}>
      <Link to="/login" className="btn btn-primary btn-lg rounded-pill mx-2" style={loginButtonStyle}>
        <span style={{ marginRight: '8px' }}>Login</span>
        <svg className="bi" width="24" height="24">
          <use xlinkHref="#arrow-right-short"></use>
        </svg>
      </Link>
      <Link to="/signup" className="btn btn-outline-secondary btn-lg rounded-pill mx-2" style={signupButtonStyle}>
        <span style={{ marginRight: '8px' }}>SignUp</span>
      </Link>
    </div>
  );
};
 
export default Home;