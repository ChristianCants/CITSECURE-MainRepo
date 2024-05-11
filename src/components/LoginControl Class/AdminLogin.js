import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [adminUsername, setAdminUsername] = useState('Admin'); // Set default admin username
  const [adminPassword, setAdminPassword] = useState('1234'); // Set default admin password
  const navigate = useNavigate();

  const handleAdminLogin = async (e) => {
    e.preventDefault();

    try {
      // Check adminUsername and adminPassword against valid credentials
      if (adminUsername === 'Admin' && adminPassword === '1234') { // Check against default values
        // Redirect to admin page upon successful login
        localStorage.setItem('uname', adminUsername)
        localStorage.setItem('password', adminPassword)
        navigate('/Admin');
      } else {
        // Show error message for invalid credentials
        alert('Invalid admin credentials');
      }
    } catch (error) {
      console.error('Login failed:', error.message);
      alert('Login failed. Please check the console for details.');
    }
  };

  const backgroundImageStyle = {
    backgroundImage: 'url("images/TIME OUT.png")',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    height: '100vh',
    overflow: 'hidden',
  };

  const formStyle = {
    border: '3px solid maroon', // Maroon border style
    borderRadius: '8px',
    padding: '60px',
    backgroundColor: '#FFF9EB',
    width: '400px',
    margin: 'auto',
    marginTop: '50px',
    textAlign: 'center',
  };

  const inputContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '15px',
    textAlign: 'left',
  };

  const inputLabelStyle = {
    color: 'maroon',
    fontWeight: 'bold',
    marginBottom: '5px',
  };

  const inputStyle = {
    borderColor: 'maroon', // Maroon border color
    borderRadius: '10px',
    padding: '10px',
    width: '100%',
    marginTop: '10px',
  };

  const loginButtonContainerStyle = {
    marginTop: '20px', // Adjusted margin for the button container
  };

  const loginButtonStyle = {
    backgroundColor: '#A43F3F', // Adjusted background color
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '5px',
    padding: '10px',
    cursor: 'pointer',
    width: '100%',
    marginTop: '30px', // Add margin-top to move the button down
  };
  

  const titleStyle = {
    color: 'maroon',
    fontWeight: 'bold',
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '50px', // Adjust this value as needed for the desired vertical centering
  };
  

  return (
    <div className="container-fluid" style={backgroundImageStyle}>
      <div className="row justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <div className="col-lg-6">
          <div className="card bg-glass" style={formStyle}>
            <div className="card-body">
              <h2 className="text-center mb-4" style={titleStyle}>Admin Login</h2>
              <form onSubmit={handleAdminLogin}>
                <div style={inputContainerStyle}>
                  <label htmlFor="adminUsername" style={inputLabelStyle}>Username</label>
                  <input
                    type="text"
                    id="adminUsername"
                    className="form-control"
                    style={inputStyle}
                    placeholder="Enter your username"
                    value={adminUsername}
                    onChange={(e) => setAdminUsername(e.target.value)}
                    required
                  />
                </div>
                <div style={inputContainerStyle}>
                  <label htmlFor="adminPassword" style={inputLabelStyle}>Password</label>
                  <input
                    type="password"
                    id="adminPassword"
                    className="form-control"
                    style={inputStyle}
                    placeholder="Enter your password"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    required
                  />
                </div>

                <div style={loginButtonContainerStyle}> {/* Added container style for the login button */}
                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={loginButtonStyle}
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
