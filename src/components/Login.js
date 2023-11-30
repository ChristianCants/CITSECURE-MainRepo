import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/users/login', {
        email,
        password,
      });

      // Handle successful login (e.g., store token in state or redirect)
      console.log('Login successful:', response.data);
      navigate('/menu'); // Redirect to the menu page or perform other actions
    } catch (error) {
      // Handle login error (e.g., show error message)
      console.error('Login failed:', error.message);
    }
  };

  const backgroundImageStyle = {
    backgroundImage: `url('images/GLE HOME.png')`,
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
        <div className="row gx-lg-5 align-items-center mb-5">
          <div className="col-lg-6 mb-5 mb-lg-0" style={{ zIndex: 10 }}>
            {/* Other content or text */}
          </div>

          <div className="col-lg-6 mb-5 mb-lg-0 position-relative">
            {/* Other elements */}
            <div className="card bg-glass" style={formStyle}>
              <div className="card-body px-4 py-5 px-md-5">
                <form onSubmit={handleLogin}>
                  <div className="form-outline mb-4">
                    <input
                      type="email"
                      id="form3Example3"
                      className="form-control custom-input"
                      style={inputStyle}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <label className="form-label" htmlFor="form3Example3">
                      Email address
                    </label>
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      type="password"
                      id="form3Example4"
                      className="form-control custom-input"
                      style={inputStyle}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <label className="form-label" htmlFor="form3Example4">
                      Password
                    </label>
                  </div>

                  {/* Other form elements */}

                  <button type="submit" className="btn btn-primary btn-block mb-4" style={loginButtonStyle}>
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
      </div>
    </section>
  );
};

export default Login;
