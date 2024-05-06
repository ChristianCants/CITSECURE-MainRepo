import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate, NavLink } from 'react-router-dom';

const VisitorOut = () => {
  const [cardNo, setCardNo] = useState('');
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [ampm, setAmPm] = useState('AM');
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const getCurrentTime = useCallback(() => {
    const now = new Date();
    const hours = now.getHours() % 12 || 12;
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const ampm = now.getHours() >= 12 ? 'PM' : 'AM';
    const formattedTime = `${hours}:${minutes} ${ampm}`;
    return formattedTime;
  }, []);

  const handleExit = () => {
    navigate('/');
  };

  const resetFormInputs = () => {
    setCardNo('');
  };

  const handleClose = () => {
    setShowModal(false);
    resetFormInputs();
  };

  useEffect(() => {
    const setInitialTime = () => {
      const currentTime = getCurrentTime();
      const [hour, minute, period] = currentTime.split(/:|\s/);
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

      await axios.put(
        `http://localhost:8080/admin/updateVisitorTimeOut/${cardNo}?timeOut=${hours}:${minutes} ${ampm}`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

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
                  <label className="form-label" htmlFor="cardNo">
                    Card Number
                  </label>
                  <input
                    type="text"
                    id="cardNo"
                    className="form-control custom-input"
                    style={inputStyle}
                    value={cardNo}
                    onChange={(e) => {
                      const inputValue = e.target.value;
                      if (inputValue === '' || (inputValue >= 1 && inputValue <= 100)) {
                        setCardNo(inputValue);
                      }
                    }}
                    pattern="[1-9][0-9]?"
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
                    readOnly
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
                <div style={{ color: 'maroon', textAlign: 'center' }}>or</div>
                <NavLink to="/signup" style={{ color: 'maroon', textAlign: 'center', display: 'block', marginTop: '10px', textDecoration: 'none' }}>
                  Time in
                </NavLink>
              </form>
            </div>
          </div>
        </div>
      </div>

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
