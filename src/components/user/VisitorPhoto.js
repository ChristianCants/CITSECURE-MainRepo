import React, { Component } from 'react';
import { Modal, Button as BootstrapButton } from 'react-bootstrap';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import Chip from '@mui/material/Chip';
import { FaCamera } from 'react-icons/fa';
import { MdSend } from 'react-icons/md'; // Import the submit icon
import Webcam from 'react-webcam';
import './VisitorEntry.css'; // Import the CSS file

class VisitorPhoto extends Component {
  constructor(props) {
    super(props);
    const { state } = this.props.location;
    this.state = {
      accept: false,
      showModal: false,
      showErrorModal: false,
      showNotificationModal: false,
      systemTime: '',
      cardNo: state?.cardNo || '', // Retrieve cardNo from location state or set to empty string
      isVisitorPhotoCaptured: false, // State to manage border visibility
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

  dataURItoBlob = (dataURI) => {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  };

  handleImageUpload2 = async (cardNo) => {
    const { visitorimage2 } = this.state;
    const blob = this.dataURItoBlob(visitorimage2);

    const now = new Date();
    const hours = String(now.getHours() % 12 || 12).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Month is zero-based
    const year = now.getFullYear();

    const formattedTime = `${hours}-${minutes}_${day}-${month}-${year}`;
    
    // Convert cardNo to a string before calling replace
    const sanitizedCardNo = cardNo.toString().replace(/[^a-zA-Z0-9]/g, '_'); // Ensure cardNo is also sanitized
    
    const filename = `${sanitizedCardNo}_${formattedTime}_visitorimage.jpg`;

    const formData = new FormData();
    formData.append('file', blob, filename);
    formData.append('cardNo', sanitizedCardNo);
    formData.append('timeIn', formattedTime); // Use formattedTime

    try {
      const response = await axios.post('http://localhost:8080/image/uploadVisitorImg', formData, {
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

  handleAcknowledged = () => {
    this.setState({ showNotificationModal1: true });
  };
  

  handleSubmit = async (event) => {
    event.preventDefault();
    const { accept } = this.state;

    if (accept) {
      try {
        await this.handleCloseNotification();
        this.setState({ showModal: true });
      } catch (error) {
        console.error('Error during form submission:', error);
        this.setState({ showErrorModal: true });
      }
    } else {
      this.setState({ showNotificationModal1: true, accept: true });
    }
  };

  handleErrorClose = () => {
    this.setState({ showErrorModal: false });
  };

  handleGoBack = () => {
    this.props.navigate('/visitorentry');
  };

  handleCloseNotification = () => {
    this.setState({ showNotificationModal1: false });
  };

  handleViewMap = () => {
    window.location.href = '/visitor-navigation';
  };

  render() {
    const { showModal, showErrorModal, accept, showNotificationModal1, showNotificationModal, isVisitorPhotoCaptured } = this.state;

    const isFormFilled = accept;

    const backgroundImageStyle = {
      background: 'url("images/TIME IN.png")',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    };

    const formStyle = {
      border: '3px solid maroon',
      borderRadius: '8px',
      padding: '15px',
      backgroundColor: 'rgba(255, 255, 255, 0.8)', // Set to transparent
      fontFamily: 'Roboto, sans-serif',
      maxWidth: '600px',
      width: '1000px',
      height: '800px',
      margin: '0 auto',
    };

    const visitorPhotoSectionStyle = isVisitorPhotoCaptured
      ? { border: '2px solid maroon', padding: '10px', marginBottom: '2px' }
      : { padding: '10px', marginBottom: '2px' };

    return (
      <section
        className="background-radial-gradient overflow-hidden"
        style={{
          ...backgroundImageStyle,
          backgroundColor: 'rgba(0, 0, 0, 0)',
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
                <div className="card-body px-4 py-5 px-md-5">
                  <form onSubmit={this.handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
                    <h2 style={{ color: 'maroon', fontSize: '30px', marginBottom: '30px', textAlign: 'center' }}>Privacy Policies</h2>

                    <div style={visitorPhotoSectionStyle}>
                        <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#333', marginTop: '15px' }}>
                          We value your privacy and are committed to protecting your personal information. Please read the following policies carefully to understand how we collect, use, and protect your data.
                        </p>

                        <ul style={{ textAlign: 'left', padding: '0 20px', color: '#555', fontSize: '15px', lineHeight: '1.5' }}>
                          <li><strong>Data Collection:</strong> We collect only the data necessary for campus security and visitor management purposes.</li>
                          <li><strong>Use of Information:</strong> Your data is used solely for verifying and documenting entry to the premises.</li>
                          <li><strong>Protection of Data:</strong> We employ strict security protocols to protect your information from unauthorized access.</li>
                          <li><strong>Consent:</strong> By proceeding, you consent to the capture of your image and storage of relevant details for campus access purposes.</li>
                          <li><strong>Contact:</strong> For questions or concerns, please reach out to the SSD office.</li>
                        </ul>

                      {!accept && (
                        <button
                          className="btn btn-primary btn-block mb-4"
                          onClick={this.handleAcknowledged}
                          style={{
                            background: '#800000',
                            borderColor: '#800000',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '10px 20px',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            borderRadius: '8px',
                            color: '#ffffff',
                          }}
                        >
                          Acknowledge / I Accept
                        </button>
                      )}
                    </div>

                    <BootstrapButton
                      variant="primary"
                      type="submit"
                      disabled={!isFormFilled}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto',
                        backgroundColor: isFormFilled ? '#A43F3F' : '#D8B4B4',
                        borderColor: isFormFilled ? '#A43F3F' : '#D8B4B4',
                        padding: '10px 20px',
                        fontSize: '16px',
                        borderRadius: '10px',
                        width: '250px',
                        height: '50px',
                        color: '#ffffff',
                      }}
                    >
                      Submit
                      <MdSend style={{ marginLeft: '10px' }} />
                    </BootstrapButton>
                  </form>

                  <Modal show={showModal} onHide={this.handleClose} centered>
                    <Modal.Header style={{ borderBottom: '2px solid #800000' }}>
                      <Modal.Title>Notification</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <div className="d-flex justify-content-center align-items-center">
                        <p style={{ marginRight: '10px' }}>Form Submitted Successfully!</p>
                        <p style={{ color: 'green', fontSize: '2rem' }}>✓</p>
                      </div>
                    </Modal.Body>
                    <Modal.Footer style={{ borderTop: '2px solid #800000', display: 'flex', justifyContent: 'space-between' }}>
                      <BootstrapButton 
                        variant="primary" 
                        onClick={this.handleViewMap} 
                        style={{ 
                          background: '#800000',  // Yellow-Gold for View Maps
                          borderColor: '#800000',
                          width: '150px',
                          color: '#F4C522',        // Text color set to black
                          fontWeight: 'bold'       // Slightly bolder text for emphasis
                        }}
                      >
                        View Maps
                      </BootstrapButton>

                      <BootstrapButton 
                        variant="primary" 
                        onClick={() => window.location.href = '/'} 
                        style={{ 
                          background: '#800000', // Deep Maroon for Exit
                          borderColor: '#800000',
                          width: '150px',
                          color: '#fff',
                          fontWeight: 'bold'   // Slightly bolder text for emphasis
                        }}
                      >
                        Exit
                      </BootstrapButton>
                    </Modal.Footer>
                  </Modal>

                  <Modal show={showErrorModal} onHide={this.handleErrorClose} centered>
                    <Modal.Header>
                      <Modal.Title style={{ color: 'red' }}>Error</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <p>There was an error during the form submission. Please try again.</p>
                    </Modal.Body>
                    <Modal.Footer>
                      <BootstrapButton variant="secondary" onClick={this.handleErrorClose}>
                        Close
                      </BootstrapButton>
                    </Modal.Footer>
                  </Modal>

                  <Modal show={showNotificationModal} onHide={this.handleCloseNotification} centered>
                    <Modal.Header>
                      <Modal.Title style={{ color: 'orange' }}>Notification</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <p>Please complete the Visitor Entry Form before submitting.</p>
                    </Modal.Body>
                    <Modal.Footer>
                      <BootstrapButton variant="secondary" onClick={this.handleCloseNotification}>
                        Close
                      </BootstrapButton>
                    </Modal.Footer>
                  </Modal>

                  <Modal show={showNotificationModal1} onHide={this.handleCloseNotification} centered>
                    <Modal.Header>
                      <Modal.Title style={{ color: 'red' }}>Notification</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <p>You acknowledged the privacy policies.</p>
                    </Modal.Body>
                    <Modal.Footer>
                      <BootstrapButton variant="secondary" onClick={this.handleCloseNotification}>
                        Close
                      </BootstrapButton>
                    </Modal.Footer>
                  </Modal>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default function VisitorPhotoWithNavigate(props) {
  const navigate = useNavigate();
  const location = useLocation();
  return <VisitorPhoto {...props} navigate={navigate} location={location} />;
}
