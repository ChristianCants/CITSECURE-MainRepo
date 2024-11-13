import React, { Component } from 'react';
import { Modal, Button as BootstrapButton } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import {FaCamera } from 'react-icons/fa';
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
      selectedOffice: '',
      offices: [],
      assignedPerson: '', // New state for assigned person
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
     // Define buildings and their respective offices
     this.buildingOffices = {
      "ACAD": [
        "College of Engineering and Architecture",
        "CES Department",
        "Alumni Affairs Office",
        "SSD",
        "Office of Property Custodian",
        "IMDC",
        "Jurani Hall",
        "CMBA-DHM Department",
        "Fine Dining",
        "CASE Department",
        "DLLC",
        "Industrial Engineering Department",
        "Architecture Department"
      ],
      "NGE": [
        "MIS/CREATE Department",
        "CCS Department",
        "Wildcats Innovation",
        "Technical Support Group",
        "CNAHS"
      ],
      "ALLIED": [
        "CEA-Electrical Engineering Department",
        "CEA-Civil Engineering Department",
        "Power House",
        "CEA-Chemical Engineering Department",
        "CEA-Mechanical Engineering Department",
        "DEMPC",
        "Mining Engineering Department"
      ],
      "RTL": [
        "Executive Office",
        "FAO",
        "University Registrar",
        "CMBA",
        "OAS",
        "College Guidance",
        "NLO",
        "MSDO",
        "ETO",
        "SSO",
        "SHS",
        "MASSCOM LAB",
        "CASE-DHBS_PSYCH",
        "CASE-BIO",
        "MARKETING OFFICE"
      ],
      "GLE": [
        "RDCO/ITSO",
        "Vice President for Academic Affairs",
        "IMPO",
        "QAO",
        "Human Resource Management",
        "CEA-CPE Department",
        "CEA-ECE Department"
      ],
      "SAL": [
        "JHS PRINCIPAL’S OFFICE",
        "JHS-COMP. LAB.",
        "SHS registrar",
        "GYM",
        "CASE-PE",
        "COLLEGE LIBRARY",
        "MAIN CLINIC"
      ],
    };
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

    const { selectedGate, firstName, lastName, purpose, cardNo, buildingToVisit, selectedOffice, assignedPerson, timeIn } = this.state;

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
            officeVisited: selectedOffice,
            assignedPerson, 
            visitorImagePath,
            status: 1,
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
        assignedPerson: '', 
        selectedOffice: '',
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

  handleBuildingChange = (e) => {
    const buildingToVisit = e.target.value;
    const offices = this.buildingOffices[buildingToVisit] || [];
    this.setState({ buildingToVisit, offices, selectedOffice: '' });
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
    const {
      selectedGate,
      firstName,
      lastName,
      purpose,
      cardNo,
      buildingToVisit,
      offices,
      selectedOffice,
      showModal,
      assignedPerson,
      timeIn,
      showCamera,
      visitorimage,
      showCamera2,
      visitorimage2,
      showNotification,
      isVisitorIdCaptured 
    } = this.state;
  
    const isFormFilled = selectedGate && firstName && lastName && purpose && cardNo && buildingToVisit && selectedOffice && assignedPerson  && visitorimage2;
  
    const formContainerStyle = {
      display: 'flex',
      flexDirection: 'column',
      padding: '20px',
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      borderRadius: '10px',
      border: '2px solid maroon',
      width: '100%',
      maxWidth: '1200px',
      margin: '0 auto',
    };
  
    const headerStyle = {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      paddingBottom: '10px',
      borderBottom: '2px solid maroon',
    };
  
    const logoStyle = {
      width: '90px',
      height: '90px',
    };
  
    const formTitleStyle = {
      fontSize: '40px',
      color: 'maroon',
      textAlign: 'left',
      flex: 1,
    };

    // Back button style
    const goBackButtonStyle = {
      backgroundColor: 'transparent',
      color: 'maroon',
      border: 'none',
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',
    };
  
    const leftColumnStyle = {
      flexBasis: '55%', // More space for the left
    };
  
    const rightColumnStyle = {
      flexBasis: '40%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'right',
    };
  
    const formFieldStyle = {
      marginBottom: '20px',
    };
  
    const visitorIdSectionStyle = {
      border: isVisitorIdCaptured ? '2px solid maroon' : '2px solid maroon',
      borderRadius: '10px',
      padding: '20px',
      width: '100%',
      marginTop: '20px',
      textAlign: 'center',
    };

    const sectionStyle = {
      padding: '40px',
      backgroundImage: 'url("/images/GLE.2.png")', 
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      minHeight: '100vh',
      width: '100%',
      position: 'relative',
      overflowY: 'auto',
    };
  
    return (
      <section style={sectionStyle}>
        <div style={formContainerStyle}>
          {/* Header Section */}
          <div style={headerStyle}>
            <img src="/images/CIT LOGO.png" alt="CIT Logo" style={logoStyle} />
            <h1 style={formTitleStyle}>Visitor Entry Form</h1>
            <img src="/images/CIT-U official.png" alt="CIT-U Logo" style={logoStyle} />
          </div>
  
          {/* Form Fields */}
          <form onSubmit={this.handleSignUp}>
  <div style={{ display: 'flex', width: '100%', gap: '20px' }}> {/* Add gap between columns */}
    {/* Left Column */}
    <div style={leftColumnStyle}>
      <div className="row">
        <div className="col">
          <div style={formFieldStyle}>
            <label>First Name</label>
            <input
              type="text"
              className="form-control"
              value={firstName}
              onChange={(e) => this.setState({ firstName: e.target.value })}
              required
            />
          </div>
        </div>
        <div className="col">
          <div style={formFieldStyle}>
            <label>Last Name</label>
            <input
              type="text"
              className="form-control"
              value={lastName}
              onChange={(e) => this.setState({ lastName: e.target.value })}
              required
            />
          </div>
        </div>
      </div>

      {/* Purpose and Assigned Person Row */}
      <div className="row">
        <div className="col">
          <div style={formFieldStyle}>
            <label>Purpose</label>
            <input
              type="text"
              className="form-control"
              value={purpose}
              onChange={(e) => this.setState({ purpose: e.target.value })}
              required
            />
          </div>
        </div>
        <div className="col">
          <div style={formFieldStyle}>
            <label>Assigned Person</label>
            <input
              type="text"
              className="form-control"
              value={assignedPerson}
              onChange={(e) => this.setState({ assignedPerson: e.target.value })}
              required
            />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <div style={formFieldStyle}>
            <label>Visitor No.</label>
            <input
              type="text"
              className="form-control"
              value={cardNo}
              readOnly
            />
          </div>
        </div>
        <div className="col">
          <div style={formFieldStyle}>
            <label>Time In</label>
            <input
              type="text"
              className="form-control"
              value={timeIn}
              readOnly
            />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <label>Buildings</label>
          <select className="form-control" value={buildingToVisit} onChange={this.handleBuildingChange} required>
            <option value="">Select Buildings</option>
            {Object.keys(this.buildingOffices).map((building) => (
              <option key={building} value={building}>{building}</option>
            ))}
          </select>
        </div>
        <div className="col">
          <label>Select Gate</label>
          <select className="form-control" value={selectedGate} onChange={(e) => this.setState({ selectedGate: e.target.value })} required>
            <option value="">Select Gate</option>
            <option value="Front Gate">Front Gate</option>
            <option value="Back Gate">Back Gate</option>
          </select>
        </div>
      </div>

      {offices.length > 0 && (
        <div style={formFieldStyle}>
          <label>Office to Visit</label>
          <select className="form-control" value={selectedOffice} onChange={(e) => this.setState({ selectedOffice: e.target.value })} required>
            <option value="">Select Office</option>
            {offices.map((office, index) => (
              <option key={index} value={office}>{office}</option>
            ))}
          </select>
        </div>
      )}
    </div>
    
    {/* Right Column - Visitor ID Section */}
    <div style={rightColumnStyle}>
      <div style={visitorIdSectionStyle}>
        <h3 style={{ color: 'maroon' }}>Visitor Photo</h3>
        {!visitorimage2 && (
          <button
            className="btn btn-primary"
            onClick={this.handleCameraOpen2}
            style={{
              backgroundColor: '#800000',
              borderColor: '#800000',
              padding: '10px 20px',
              color: '#fff',
              borderRadius: '8px',
            }}
          >
            <FaCamera style={{ marginRight: '10px' }} /> Take Photo
          </button>
        )}

        {visitorimage2 && (
          <div>
            <img src={visitorimage2} alt="Captured ID" width="100%" style={{ marginBottom: '10px' }} />
            <button
              className="btn btn-danger"
              onClick={this.handleRetake2}
              style={{
                backgroundColor: '#A43F3F',
                padding: '10px 20px',
                color: '#fff',
                borderRadius: '8px',
              }}
            >
              Retake
            </button>
          </div>
        )}
      </div>
    </div>
  </div>
  
  {/* Submit Button */}
  <div style={{ textAlign: 'center', marginTop: '20px', width: '100%' }}>
    <button
      type="submit"
      className="btn btn-primary"
      style={{
        backgroundColor: 'maroon',
        borderColor: 'maroon',
        padding: '10px 30px',
        fontSize: '20px',
        width: '200px',
      }}
      disabled={!isFormFilled}
    >
      Submit
    </button>
  </div>
</form>


          {/* Go Back Button with Chevron Icon */}
          <button onClick={() => this.props.navigate('/')} style={goBackButtonStyle}>
            <ChevronLeftIcon /> Go Back
          </button>
        </div>

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



        {/* <Modal show={showErrorModal} onHide={this.handleErrorClose} centered>
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
        </Modal> */}

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
