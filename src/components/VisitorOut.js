import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Modal, Button, } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const VisitorOut = () => {
  const [cardNo, setCardNo] = useState('');
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [ampm, setAmPm] = useState('AM'); // Default AM/PM is 'AM'
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  // Function to get current system time in a formatted string
  const getCurrentTime = useCallback(() => {
    const now = new Date();
    const hours = now.getHours() % 12 || 12; // Convert 24-hour format to 12-hour format
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const ampm = now.getHours() >= 12 ? 'PM' : 'AM';
    const formattedTime = `${hours}:${minutes} ${ampm}`;
    return formattedTime;
  }, []);

  const handleExit = () => {
    // Navigate back to the home page or perform any other action
    navigate('/'); // Assuming '/' is the route for your home page
  };
  
  const resetFormInputs = () => {
    setCardNo('');
  };

  const handleClose = () => {
    setShowModal(false);
    resetFormInputs();
  };

  useEffect(() => {
    // Set the initial time when the component mounts
    const setInitialTime = () => {
      const currentTime = getCurrentTime();
      const [hour, minute, period] = currentTime.split(/:|\s/); // Split the time string
      setHours(hour);
      setMinutes(minute);
      setAmPm(period);
    };

    setInitialTime();
  }, [getCurrentTime]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      if (!cardNo) {
        alert('Please fill out all fields');
        return;
      }

      if (!cardNo || cardNo <= 0 || cardNo > 100) {
        alert('Invalid card number.');
        return;
      }

      const formData = { cardNo };

      const response = await axios.post(
        'http://localhost:8080/out/addtimeout',
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      // Notif
      console.log(`Card Number ${cardNo} Has Been Successfully Timed Out`, response.data);
      setShowModal(true);
    } catch (error) {
      console.error('Time-out failed! Reason:', error.message);
      alert('Unsuccessful. Please try again.');
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
    border: '3px solid #A43F3F',
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
    marginBottom: '10px',
  };

  return (
    <section className="background-radial-gradient overflow-hidden" style={backgroundImageStyle}>
      <div className="container px-4 py-5 px-md-5 text-center text-lg-start my-5 d-flex justify-content-end align-items-center">
        <div className="col-lg-6 mb-5 mb-lg-0 position-relative">
          <div className="card bg-glass" style={formStyle}>
            <div className="card-body px-4 py-5 px-md-5">
              <form onSubmit={handleLogin}>
                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="formCardNo">
                    Enter Card No.
                  </label>
                  <input
                    type="number"
                    id="formCardNo"
                    className="form-control custom-input"
                    style={inputStyle}
                    value={cardNo}
                    onChange={(e) => {
                      const value = e.target.value;
                      // Check if the value is not negative before updating state
                      if (value >= 0) {
                        setCardNo(value);
                      }
                    }}
                    required
                  />
                </div>

                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="timeOut">
                    Time Out
                  </label>
                  <input
                    type="text"
                    id="timeOut"
                    className="form-control custom-input"
                    style={inputStyle}
                    value={`${hours.padStart(2, '0')}:${minutes.padStart(2, '0')} ${ampm}`}
                    readOnly // Make the input read-only
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-block mb-4"
                  style={loginButtonStyle}

                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>


      {/* kani na add */}
      <Modal show={showModal} onHide={handleClose} centered>
      <Modal.Header closeButton style={{ borderBottom: '2px solid maroon' }}>
          <Modal.Title>Notification</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex justify-content-center align-items-center">
            <p style={{ marginRight: '10px' }}>Card Number {cardNo} Has Been Successfully Timed Out!</p>
            <p style={{ color: 'green', fontSize: '2rem' }}>✓</p>
          </div>
        </Modal.Body>
        
        <Modal.Footer style={{ borderTop: '2px solid maroon', display: 'flex', justifyContent: 'center' }}>
          <Button variant="primary" onClick={handleExit} style={{ background: 'maroon', width: '150px' }}>
            Exit
          </Button>
        </Modal.Footer>
      </Modal>

    </section>
  );
};

export default VisitorOut;
