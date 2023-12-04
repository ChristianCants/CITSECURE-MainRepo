import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

const SignUp = () => {
  const [firstName, setfirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      if (!firstName || !lastName || !selectedGender || !email || !password) {
        alert('Please fill out all fields');
        return;
      }

      if (password.length < 8) {
        alert('Password should be at least 8 characters long');
        return;
      }
      

      if (!(password.match(/[a-z]/) && password.match(/[A-Z]/))) {
        alert('Password should contain both uppercase and lowercase letters');
        return;
      }

      const newUser = {
        firstName,
        lastName,
        gender: selectedGender,
        email,
        password,
      };

      const response = await axios.post('http://localhost:8080/User/insertUser', newUser, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Signup successful:', response.data);
      setShowModal(true);
    } catch (error) {
      console.error('Signup failed:', error.message);
    }
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const navigateToLogin = () => {
    if (!firstName || !lastName || !selectedGender || !email || !password) {
      alert('Please fill out all fields');
      return;
    }

    handleSignUp();
  };

  const handleConfirm = () => {
    handleClose();
    navigate('/login');
  };

  const handleGenderSelect = (gender) => {
    setSelectedGender(gender);
  };


  const backgroundImageStyle = {
    backgroundImage: 'url("images/GLE SIGN-UP.png")',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    height: '100vh',
    overflow: 'hidden',
    // Other background styles
  };

  const formStyle = {
    border: '2px solid maroon',
    borderRadius: '8px',
    padding: '20px',
    backgroundColor: '#FFF9EB',
    // Other form styles
  };

  const inputStyle = {
    borderColor: 'maroon',
    borderRadius: '8px',
    color: 'black',
    backgroundColor: 'white',
    // Other input styles
  };

  const checkmarkStyle = {
    color: 'green',
    fontSize: '2rem',
    marginRight: '10px',
    // Other checkmark styles
  };

  return (
    <section className="background-radial-gradient overflow-hidden" style={backgroundImageStyle}>
      <div className="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
        <div className="row gx-lg-5 align-items-center mb-5">
          <div className="col-lg-6 mb-5 mb-lg-0" style={{ zIndex: 10 }}>
            {/* Content for the left column */}
          </div>

          <div className="col-lg-6 mb-5 mb-lg-0 position-relative">
            {/* Content for the right column */}

            {/* Form */}
            <div className="card bg-glass" style={formStyle}>
              <div className="card-body px-4 py-5 px-md-5">
                <form>
                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                        <input
                          type="text"
                          id="form3Example1"
                          className="form-control custom-input"
                          style={inputStyle}
                          value={firstName}
                          onChange={(e) => {
                            setfirstName(e.target.value);
                          }}
                        />
                        <label className="form-label" htmlFor="form3Example1">
                          First name
                        </label>
                      </div>
                    </div>
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                        <input
                          type="text"
                          id="form3Example2"
                          className="form-control custom-input"
                          style={inputStyle}
                          value={lastName}
                          onChange={(e) => {
                            setlastName(e.target.value);
                          }}
                        />
                        <label className="form-label" htmlFor="form3Example2">
                          Last name
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="form-outline mb-4">
                    <label className="form-label" style={{ marginBottom: '10px', display: 'block' }}>
                      Gender:
                    </label>
                    <div className="dropdown">
                      <button
                        className="btn btn-secondary dropdown-toggle"
                        type="button"
                        id="genderDropdown"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                        style={inputStyle}
                      >
                        {selectedGender ? selectedGender : 'Select Gender'}
                      </button>
                      <div className="dropdown-menu" aria-labelledby="genderDropdown">
                        <a className="dropdown-item" href="#" onClick={() => handleGenderSelect('Male')}>
                          Male
                        </a>
                        <a className="dropdown-item" href="#" onClick={() => handleGenderSelect('Female')}>
                          Female
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      type="email"
                      id="form3Example3"
                      className="form-control custom-input"
                      style={inputStyle}
                      value={email}
                      onChange={(e) => {
                        setemail(e.target.value);
                      }}
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
                      onChange={(e) => {
                        setpassword(e.target.value);
                      }}
                    />
                    <label className="form-label" htmlFor="form3Example4">
                      Password
                    </label>
                  </div>

                  <button
                    type="button"
                    className="btn btn-primary btn-block mb-4"
                    style={{ background: '#A43F3F', borderRadius: '17px' }}
                    onClick={navigateToLogin}
                  >
                    Register
                  </button>

                  <div className="text-center">
                    <button type="button" className="btn btn-link btn-floating mx-1">
                      <i className="fab fa-facebook-f"></i>
                    </button>

                    <button type="button" className="btn btn-link btn-floating mx-1">
                      <i className="fab fa-google"></i>
                    </button>

                    <button type="button" className="btn btn-link btn-floating mx-1">
                      <i className="fab fa-twitter"></i>
                    </button>

                    <button type="button" className="btn btn-link btn-floating mx-1">
                      <i className="fab fa-github"></i>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Integrated SuccessPopup logic */}
      {/* Integrated SuccessPopup logic */}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton style={{ borderBottom: '2px solid maroon' }}>
          <Modal.Title>Notification</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex justify-content-center align-items-center">
            <p style={{ marginRight: '10px' }}>Successfully Created!</p>
            <p style={{ color: 'green', fontSize: '2rem' }}>✓</p>
          </div>
        </Modal.Body>
        <Modal.Footer style={{ borderTop: '2px solid maroon' }}>
          <Button variant="primary" onClick={handleConfirm} style={{ background: 'maroon' }}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </section>
  );
};

export default SignUp;