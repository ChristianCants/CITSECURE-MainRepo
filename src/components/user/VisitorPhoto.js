import React, { Component } from 'react';
import { Modal, Button as BootstrapButton } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { FaCamera } from 'react-icons/fa';
import Webcam from 'react-webcam';

import './VisitorEntry.css'; // Import the CSS file

class VisitorPhoto extends Component {
  constructor(props) {
    super(props);
    this.state = {
        showCamera2: false,
        visitorimage2: null,
        showModal: false,
        showErrorModal: false,
        showNotificationModal: false, // Correctly named state variable for notification modal
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

  handleImageUpload2 = async (cardNo, timeIn) => {
    const { visitorimage2 } = this.state;
    const blob = this.dataURItoBlob(visitorimage2);
    const formData = new FormData();
    formData.append('file', blob, 'visitorimage2.jpg');
    formData.append('cardNo', cardNo);
    formData.append('timeIn', timeIn);

    try {
      const response = await axios.post('http://localhost:8080/image/uploadIDImg', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Image upload successful:', response.data);
      return response.data.replace('Image saved at: ', '');
    } catch (error) {
      console.error('Image upload failed:', error.response ? error.response.data : error.message);
      throw error;
    }
  };

  handleCapture2 = () => {
    const visitorimage2 = this.webcam2.getScreenshot();
    this.setState({ visitorimage2, showCamera2: false });
  };

  handleRetake2 = () => {
    this.setState({ visitorimage2: null, showCamera2: true });
  };

  handleCameraOpen2 = () => {
    this.setState({ showCamera2: true });
  };

  handleNext = (event) => {
    event.preventDefault(); // Prevent form submission
    const { visitorimage2 } = this.state;
  
    if (visitorimage2) {
      this.setState({ showModal: true }); // Show the success notification modal
    } else {
      this.setState({ showNotification: true }); // Show the notification to capture ID
    }
  };
  
  

  handleErrorClose = () => {
    this.setState({ showErrorModal: false });
  };

  handleGoBack = () => {
    this.props.navigate('/visitorentry'); // Navigate to the home page ("/")
  };

  handleCloseNotification = () => {
    this.setState({ showNotificationModal: false });
  };

  handleViewMap = () => {
    window.location.href = '/visitor-navigation';
  };


  render() {
    const { showModal, showErrorModal, systemTime, showCamera2, visitorimage2, showNotificationModal } = this.state;

    const isFormFilled = visitorimage2;

    const backgroundImageStyle = {
      background: 'url("images/TIME IN.png")',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      minHeight: '100vh', // Ensure minimum height covers the viewport
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    };

    const formStyle = {
      border: '3px solid maroon',
      borderRadius: '8px',
      padding: '15px',
      backgroundColor: '#FFFFFF',
      fontFamily: 'Roboto, sans-serif',
      maxWidth: '600px',
      width: '1000px',
      height: '800px',
      margin: '0 auto',
    };

    const inputStyle = {
      borderColor: 'maroon',
      borderRadius: '10px',
      color: 'black',
      backgroundColor: 'white',
      fontFamily: 'Roboto, sans-serif',
      width: '100%',
    };

    return (
      <section
        className="background-radial-gradient overflow-hidden"
        style={{
          ...backgroundImageStyle,
          backgroundColor: 'rgba(0, 0, 0, 0)', // Set to transparent
        }}
      >
        <div className="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
          <div className="row gx-lg-5 align-items-center mb-5">
            <div className="col-lg-6 mb-5 mb-lg-0" style={{ zIndex: 10 }}>
            </div>
            <div className="col-lg-6 mb-5 mb-lg-0 position-relative">
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Chip
                  label="Access Campus Map after Visitor Entry Form"
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
                  <form onSubmit={this.handleSignUp} style={{ display: 'flex', flexDirection: 'column' }}>
                    <h2 style={{ color: 'maroon', marginBottom: '30px', textAlign: 'center' }}>Visitor Entry Form</h2>

                    <div style={{ border: '2px solid maroon', padding: '10px', marginBottom: '10px' }}>
                      <h3 style={{ marginBottom: '10px' }}>Visitor Photo</h3>
                      {!showCamera2 && !visitorimage2 && (
                        <button
                          className="btn btn-primary btn-block mb-4"
                          onClick={this.handleCameraOpen2}
                          style={{
                            background: '#800000',
                            borderColor: '#800000',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '20px 15px',
                            fontSize: '16px',
                            borderRadius: '15px',
                            width: '130px',
                            height: '50px',
                            color: '#ffffff',
                          }}
                        >
                          Capture ID <FaCamera style={{ marginLeft: '7px' }} />
                        </button>
                      )}

                      {visitorimage2 && (
                        <div style={{ textAlign: 'center', marginTop: '20px' }}>
                          <img src={visitorimage2} alt="Captured" width="100%" />
                          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                            <button
                              className="btn btn-primary btn-block mb-4"
                              onClick={this.handleRetake2}
                              style={{
                                background: '#A43F3F',
                                borderRadius: '15px',
                                padding: '10px 20px',
                                color: '#fff',
                                border: 'none',
                                cursor: 'pointer',
                                width: '130px',
                                height: '50px',
                                margin: '0 10px',
                              }}
                            >
                              Retake
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    <Modal show={showCamera2} onHide={() => this.setState({ showCamera2: false })} centered>
                      <Modal.Header closeButton style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Modal.Title style={{ textAlign: 'center', display: 'flex', alignItems: 'center', margin: '0', padding: '0px' }}>
                          <span style={{ color: 'maroon', fontWeight: 'bold', fontSize: '1.2em', marginLeft: '120px' }}>VISITOR</span>
                          <span style={{ color: 'gold', fontWeight: 'bold', fontSize: '1.2em', marginLeft: '10px' }}>PHOTO</span>
                        </Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Webcam
                          audio={false}
                          ref={(webcam) => (this.webcam2 = webcam)}
                          screenshotFormat="image/jpeg"
                          width="100%"
                        />
                      </Modal.Body>
                      <Modal.Footer style={{ display: 'flex', justifyContent: 'center' }}>
                        <button
                          className="btn btn-primary"
                          onClick={this.handleCapture2}
                          style={{
                            background: '#FFF9EB',
                            border: '2px solid #A43F3F',
                            color: '#000000',
                            borderRadius: '5px',
                            padding: '10px 20px',
                            fontSize: '1.2em',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                          }}
                        >
                          Capture
                        </button>
                        {visitorimage2 && (
                          <Button variant="secondary" onClick={this.handleRetake2}>
                            Retake
                          </Button>
                        )}
                      </Modal.Footer>
                    </Modal>

                    <button
  type="submit"
  className="btn btn-primary btn-block mb-4"
  disabled={!isFormFilled}
  style={{
    background: '#800000',
    borderColor: '#800000',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px 15px',
    fontSize: '16px',
    borderRadius: '15px',
    width: '450px',
    height: '50px',
    color: '#ffffff',
    margin: '0 auto',
  }}
  onClick={this.handleNext}
>
  Next <ChevronRightIcon style={{ marginLeft: '7px' }} />
</button>


                    <Modal show={showErrorModal} onHide={this.handleErrorClose} centered>
                      <Modal.Header closeButton>
                        <Modal.Title>Error</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>Failed to sign up. Please try again later.</Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleErrorClose}>
                          Close
                        </Button>
                      </Modal.Footer>
                    </Modal>

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
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default function SignUpWithNavigate(props) {
  const navigate = useNavigate();
  return <VisitorPhoto {...props} navigate={navigate} />;
}
