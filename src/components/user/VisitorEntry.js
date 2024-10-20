import React, { Component } from 'react';
import { Modal, Button as BootstrapButton } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { FaTimesCircle, FaCamera } from 'react-icons/fa';
import Webcam from 'react-webcam';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas'; // Import html2canvas to capture the modal content
import './VisitorEntry.css';

class VisitorEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedGate: '',
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
      isVisitorIdCaptured: false,
      loading: false,  // Loading state for the spinner
    };
    this.modalRef = React.createRef();
  }

  // Fetch the next available card number from the backend
  fetchNextCardNumber = async () => {
    try {
      const response = await axios.get('http://localhost:8080/visitor/nextCardNumber');
      const nextCardNumber = response.data.nextCardNo;
      this.setState({ cardNo: nextCardNumber });
    } catch (error) {
      console.error('Failed to fetch the next card number:', error);
      this.setState({ cardNo: 'Error' });
    }
  };

  getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours() % 12 || 12;
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const ampm = now.getHours() >= 12 ? 'PM' : 'AM';
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
  
    return `${hours}:${minutes} ${ampm} ${day}/${month}/${year}`;
  };

  componentDidMount() {
    const currentTime = this.getCurrentTime();
    this.setState({ timeIn: currentTime });

    // Fetch the next card number from the server instead of generating it randomly
    this.fetchNextCardNumber();
  }

  checkCardUsage = async (cardNo) => {
    try {
      const response = await axios.get(`http://localhost:8080/visitor/checkcard/${cardNo}`);
      return response.data.isUsed;
    } catch (error) {
      console.error('Failed to check card usage:', error.message);
      return false;
    }
  };

  handleImageUpload2 = async (cardNo) => {
    const { visitorimage2 } = this.state;
    const blob = this.dataURItoBlob(visitorimage2);

    const currentDate = new Date().toISOString().split('T')[0];  // Format date as YYYY-MM-DD
    const sanitizedCardNo = cardNo.toString().replace(/[^a-zA-Z0-9]/g, '_');  // Sanitize card number

    const formData = new FormData();
    formData.append('file', blob);  // No need to pass a filename
    formData.append('cardNo', sanitizedCardNo);
    formData.append('date', currentDate);  // Use the date only

    try {
        const response = await axios.post('http://localhost:8080/image/uploadIDImg', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
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
    this.setState({ loading: true });
  
    const { selectedGate, firstName, lastName, purpose, cardNo, buildingToVisit, timeIn } = this.state;
  
    try {
      // First, upload the image for Visitor ID
      console.log('Starting image upload for cardNo:', cardNo);
      const visitorImagePath = await this.handleImageUpload2(cardNo);
      console.log('Image uploaded successfully, path:', visitorImagePath);
  
      // Now submit the form data after the image upload is complete
      const formData = {
        selected_gate: selectedGate,
        firstName,
        lastName,
        purpose,
        cardNo: parseInt(cardNo, 10),
        timeIn,
        buildingToVisit,
        visitorImagePath, // Pass the uploaded image path as part of the form data
        status: 1, // Visitor active status
      };
  
      const response = await axios.post('http://localhost:8080/visitor/addVisitor', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      console.log('Signup successful:', response.data);
      this.setState({ showModal: true });
    } catch (error) {
      if (error.response && error.response.status === 409) {
        console.error('Card is already in use');
        this.setState({ showErrorModal: true, errorMessage: 'Card already used, check your card again' });
      } else {
        console.error('Signup failed:', error.response ? error.response.data : error.message);
        this.setState({ showErrorModal: true });
      }
    } finally {
      this.setState({ loading: false });  // End loading
    }
  };

  
  resetFormInputs = () => {
    this.setState({
      selectedGate: '',
      firstName: '',
      lastName: '',
      purpose: '',
      buildingToVisit: '',
      visitorimage: null,
      visitorimage2: null,
    });

    this.fetchNextCardNumber(); // Fetch new card number on form reset
  };

  // Generate and download the PDF for the card number
  generatePDF = () => {
    const modalElement = document.querySelector('.modal-content'); // Adjust the selector based on your modal
    const nextButton = document.querySelector('.next-button'); // Target the "Next" button
  
    // Temporarily hide the "Next" button
    nextButton.style.visibility = 'hidden';
  
    html2canvas(modalElement, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('landscape', 'px', 'a4'); // Landscape mode
  
      const imgWidth = pdf.internal.pageSize.getWidth();
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
  
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`Visitor_Card_${this.state.cardNo}.pdf`);
  
      // Restore the visibility of the "Next" button after PDF generation
      nextButton.style.visibility = 'visible';
    });
  };
  

  handleNext = () => {
    this.generatePDF(); // Export card number as PDF
    const { cardNo } = this.state;
    this.props.navigate('/VisitorPhoto', { state: { cardNo } }); // Retain the original handleNext functionality
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
    this.setState({ showCamera2: true, isVisitorIdCaptured: true });
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
    const { selectedGate, firstName, lastName, purpose, cardNo, buildingToVisit, showModal, showErrorModal, timeIn, showCamera, visitorimage, showCamera2, visitorimage2, showNotification, isVisitorIdCaptured } = this.state;

    const isFormFilled = selectedGate && firstName && lastName && purpose && cardNo && buildingToVisit && visitorimage2;

    const backgroundImageStyle = {
      backgroundImage: 'url("images/IN&OUT.png")',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      minHeight: '100vh',  // Ensures the container covers full viewport height
      width: '100%',
      position: 'relative',  // Allows proper stacking of elements
      overflowY: 'auto',
    };
    

    const formStyle = {
      border: '3px solid maroon',
      borderRadius: '8px',
      padding: '15px',
      backgroundColor: 'rgba(255, 255, 255, 0.8)', // Set to transparent
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

    const gateSelectStyle = {
      ...buildingToVisitStyle, // Spread operator to reuse the same style for gate select
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
                  {/* Conditionally render the spinner when loading */}
                  {this.state.loading ? (
  <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
    <div className="custom-dual-spinner" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
) : (
                    <form onSubmit={this.handleSignUp} style={{ display: 'flex', flexDirection: 'column' }}>
                      <h2 style={{ color: 'maroon', fontSize: '30px', marginBottom: '30px', textAlign: 'center' }}>
                        Visitor Entry Form
                      </h2>

                    {/* Modal for Visitor */}
                    <Modal show={showCamera} onHide={() => this.setState({ showCamera: false })} centered>
                      <Modal.Header closeButton style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Modal.Title style={{ textAlign: 'center', display: 'flex', alignItems: 'center', margin: '0', padding: '0px' }}>
                          <span style={{ color: 'maroon', fontWeight: 'bold', fontSize: '1.2em', marginLeft: '120px' }}>VISITOR</span>
                          <span style={{ color: '#F4C522', fontWeight: 'bold', fontSize: '1.2em', marginLeft: '10px' }}>PHOTO</span>
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
                      <h3 style={{ marginBottom: '10px' }}>
                        <span style={{ color: 'maroon' }}> Visitor ID</span>
                      </h3>

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
                            width: '140px',
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
                      <Modal.Header style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Modal.Title style={{ textAlign: 'center', display: 'flex', alignItems: 'center', margin: '0', padding: '0px' }}>
                          <span style={{ color: 'maroon', fontWeight: 'bold', fontSize: '40px', marginLeft: '10px' }}> VISITOR</span>
                          <span style={{ color: '#F4C522', fontWeight: 'bold', fontSize: '40px', marginLeft: '10px' }}>PHOTO</span>
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
                            backgroundColor: 'maroon',
                            borderColor: '#A43F3F',
                            color: '#FFFFFF',
                            borderRadius: '5px',
                            padding: '10px 20px',
                            fontSize: '1.2em',
                            fontWeight: 'normal',
                            cursor: 'pointer',
                            border: '2px solid #A43F3F',
                          }}
                        >
                          Capture
                        </button>
                        {visitorimage2 && <Button variant="secondary" onClick={this.handleRetake2}>Retake</Button>}
                      </Modal.Footer>
                    </Modal>

                    {/* Select Gate Dropdown */}
    <div className="form-outline mb-4">
      <label className="form-label" htmlFor="selectedGate">Select Gate</label>
      <select
        id="selectedGate"
        className="form-control"
        style={gateSelectStyle} // Apply the same inline style as buildingToVisitStyle
        value={this.state.selectedGate}
        onChange={(e) => this.setState({ selectedGate: e.target.value })}
        required
      >
        <option value="">Select Gate</option>
        <option value="Front Gate">Front Gate</option>
        <option value="Back Gate">Back Gate</option>
      </select>
    </div>



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
                      <label className="form-label" htmlFor="cardNo">Visitor No.</label>
                      <input
                        type="text"
                        id="cardNo"
                        className="form-control custom-input"
                        style={inputStyle}
                        value={cardNo}
                        readOnly // Card Number field is read-only now
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
              )}
            </div>
          </div>
        </div>
      </div>
    </div>

          <Modal show={showModal} onHide={this.handleClose} centered size="lg">
        {/* Header with logos */}
        <Modal.Header style={{ borderBottom: '5px solid black', position: 'relative', padding: '0px' }}>
          <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
            {/* CIT logo on the left */}
            <img
              src="/images/CIT LOGO.png"
              alt="CIT Logo"
              style={{ width: '90px', height: '90px', marginLeft: '0px' }}
            />
            {/* Card No on the left */}
            <div style={{ marginLeft: '0px', fontSize: '50px', fontWeight: 'bold', color: 'black' }}>
            VISITOR NO: <span style={{ color: 'maroon' }}>{cardNo}</span> 
            <span style={{ color: 'maroon', fontSize: '35px', marginLeft: '10px' }}>{selectedGate.toUpperCase()}</span>
          </div>
            {/* CIT-U official logo on the right */}
            <img
              src="/images/CIT-U official.png"
              alt="CIT-U Official Logo"
              style={{ width: '90px', height: '90px', position: 'absolute', right: '10px' }}
            />
          </div>
        </Modal.Header>

        {/* Body with full background watermark and no gaps */}
        <Modal.Body
          style={{
            backgroundImage: 'url("/images/CITU watermark.png")',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            padding: '0px',
            margin: '0px',
            position: 'relative',
          }}
        >
          {/* First name in the center */}
          <div className="d-flex justify-content-center align-items-center" style={{ textAlign: 'center', padding: '50px 0' }}>
            <div style={{ padding: '20px', backgroundColor: '#FAF3E0', border: '2px solid maroon', borderRadius: '5px', minWidth: '600px' }}>
              <h1 style={{ fontSize: '5.5rem', fontWeight: 'bold', color: 'black' }}>{this.state.firstName}</h1>
            </div>
          </div>
        </Modal.Body>

        {/* Footer with Building Visit, Time In, and Next button */}
        <Modal.Footer style={{ borderTop: '5px solid black', display: 'flex', justifyContent: 'space-between', padding: '10px 50px' }}>
          {/* Left - Building Visit */}
          <div style={{ padding: '10px', backgroundColor: '#FAF3E0', border: '1px solid maroon', borderRadius: '5px', minWidth: '150px', textAlign: 'center' }}>
            <strong style={{ fontSize: '1.2rem', color: 'black' }}>Building Visit:</strong>
            <div style={{ color: 'maroon', fontWeight: 'bold', fontSize: '1rem', marginTop: '5px' }}>{this.state.buildingToVisit || "Not Specified"}</div>
          </div>

          {/* Center - Next Button */}
          <BootstrapButton
          className="next-button" // Add this class to target it in the PDF function
          variant="primary"
          onClick={this.handleNext}
          style={{
            background: 'maroon',
            color: '#F4C522',
            borderColor: 'maroon',
            padding: '10px 20px',
            fontSize: '18px',
            width: '150px',
            height: '50px',
          }}
        >
          Next
        </BootstrapButton>

          {/* Right - Time In */}
          <div style={{ padding: '10px', backgroundColor: '#FAF3E0', border: '1px solid maroon', borderRadius: '5px', minWidth: '150px', textAlign: 'center' }}>
            <strong style={{ fontSize: '1.2rem', color: 'black' }}>Time In:</strong>
            <div style={{ color: 'maroon', fontWeight: 'bold', fontSize: '1rem', marginTop: '5px' }}>{this.state.timeIn || new Date().toLocaleTimeString()}</div>
          </div>
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
