  import React, { useState } from 'react';
  import { useNavigate } from 'react-router-dom';
  import { Modal, Button } from 'react-bootstrap';

  const SignUp = () => {
    const backgroundImageStyle = {
      backgroundImage: 'url("images/GLE SIGN-UP.png")',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      height: '100vh',
      overflow: 'hidden',
    };

  const formStyle = {
    border: '2px solid maroon',
    borderRadius: '8px',
    padding: '20px',
    backgroundColor: '#FFF9EB',
  };

    const inputStyle = {
      borderColor: 'maroon',    // Set border color to maroon
      borderRadius: '8px',
      color: 'black',           // Set text color to black
      backgroundColor: 'white', // Set background color to white
    };
    
    const checkmarkStyle = {
      color: 'green',
      fontSize: '2rem',
      marginRight: '10px',
    };

    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [selectedGender, setSelectedGender] = useState('');

  const handleClose = () => {
    setShowModal(false);
  };

  const navigateToLogin = () => {
    setShowModal(true);
  };

  const handleConfirm = () => {
    handleClose();
    navigate('/login');
  };

    const handleGenderSelect = (gender) => {
      setSelectedGender(gender);
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
                          <input type="text" id="form3Example1" className="form-control custom-input" style={inputStyle} />
                          <label className="form-label" htmlFor="form3Example1">
                            First name
                          </label>
                        </div>
                      </div>
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <input type="text" id="form3Example2" className="form-control custom-input" style={inputStyle} />
                          <label className="form-label" htmlFor="form3Example2">
                            Last name
                          </label>
                        </div>
                      </div>
                    </div>

                  {/* Gender dropdown */}
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

                    {/* Email address field */}
                    <div className="form-outline mb-4">
                      <input type="email" id="form3Example3" className="form-control custom-input" style={inputStyle} />
                      <label className="form-label" htmlFor="form3Example3">
                        Email address
                      </label>
                    </div>

                    {/* Password field */}
                    <div className="form-outline mb-4">
                      <input type="password" id="form3Example4" className="form-control custom-input" style={inputStyle} />
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
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton style={{ borderBottom: '2px solid maroon' }}>
          <Modal.Title>Notification </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex justify-content-center align-items-center">
            <p style={{ marginRight: '10px' }}>Successfully Created!</p>
            <p style={checkmarkStyle}>✓</p>
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
