import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import Link from react-router-dom
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userRole, setUserRole] = useState('user'); // Default role is 'user'
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post(
        'http://localhost:8080/User/login',
        null,
        {
          params: {
            email: email,
            password: password,
            userRole: userRole,
          },
        }
      );
  
      if (response.status === 200) {
        // Check the user role and redirect accordingly
        if (userRole === 'admin') {
          navigate('/admin');
        } else {
          navigate('/menu');
        }
      } else {
        setError('Login failed. Please try again.');
      }
    } catch (error) {
      // Handle login error
      console.error('Login failed:', error.message);
      setError('Login failed. Please try again.');
    }
  };
  

  const backgroundImageStyle = {
    backgroundImage: 'url("images/GLE SIGN-UP.png")',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    height: '100vh',
    overflow: 'hidden',
  };

  const formStyle = {
    border: '2px solid #A43F3F',
    borderRadius: '8px',
    padding: '20px',
    backgroundColor: '#FFF9EB',
  };

  const inputStyle = {
    borderColor: '#A43F3F',
    borderRadius: '8px',
  };

  const loginButtonStyle = {
    backgroundColor: '#A43F3F',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '5px',
    padding: '10px',
    cursor: 'pointer',
  };

  const orTextStyle = {
    margin: '10px',
    fontWeight: 'bold',
  };

  const signUpButtonStyle = {
    backgroundColor: '#A43F3F',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '5px',
    padding: '10px',
    cursor: 'pointer',
  };

  return (
    <section className="background-radial-gradient overflow-hidden" style={backgroundImageStyle}>
      <div className="container px-4 py-5 px-md-5 text-center text-lg-start my-5 d-flex justify-content-end align-items-center">
        <div className="col-lg-6 mb-5 mb-lg-0 position-relative">
          <div className="card bg-glass" style={formStyle}>
            <div className="card-body px-4 py-5 px-md-5">
              <form onSubmit={handleLogin}>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="formEmail">
                    Email address
                  </label>
                  <input
                    type="email"
                    id="formEmail"
                    className="form-control custom-input"
                    style={inputStyle}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="formPassword">
                    Password
                  </label>
                  <input
                    type="password"
                    id="formPassword"
                    className="form-control custom-input"
                    style={inputStyle}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-4">
                <label className="form-label" htmlFor="userRole">
                User Role:
                </label>

                  <select
                    id="userRole"
                    className="form-select custom-input"
                    style={inputStyle}
                    value={userRole}
                    onChange={(e) => setUserRole(e.target.value)}
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-block mb-4"
                  style={loginButtonStyle}
                >
                  Login
                </button>
                <p style={orTextStyle}>or</p>

                <Link to="/signup" className="btn btn-primary btn-block" style={signUpButtonStyle}>
                  Sign up
                </Link>


                <div className="text-center">
                  <button type="button" className="btn btn-link btn-floating mx-1">
                    <i className="fab fa-facebook-f"></i>
                  </button>
                  {/* Other social buttons */}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
