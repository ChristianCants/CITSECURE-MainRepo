import React, { Component } from 'react';
import { Modal, Button as BootstrapButton } from 'react-bootstrap';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import Chip from '@mui/material/Chip';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { FaTimesCircle } from 'react-icons/fa';
import './SignUp.css'; // Import the CSS file

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      purpose: '',
      cardNo: '',
      buildingToVisit: '',
      showModal: false,
      showErrorModal: false,
      systemTime: '',
    };
  }

  getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours() % 12 || 12;
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const ampm = now.getHours() >= 12 ? 'PM' : 'AM';
    const formattedTime = `${hours}:${minutes} ${ampm}`;
    return formattedTime;
  };

  componentDidMount() {
    const currentTime = this.getCurrentTime();
    this.setState({ systemTime: currentTime });
  }

  checkCardUsage = async (cardNo) => {
    try {
      const response = await axios.get(`http://localhost:8080/admin/checkcard/${cardNo}`);
      return response.data.isUsed;
    } catch (error) {
      console.error('Failed to check card usage:', error.message);
      return false; // Assuming the card is not used in case of an error
    }
  };

  handleSignUp = async (e) => {
    e.preventDefault();
    const { firstName, lastName, purpose, cardNo, buildingToVisit, systemTime } = this.state;
    
    try {
      if (!firstName || !lastName || !purpose || !cardNo || !buildingToVisit) {
        alert('Please fill out all fields');
        return;
      }

      const cardNumber = parseInt(cardNo, 10);
      if (isNaN(cardNumber) || cardNumber < 1 || cardNumber > 100) {
        alert('Invalid card number! Card number must be between 1 and 100.');
        return;
      }

      const isCardUsed = await this.checkCardUsage(cardNumber);
      if (isCardUsed) {
        console.log('Card already used, Check your card again');
        this.setState({ showErrorModal: true });
        return;
      }

      const formData = {
        firstName,
        lastName,
        purpose,
        status: 1,
        cardNo: cardNumber,
        timeIn: systemTime,
        buildingToVisit,
      };

      const response = await axios.post('http://localhost:8080/admin/addvisitor', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Signup successful:', response.data);
      this.setState({ showModal: true });
    } catch (error) {
      console.error('Signup failed:', error.message);
      this.setState({ showErrorModal: true });
    }
  };

  resetFormInputs = () => {
    this.setState({
      firstName: '',
      lastName: '',
      purpose: '',
      cardNo: '',
      buildingToVisit: '',
    });
  };

  handleViewMap = () => {
    window.location.href = '/visitor-navigation';
  };

  handleClose = () => {
    this.setState({ showModal: false });
    this.resetFormInputs();
  };

  handleErrorClose = () => {
    this.setState({ showErrorModal: false });
  };

  handleGoBack = () => {
    this.props.navigate('/'); // Navigate to the home page ("/")
  };

  render() {
    const { firstName, lastName, purpose, cardNo, buildingToVisit, showModal, showErrorModal, systemTime } = this.state;

    const backgroundImageStyle = {
      backgroundImage: 'url("images/TIME IN.png")',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      height: 'auto',
      width: '100%',
      overflowY: 'auto',
    };

    const formStyle = {
      border: '3px solid maroon',
      borderRadius: '8px',
      padding: '15px',
      backgroundColor: '#FFF9EB',
      fontFamily: 'Roboto, sans-serif',
      position: 'relative',
    };

    const inputStyle = {
      borderColor: 'maroon',
      borderRadius: '8px',
      color: 'black',
      backgroundColor: 'white',
      fontFamily: 'Roboto, sans-serif',
      width: '100%',
    };

    return (
      <section className="background-radial-gradient overflow-hidden" style={backgroundImageStyle}>
        <div className="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
          <div className="row gx-lg-5 align-items-center mb-5">
            <div className="col-lg-6 mb-5 mb-lg-0" style={{ zIndex: 10 }}>
            </div>
            <div className="col-lg-6 mb-5 mb-lg-0 position-relative">
              
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Chip
                  label="Access Campus Map after Time In"
                  style={{
                    textAlign: 'center',
                    borderRadius: '100px',
                    marginBottom: '5px',
                    color: 'white',
                  }}
                />
              </div>

              <div className="card bg-glass" style={formStyle}>
                <Button
                  variant="contained"
                  startIcon={<ChevronLeftIcon />}
                  onClick={this.handleGoBack} // Call the handleGoBack function
                  style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    backgroundColor: 'transparent',
                    color: 'maroon',
                    boxShadow: 'none',
                  }}
                >
                  Go Back
                </Button>
                <div className="card-body px-4 py-5 px-md-5">
                  <form onSubmit={this.handleSignUp} style={{ display: 'flex', flexDirection: 'column' }}>
                    <h2 style={{ color: 'maroon', marginBottom: '30px' }}>Visitor Form</h2>
                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <label className="form-label" htmlFor="firstName">
                            First Name
                          </label>
                          <input
                            type="text"
                            id="firstName"
                            className="form-control custom-input"
                            style={inputStyle}
                            value={firstName}
                            onChange={(e) => this.setState({ firstName: e.target.value })}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <label className="form-label" htmlFor="lastName">
                            Last Name
                          </label>
                          <input
                            type="text"
                            id="lastName"
                            className="form-control custom-input"
                            style={inputStyle}
                            value={lastName}
                            onChange={(e) => this.setState({ lastName: e.target.value })}
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="purpose">
                        Purpose
                      </label>
                      <input
                        type="text"
                        id="purpose"
                        className="form-control custom-input"
                        style={inputStyle}
                        value={purpose}
                        onChange={(e) => this.setState({ purpose: e.target.value })}
                        required
                      />
                    </div>

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
                        onChange={(e) => this.setState({ cardNo: e.target.value })}
                        required
                      />
                    </div>

                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="timeIn">
                        Time In
                      </label>
                      <input
                        type="text"
                        id="timeIn"
                        className="form-control custom-input"
                        style={inputStyle}
                        value={systemTime}
                        readOnly
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="buildingToVisit">Building to Visit</label>
                      <select
                        id="buildingToVisit"
                        className="form-control"
                        style={{ color: 'maroon' }}
                        value={buildingToVisit}
                        onChange={(e) => this.setState({ buildingToVisit: e.target.value })}
                        required
                      >
                        <option value="">Select Buildings</option>
                        <option value="NGE">NGE</option>
                        <option value="GLE">GLE</option>
                        <option value="RTL">RTL</option>
                        <option value="ALLIED">ALLIED</option>
                        <option value="ACAD">ACAD</option>
                        <option value="SAL">SAL</option>
                        <option value="MAIN CANTEEN">MAIN CANTEEN</option>
                        <option value="HIGHSCHOOL CANTEEN">HIGHSCHOOL CANTEEN</option>
                        <option value="ELEMENTARY BUILDING">ELEMENTARY BUILDING</option>
                        <option value="WILDCATS LIBRARY">WILDCATS LIBRARY</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary btn-block mb-4"
                      style={{ background: '#A43F3F', borderRadius: '17px' }}
                    >
                      Submit
                    </button>
                    <div style={{ color: 'maroon', textAlign: 'center' }}>or</div>
                    <NavLink
                      to="/visitorout"
                      style={{
                        color: 'maroon',
                        textAlign: 'center',
                        display: 'block',
                        marginTop: '10px',
                        textDecoration: 'none',
                        fontSize: '20px', // Adjust the font size as needed
                      }}
                    >
                      Time Out
                    </NavLink>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Modal show={showModal} onHide={this.handleClose} centered>
          <Modal.Header closeButton style={{ borderBottom: '2px solid maroon' }}>
            <Modal.Title>Notification</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="d-flex justify-content-center align-items-center">
              <p style={{ marginRight: '10px' }}>Form Submitted Successfully!</p>
              <p style={{ color: 'green', fontSize: '2rem' }}>✓</p>
            </div>
          </Modal.Body>
          <Modal.Footer style={{ borderTop: '2px solid maroon', display: 'flex', justifyContent: 'space-between' }}>
            <BootstrapButton variant="primary" onClick={this.handleViewMap} style={{ background: 'maroon', width: '150px' }}>
              View Maps
            </BootstrapButton>
            <BootstrapButton variant="primary" onClick={() => window.location.href = '/'} style={{ background: 'maroon', width: '150px' }}>
              Exit
            </BootstrapButton>
          </Modal.Footer>
        </Modal>

        <Modal show={showErrorModal} onHide={this.handleErrorClose} centered>
          <Modal.Header closeButton style={{ borderBottom: '2px solid maroon' }}>
            <Modal.Title>Notification</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="d-flex justify-content-center align-items-center">
              <p style={{ marginRight: '10px', marginBottom: '0', display: 'flex', alignItems: 'center' }}>
                Card already used, Check your card again
              </p>
              <FaTimesCircle style={{ color: 'red', fontSize: '2rem' }} />
            </div>
          </Modal.Body>
          <Modal.Footer style={{ borderTop: '2px solid maroon', display: 'flex', justifyContent: 'center' }}>
            <BootstrapButton variant="primary" onClick={this.handleErrorClose} style={{ background: 'maroon', width: '150px' }}>
              OK
            </BootstrapButton>
          </Modal.Footer>
        </Modal>
      </section>
    );
  }
}

export default function SignUpWithNavigate(props) {
  const navigate = useNavigate();
  return <SignUp {...props} navigate={navigate} />;
}
