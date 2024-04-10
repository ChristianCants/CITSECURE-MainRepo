import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

const SignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [purpose, setPurpose] = useState('');
  const [cardNo, setCardNo] = useState('');
  const [timeIn, setTimeIn] = useState('');
  const [buildingToVisit, setBuildingToVisit] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleSignUp = async () => {
    try {
      if (!firstName || !lastName || !purpose || !cardNo || !timeIn || !buildingToVisit) {
        alert('Please fill out all fields');
        return;
      }

      // Form data to be sent in the request
      const formData = {
        firstName,
        lastName,
        purpose,
        cardNo,
        timeIn,
        buildingToVisit,
      };

      // Example POST request using axios
      const response = await axios.post('http://localhost:8080/User/insertUser', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Signup successful:', response.data);
      setShowModal(true);
    } catch (error) {
      console.error('Signup failed:', error.message);
      alert('Signup failed. Please check the console for details.');
    }
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleConfirm = () => {
    handleClose();
    // Navigate to login or any other page
  };

  const backgroundImageStyle = {
    backgroundImage: 'url("images/TIME IN.png")',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    height: 'auto', // Change to 'auto' or a specific height that allows scrolling
    overflowY: 'auto',
    // Other background styles
  };

  const formStyle = {
    border: '3px solid maroon',
    borderRadius: '8px',
    padding: '15px',
    backgroundColor: '#FFF9EB',
    fontFamily: 'Roboto, sans-serif', // Set the font family to Roboto
    // Other form styles
  };
  
  const inputStyle = {
    borderColor: 'maroon',
    borderRadius: '8px',
    color: 'black',
    backgroundColor: 'white',
    fontFamily: 'Roboto, sans-serif', // Set the font family to Roboto
    width: '100%', // Adjust the width as needed
    // Other input styles
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
                <form onSubmit={handleSignUp}>
                  <h2 style={{ color: 'maroon', marginBottom: '30px' }}>Visitor Form</h2> {/* Added heading */}
                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                      <input
                        type="text"
                        id="firstName"
                        className="form-control custom-input" // Apply custom-input class
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        />

                        <label className="form-label" htmlFor="firstName">
                          First name
                        </label>
                      </div>
                    </div>
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                      <input
                      type="text"
                      id="lastName"
                      className="form-control custom-input" // Apply custom-input class
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                      />

                        <label className="form-label" htmlFor="lastName">
                          Last name
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      type="text"
                      id="purpose"
                      className="form-control custom-input"
                      value={purpose}
                      onChange={(e) => setPurpose(e.target.value)}
                      required
                    />
                    <label className="form-label" htmlFor="purpose">
                      Purpose
                    </label>
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      type="number"
                      id="cardNo"
                      className="form-control custom-input"
                      value={cardNo}
                      onChange={(e) => setCardNo(e.target.value)}
                      min={0} // Set minimum value if needed
                      step={1} // Set step size if needed
                      required
                    />
                    <label className="form-label" htmlFor="cardNo">
                      Card Number
                    </label>
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      type="time"
                      id="timeIn"
                      className="form-control custom-input"
                      value={timeIn}
                      onChange={(e) => setTimeIn(e.target.value)}
                      required
                    />
                    <label className="form-label" htmlFor="timeIn">
                      Time In
                    </label>
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      type="text"
                      id="buildingToVisit"
                      className="form-control custom-input"
                      value={buildingToVisit}
                      onChange={(e) => setBuildingToVisit(e.target.value)}
                      required
                    />
                    <label className="form-label" htmlFor="buildingToVisit">
                      Building to Visit
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary btn-block mb-4"
                    style={{ background: '#A43F3F', borderRadius: '17px' }}
                  >
                   Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
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
