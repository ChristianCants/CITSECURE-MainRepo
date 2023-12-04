import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'


const Login = () => {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/User/login', null, {
        params: {
          email: email,
          password: password,
        },
      });
      // Assuming the response includes a status code to indicate success (e.g., 200)
      if (response.status === 200) {
        // Redirect to the menu page upon successful login
        navigate('/menu'); // Update '/menu' with your actual menu page URL
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
    backgroundImage: 'url("images/GLE SIGN-UP.png")', // Corrected the URL format
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
    backgroundColor: '#A43F3F', // Set the button background color
    color: '#FFFFFF', // Set the text color to ensure visibility
    border: 'none',
    borderRadius: '5px',
    padding: '10px',
    cursor: 'pointer',
  };
 
  return (
    <section className="background-radial-gradient overflow-hidden" style={backgroundImageStyle}>
      <div className="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
        {/* ... (other content remains the same) */}
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
                    onChange={(e) => setemail(e.target.value)}
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
                    onChange={(e) => setpassword(e.target.value)}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-block mb-4"
                  style={loginButtonStyle}
                >
                  Login
                </button>

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