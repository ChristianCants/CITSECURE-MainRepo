import React, { Component } from 'react';
import { Modal, Button as BootstrapButton } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { FaTimesCircle, FaCamera } from 'react-icons/fa';
import Webcam from 'react-webcam';

import './VisitorEntry.css'; // Import the CSS file

class VisitorEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      purpose: '',
      cardNo: '',
      buildingToVisit: '',
      showModal: false,
      showNotification: false,
      showErrorModal: false,
      timeIn: '',
      showCamera: false,
      visitorimage: null,
      visitorimage2: null,
      showCamera2: false,
      isVisitorIdCaptured: false, // Add this state
    };
  }

  getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours() % 12 || 12;
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const ampm = now.getHours() >= 12 ? 'PM' : 'AM';
    return `${hours}:${minutes} ${ampm}`;
  };

  componentDidMount() {
    const currentTime = this.getCurrentTime();
    this.setState({ timeIn: currentTime });
  }

  checkCardUsage = async (cardNo) => {
    try {
      console.log(`Checking card usage for card number: ${cardNo}`);
      const response = await axios.get(`http://localhost:8080/visitor/checkcard/${cardNo}`);
      console.log('Card usage response:', response.data);
      return response.data.isUsed;
    } catch (error) {
      console.error('Failed to check card usage:', error.message);
      return false; // Assuming the card is not used in case of an error
    }
  };

  handleImageUpload2 = async (cardNo, timeIn) => {
    const { visitorimage2 } = this.state;
    const blob = this.dataURItoBlob(visitorimage2);

    const now = new Date();
    const hours = String(now.getHours() % 12 || 12).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const ampm = now.getHours() >= 12 ? 'PM' : 'AM';
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Month is zero-based
    const year = now.getFullYear();

    const formattedTime = `${hours}-${minutes}_${ampm}_${day}-${month}-${year}`;
    const sanitizedCardNo = cardNo.replace(/[^a-zA-Z0-9]/g, '_'); // Ensure cardNo is also sanitized
    const filename = `${sanitizedCardNo}_${formattedTime}_visitorimage.jpg`;

    const formData = new FormData();
    formData.append('file', blob, filename);
    formData.append('cardNo', sanitizedCardNo);
    formData.append('timeIn', formattedTime); // Use formattedTime

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

  dataURItoBlob(dataURI) {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  }

  handleSignUp = async (e) => {
    e.preventDefault();
    const { firstName, lastName, purpose, cardNo, buildingToVisit, timeIn, visitorimage2 } = this.state;

    try {
      if (!firstName || !lastName || !purpose || !cardNo || !buildingToVisit || !visitorimage2) {
        this.setState({ showNotification: true });
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

      const imagePath2 = await this.handleImageUpload2(cardNo);

      const formData = {
        firstName,
        lastName,
        purpose,
        status: 1,
        cardNo: cardNumber,
        timeIn: timeIn,
        buildingToVisit,
        visitorimage2: imagePath2,
      };

      console.log('Sending data to server:', formData); // Add this line for debugging

      const response = await axios.post('http://localhost:8080/visitor/addvisitor', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Signup successful:', response.data);
      this.setState({ showModal: true });
    } catch (error) {
      console.error('Signup failed:', error.response ? error.response.data : error.message);
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
      visitorimage: null,
      visitorimage2: null,
    });
  };

  handleViewMap = () => {
    window.location.href = '/visitor-navigation';
  };

  handleNext = () => {
    const { cardNo } = this.state;
    this.props.navigate('/VisitorPhoto', { state: { cardNo } });
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

  handleCameraOpen = () => {
    this.setState({ showCamera: true });
  };

  handleCameraOpen2 = () => {
    this.setState({ showCamera2: true, isVisitorIdCaptured: true }); // Set state to indicate Visitor ID is captured
  };

  handleCapture = () => {
    const visitorimage = this.webcam.getScreenshot();
    this.setState({ visitorimage, showCamera: false, showModal: true });
  };

  handleCapture2 = () => {
    const visitorimage2 = this.webcam2.getScreenshot();
    this.setState({ visitorimage2, showCamera2: false });
  };

  handleRetake = () => {
    this.setState({ visitorimage: null, showCamera: true });
  };

  handleRetake2 = () => {
    this.setState({ visitorimage2: null, showCamera2: true });
  };

  handleCloseNotification = () => {
    this.setState({ showNotification: false });
  };

  render() {
    const { firstName, lastName, purpose, cardNo, buildingToVisit, showModal, showErrorModal, timeIn, showCamera, visitorimage, showCamera2, visitorimage2, showNotification, isVisitorIdCaptured } = this.state;

    const isFormFilled = firstName && lastName && purpose && cardNo && buildingToVisit && visitorimage2;

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
      backgroundColor: '#FFFFFF', // Change this to the desired background color
      fontFamily: 'Roboto, sans-serif',
      position: 'relative',
    };

    const inputStyle = {
      borderColor: 'maroon',
      borderRadius: '10px',
      color: 'black',
      backgroundColor: 'white',
      fontFamily: 'Roboto, sans-serif',
      width: '100%',
    };

    const timeInInputStyle = {
      ...inputStyle,
      border: 'none', // Remove border specifically for "Time In"
    };

    const visitorIdSectionStyle = isVisitorIdCaptured
      ? { border: '2px solid maroon', padding: '10px', marginBottom: '10px' }
      : { padding: '10px', marginBottom: '10px' };

    const buildingToVisitStyle = {
      borderColor: 'maroon',
      borderRadius: '10px',
      color: 'maroon',
      backgroundColor: 'white',
      fontFamily: 'Roboto, sans-serif',
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
            <div className="col-lg-6 mb-5 mb-lg-0" style={{ zIndex: 10 }}></div>
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
                    <h2 style={{ color: 'maroon', marginBottom: '30px', textAlign: 'center' }}>Visitor Entry Form</h2>

                    {/* Modal for Visitor  */}
                    <Modal show={showCamera} onHide={() => this.setState({ showCamera: false })} centered>
                      <Modal.Header closeButton style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Modal.Title style={{ textAlign: 'center', display: 'flex', alignItems: 'center', margin: '0', padding: '0px' }}>
                          <span style={{ color: 'maroon', fontWeight: 'bold', fontSize: '1.2em', marginLeft: '120px' }}>VISITOR</span>
                          <span style={{ color: 'gold', fontWeight: 'bold', fontSize: '1.2em', marginLeft: '10px' }}>PHOTO</span>
                        </Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Webcam audio={false} ref={(webcam) => (this.webcam = webcam)} screenshotFormat="image/jpeg" width="100%" />
                      </Modal.Body>
                      <Modal.Footer style={{ display: 'flex', justifyContent: 'center' }}>
                        <button
                          className="btn btn-primary"
                          onClick={this.handleCapture}
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
                        {visitorimage && <Button variant="secondary" onClick={this.handleRetake}>Retake</Button>}
                      </Modal.Footer>
                    </Modal>

                    {/* Second section for Visitor ID */}
                    <div style={visitorIdSectionStyle}>
                      <h3 style={{ marginBottom: '10px' }}>Visitor ID</h3>
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
                            color: '#ffffff', // Text color
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

                    {/* Modal for Visitor ID capture */}
                    <Modal show={showCamera2} onHide={() => this.setState({ showCamera2: false })} centered>
                      <Modal.Header closeButton style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Modal.Title style={{ textAlign: 'center', display: 'flex', alignItems: 'center', margin: '0', padding: '0px' }}>
                          <span style={{ color: 'maroon', fontWeight: 'bold', fontSize: '1.2em', marginLeft: '150px' }}>VISITOR</span>
                          <span style={{ color: 'gold', fontWeight: 'bold', fontSize: '1.2em', marginLeft: '10px' }}>ID</span>
                        </Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Webcam audio={false} ref={(webcam) => (this.webcam2 = webcam)} screenshotFormat="image/jpeg" width="100%" />
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
                        {visitorimage2 && <Button variant="secondary" onClick={this.handleRetake2}>Retake</Button>}
                      </Modal.Footer>
                    </Modal>

                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="firstName">First Name</label>
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

                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="lastName">Last Name</label>
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

                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="purpose">Purpose</label>
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
                      <label className="form-label" htmlFor="cardNo">Card Number</label>
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
                      <label className="form-label" htmlFor="timeIn">Time In</label>
                      <input
                        type="text"
                        id="timeIn"
                        className="form-control custom-input"
                        style={inputStyle.id === 'timeIn' ? timeInInputStyle : inputStyle}
                        value={timeIn}
                        readOnly
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="buildingToVisit">Building to Visit</label>
                      <select
                        id="buildingToVisit"
                        className="form-control"
                        style={buildingToVisitStyle}
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
                      disabled={!isFormFilled}
                      style={{
                        background: isFormFilled ? '#800000' : '#cccccc',
                        borderRadius: '15px',
                        borderColor: isFormFilled ? '#800000' : '#cccccc',
                        marginTop: '30px',
                        width: '130px',
                        height: '50px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '10px',
                        fontSize: '16px',
                        color: '#ffffff',
                        cursor: isFormFilled ? 'pointer' : 'not-allowed',
                      }}
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Modal show={showModal} onHide={this.handleClose} centered>
          <Modal.Header style={{ borderBottom: '2px solid maroon' }}>
            <Modal.Title>Notification</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="d-flex justify-content-center align-items-center">
              <p style={{ marginRight: '10px' }}>Form Submitted Successfully!</p>
              <p style={{ color: 'green', fontSize: '2rem' }}>✓</p>
            </div>
          </Modal.Body>
          <Modal.Footer style={{ borderTop: '2px solid maroon', display: 'flex', justifyContent: 'center' }}>
            <BootstrapButton variant="primary" onClick={this.handleNext} style={{ background: 'maroon', width: '150px' }}>
              Next
            </BootstrapButton>
          </Modal.Footer>
        </Modal>


              <Modal show={showErrorModal} onHide={this.handleErrorClose} centered>
        <Modal.Header style={{ borderBottom: '2px solid maroon' }}>
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

      <Modal show={showNotification} onHide={() => this.setState({ showNotification: false })} centered>
        <Modal.Header style={{ borderBottom: '2px solid maroon' }}>
          <Modal.Title>Notification</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Please fill out all fields and capture the visitor ID before proceeding.</p>
        </Modal.Body>
        <Modal.Footer style={{ borderTop: '2px solid maroon', display: 'flex', justifyContent: 'center' }}>
          <BootstrapButton variant="primary" onClick={() => this.setState({ showNotification: false })} style={{ background: 'maroon', width: '150px' }}>
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
  return <VisitorEntry {...props} navigate={navigate} />;
}
