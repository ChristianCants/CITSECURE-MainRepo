import React, { Component } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Modal, Button as BootstrapButton } from 'react-bootstrap';
import Button from '@mui/material/Button';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import SendIcon from '@mui/icons-material/Send'; // Import SendIcon
import { FaTimesCircle } from 'react-icons/fa';
import './VisitorExit.css'; // Assuming you have a CSS file for custom styles

class VisitorExit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardNo: '',
      hours: '',
      minutes: '',
      ampm: 'AM',
      showModal: false,
      showErrorModal: false,
      showConfirmModal: false,
      userDetails: null,
      errorMessage: '',
      firstName: '',
      lastName: '',
      visitorImage: null,
    };
  }

  componentDidMount() {
    this.setInitialTime();
  }

  setInitialTime = () => {
    const now = new Date();
    const hours = String(now.getHours() % 12 || 12);
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const ampm = now.getHours() >= 12 ? 'PM' : 'AM';
    this.setState({ hours, minutes, ampm });
  };

  handleExit = () => {
    const { navigate } = this.props;
    navigate('/');
  };

  resetFormInputs = () => {
    this.setState({ cardNo: '' });
  };

  handleClose = () => {
    this.setState({ showModal: false });
    this.resetFormInputs();
  };

  handleErrorClose = () => {
    this.setState({ showErrorModal: false });
  };

  handleConfirmClose = () => {
    this.setState({ showConfirmModal: false });
  };

  handleLogin = async (e) => {
    e.preventDefault();
    const { cardNo } = this.state;

    if (!cardNo) {
      alert('Please fill out all fields');
      return;
    }

    if (cardNo <= 0 || cardNo > 100) {
      alert('Invalid card number.');
      return;
    }

    try {
      const response = await axios.get(`http://localhost:8080/visitor/getVisitorByCardNo/${cardNo}`);
      if (response.data) {
        const imageResponse = await axios.get(`http://localhost:8080/visitor/getImage/${cardNo}`, {
          responseType: 'blob',
        });
        const imageURL = URL.createObjectURL(imageResponse.data);

        this.setState({
          userDetails: response.data,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          visitorImage: imageURL,
          showConfirmModal: true,
        });
      } else {
        this.setState({ errorMessage: 'No visitor currently using this card.', showErrorModal: true });
      }
    } catch (error) {
      console.error('Error fetching user details:', error.message);
      this.setState({ errorMessage: 'No visitor currently using this card.', showErrorModal: true });
    }
  };

  handleConfirmExit = async () => {
    const { cardNo, hours, minutes, ampm } = this.state;

    try {
      const response = await axios.put(
        `http://localhost:8080/visitor/updateVisitorTimeOut/${cardNo}?timeOut=${hours}:${minutes} ${ampm}`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('API Response:', response.data);
      this.setState({ showModal: true, showConfirmModal: false });
    } catch (error) {
      console.error('Time-out failed! Reason:', error.message);
      this.setState({ errorMessage: 'Time-out failed!', showErrorModal: true });
    }
  };

  handleGoBack = () => {
    const { navigate } = this.props;
    navigate('/');
  };

  render() {
    const { cardNo, hours, minutes, ampm, showModal, showErrorModal, showConfirmModal, userDetails, errorMessage, visitorImage } = this.state;

    const backgroundImageStyle = {
      backgroundImage: 'url("images/TIME OUT.png")',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      height: '100vh',
      overflow: 'hidden',
    };

    const formStyle = {
      border: '3px solid maroon',
      borderRadius: '8px',
      padding: '15px',
      backgroundColor: '#FFFFFF', // Change this to the desired background color
      fontFamily: 'Roboto, sans-serif',
      position: 'relative',
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

    const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')} ${ampm}`;

    return (
      <section className="background-radial-gradient overflow-hidden" style={backgroundImageStyle}>
        <div className="container px-4 py-5 px-md-5 text-center text-lg-start my-5 d-flex justify-content-end align-items-center">
          <div className="col-lg-6 mb-5 mb-lg-0 position-relative">
            <div className="card bg-glass" style={formStyle}>
              <Button
                variant="contained"
                startIcon={<ChevronLeftIcon />}
                onClick={this.handleGoBack}
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
                <form onSubmit={this.handleLogin} style={{ display: 'flex', flexDirection: 'column' }}>
                  <h2 style={{ color: 'maroon', marginBottom: '30px' }}>Visitor Exit</h2>
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
                          this.setState({ cardNo: inputValue });
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
                      value={formattedTime}
                      readOnly
                      required
                    />
                  </div>

                  {/* Updated Submit Button */}
                  <Button
                    type="submit"
                    className="btn btn-primary btn-block mb-4"
                    style={{
                      ...loginButtonStyle,
                      width: '130px', // Match the width of your "Next" button
                      height: '50px', // Match the height of your "Next" button
                    }}
                    endIcon={<SendIcon />} // Add SendIcon as endIcon
                  >
                    Submit
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>

        <Modal show={showConfirmModal} onHide={this.handleConfirmClose} centered size="lg">
          <Modal.Header closeButton style={{ borderBottom: '5px solid maroon' }}>
            <Modal.Title style={{ fontWeight: 'bold', fontSize: '24px', color: 'maroon' }}>Card Verification!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {userDetails ? (
              <>
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '200px',
                  backgroundColor: '#e0e0e0',
                  marginBottom: '20px',
                  border: '2px solid maroon'
                }}>
                  {visitorImage ? (
                    <img src={visitorImage} alt="Visitor" style={{ maxWidth: '100%', maxHeight: '100%' }} />
                  ) : (
                    <span style={{ fontSize: '24px', color: 'maroon' }}>Photo</span>
                  )}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ display: 'flex', gap: '20px' }}>
                    <div style={{ flex: 1, border: '2px solid maroon', padding: '10px', borderRadius: '8px', maxWidth: '350px', margin: 'auto' }}>
                      <p style={{ fontSize: '25px', textAlign: 'center', margin: '0', fontWeight: 'bold' }}>
                        <strong>Status:</strong> <span style={{ color: userDetails.status === 1 ? 'red' : 'green' }}>{userDetails.status === 1 ? 'Card in use' : 'Available'}</span>
                      </p>
                    </div>
                    <div style={{ flex: 1, border: '2px solid maroon', padding: '10px', borderRadius: '8px', maxWidth: '350px', margin: 'auto' }}>
                      <p style={{ fontSize: '25px', textAlign: 'center', margin: '0' }}>
                        <strong>Card Number:</strong> {userDetails.cardNo}
                      </p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '20px' }}>
                    <div style={{ flex: 1, border: '2px solid maroon', padding: '10px', borderRadius: '8px', maxWidth: '350px', margin: 'auto' }}>
                      <p style={{ fontSize: '25px', textAlign: 'center', margin: '0' }}>
                        <strong>First Name:</strong> {this.state.firstName}
                      </p>
                    </div>
                    <div style={{ flex: 1, border: '2px solid maroon', padding: '10px', borderRadius: '8px', maxWidth: '350px', margin: 'auto' }}>
                      <p style={{ fontSize: '25px', textAlign: 'center', margin: '0' }}>
                        <strong>Last Name:</strong> {this.state.lastName}
                      </p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '20px' }}>
                    <div style={{ flex: 1, border: '2px solid maroon', padding: '10px', borderRadius: '8px', maxWidth: '350px', margin: 'auto' }}>
                      <p style={{ fontSize: '25px', textAlign: 'center', margin: '0' }}>
                        <strong>Purpose:</strong> {userDetails.purpose}
                      </p>
                    </div>
                    <div style={{ flex: 1, border: '2px solid maroon', padding: '10px', borderRadius: '8px', maxWidth: '350px', margin: 'auto' }}>
                      <p style={{ fontSize: '25px', textAlign: 'center', margin: '0' }}>
                        <strong>Building Visit:</strong> {userDetails.buildingToVisit}
                      </p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '20px' }}>
                    <div style={{ flex: 1, border: '2px solid maroon', padding: '10px', borderRadius: '8px', maxWidth: '300px', margin: 'auto' }}>
                      <p style={{ fontSize: '25px', textAlign: 'center', margin: '0' }}>
                        <strong>Time In:</strong> {userDetails.timeIn}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <p>Loading...</p>
            )}
          </Modal.Body>

          <Modal.Footer>
            <Button variant="primary" onClick={this.handleConfirmExit} style={{ background: 'maroon', border: 'none', color: 'white' }}>
              Confirm Exit
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showModal} onHide={this.handleClose} centered>
          <Modal.Header closeButton style={{ borderBottom: '2px solid maroon' }}>
            <Modal.Title>Notification</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="d-flex justify-content-center align-items-center">
              <p style={{ marginRight: '10px' }}>
                Card Number {cardNo} Has Been Successfully Timed Out!
              </p>
              <p style={{ color: 'green', fontSize: '2rem' }}>✓</p>
            </div>
          </Modal.Body>
          <Modal.Footer
            style={{ borderTop: '2px solid maroon', display: 'flex', justifyContent: 'center' }}
          >
            <BootstrapButton
              variant="primary"
              onClick={() => window.location.href = '/'}
              style={{ background: 'maroon', width: '150px' }}
            >
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
              <div className="d-flex align-items-center">
                <p style={{ marginRight: '10px', marginBottom: '0' }}>
                  {errorMessage}
                </p>
                <FaTimesCircle style={{ color: 'red', fontSize: '2rem', marginBottom: '0' }} />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer
            style={{ borderTop: '2px solid maroon', display: 'flex', justifyContent: 'center' }}
          >
            <BootstrapButton
              variant="primary"
              onClick={this.handleErrorClose}
              style={{ background: 'maroon', width: '200px' }}
            >
              OK
            </BootstrapButton>
          </Modal.Footer>
        </Modal>
      </section>
    );
  }
}

export default function VisitorOutWithNavigate(props) {
  const navigate = useNavigate();
  return <VisitorExit {...props} navigate={navigate} />;
}
