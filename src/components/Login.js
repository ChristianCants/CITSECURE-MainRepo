import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
 
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
 
  const handleLogin = (e) => {
    e.preventDefault();
    // Add your login logic here
    console.log('Logging in...', { email, password });
 
    // Assuming login is successful, navigate to MenuPage
    navigate('/menu');
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