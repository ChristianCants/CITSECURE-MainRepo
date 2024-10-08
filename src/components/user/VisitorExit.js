import React, { Component } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Modal, Button as BootstrapButton } from 'react-bootstrap';
import Button from '@mui/material/Button';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import SendIcon from '@mui/icons-material/Send';
import { FaCheckCircle } from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';
import './VisitorExit.css';

class VisitorExit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardNo: '',
      hours: '',
      minutes: '',
      showModal: false,
      showErrorModal: false,
      showConfirmModal: false,
      loading: false,
      userDetails: null,
      errorMessage: '',
      firstName: '',
      lastName: '',
      visitorImage: null,
      timeIn: '', 
      uniqueID: '',
      fetchTimeout: null  // Timeout for handling long fetch times
    };
  }

  componentDidMount() {
    this.setInitialTime();
  }

  setInitialTime = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';  // Determine AM or PM
    const formattedHours = String(hours % 12 || 12).padStart(2, '0'); // Convert to 12-hour format
    const formattedMinutes = String(minutes).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
  
    const timeIn = `${formattedHours}-${formattedMinutes}_${day}-${month}-${year}_${ampm}`;
  
    this.setState({
      hours: formattedHours,
      minutes: formattedMinutes,
      ampm: ampm,
      timeIn: timeIn
    });
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

  handleFetchVisitorImage = async (cardNo) => {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0]; // Format date as yyyy-MM-dd
    const imageUrl = `http://localhost:8080/image/getIDImg/${cardNo}/${formattedDate}`;

    console.log(`Fetching image from URL: ${imageUrl}`); // Log the URL to verify it's correct

    try {
        const response = await axios.get(imageUrl, { responseType: 'blob' });
        const imageObjectURL = URL.createObjectURL(response.data);
        this.setState({ visitorImage: imageObjectURL });
    } catch (error) {
        console.error('Error fetching visitor image:', error);
        this.setState({ errorMessage: 'Failed to load visitor image.', showErrorModal: true });
    }
};

handleLogin = async (e) => {
  e.preventDefault();
  this.setState({ loading: true });

  const { cardNo,  } = this.state;

  if (!cardNo) {
    alert('Please fill out all fields');
    this.setState({ loading: false });
    return;
  }

  const timeoutId = setTimeout(() => {
    this.setState({ loading: false, errorMessage: 'Request timed out. Please try again.', showErrorModal: true });
  }, 10000);  // 10-second timeout

  try {
    const response = await axios.get(`http://localhost:8080/visitor/getVisitorByCardNo/${cardNo}`);
    clearTimeout(timeoutId); // Clear the timeout if the request succeeds

    if (response.data) {
      await this.handleFetchVisitorImage(cardNo);

      this.setState({
        userDetails: response.data,
        firstName: response.data.firstName,
        lastName: response.data.lastName,
        showConfirmModal: true,
        uniqueID: uuidv4(),
        loading: false,
      });
    } else {
      this.setState({ errorMessage: 'No visitor currently using this card.', showErrorModal: true, loading: false });
    }
  } catch (error) {
    clearTimeout(timeoutId);
    this.setState({ errorMessage: 'Failed to fetch visitor details. Please try again.', showErrorModal: true, loading: false });
  }
};



handleConfirmExit = async () => {
  this.setState({ loading: true });  // Start loading
  const { cardNo, hours, minutes, ampm } = this.state;

  try {
    const timeOut = `${hours}:${minutes} ${ampm}`;
    const response = await axios.put(
      `http://localhost:8080/visitor/updateVisitorTimeOut/${cardNo}?timeOut=${timeOut}`,
      {},
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );

    console.log('API Response:', response.data);
    this.setState({ showModal: true, showConfirmModal: false });
  } catch (error) {
    console.error('Time-out failed! Reason:', error.message);
    this.setState({ errorMessage: 'Time-out failed!', showErrorModal: true });
  } finally {
    this.setState({ loading: false });  // End loading
  }
};
  

  handleGoBack = () => {
    const { navigate } = this.props;
    navigate('/');
  };

  render() {
    const { cardNo, hours, minutes, ampm, showModal, showErrorModal, showConfirmModal, loading, userDetails, errorMessage, visitorImage } = this.state;
  

    const backgroundImageStyle = {
      backgroundImage: 'url("images/IN&OUT.png")',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      height: '100vh',
      overflow: 'hidden',
    };

    const formStyle = {
      border: '3px solid maroon',
      borderRadius: '8px',
      padding: '15px',
      backgroundColor: 'rgba(255, 255, 255, 0.8)', // Transparent background
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
                {/* Conditionally render the spinner or form */}
                {loading ? (
                  <div className="d-flex justify-content-center">
                    <div className="custom-dual-spinner" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={this.handleLogin} style={{ display: 'flex', flexDirection: 'column' }}>
                    <h2 style={{ color: 'maroon', marginBottom: '30px' }}>Visitor Exit</h2>
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
                      <label className="form-label" htmlFor="timeOut">Time Out</label>
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

                    <Button
                      type="submit"
                      className="btn btn-primary btn-block mb-4"
                      style={{
                        ...loginButtonStyle,
                        width: '130px',
                        height: '50px',
                      }}
                      endIcon={<SendIcon />}
                    >
                      Submit
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>

                <Modal show={showConfirmModal} onHide={this.handleConfirmClose} centered size="lg">
          <Modal.Header style={{ borderBottom: '5px solid maroon' }}>
            <Modal.Title style={{ fontWeight: 'bold', fontSize: '24px', color: 'maroon' }}>Card Verification!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {userDetails ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  {visitorImage && (
                    <div style={{ marginBottom: '20px' }}>
                      <img
                        src={visitorImage}
                        alt="Visitor"
                        style={{ width: '400px', height: '300px', borderRadius: '5px', border: '2px solid maroon' }}
                      />
                    </div>
                  )}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', width: '100%', maxWidth: '600px' }}>
                    <div style={{ marginRight: '20px', padding: '10px', border: '1px solid maroon', borderRadius: '5px', backgroundColor: '#f9f9f9' }}>
                      <strong>FIRST NAME:</strong>
                      <div style={{ color: 'maroon', fontWeight: 'bold', fontSize: '18px' }}>{userDetails.firstName}</div>
                    </div>
                    <div style={{ padding: '10px', border: '1px solid maroon', borderRadius: '5px', backgroundColor: '#f9f9f9' }}>
                      <strong>LAST NAME:</strong>
                      <div style={{ color: 'maroon', fontWeight: 'bold', fontSize: '18px' }}>{userDetails.lastName}</div>
                    </div>
                    <div style={{ marginRight: '20px', padding: '10px', border: '1px solid maroon', borderRadius: '5px', backgroundColor: '#f9f9f9' }}>
                      <strong>CARD NO:</strong>
                      <div style={{ color: 'maroon', fontWeight: 'bold', fontSize: '18px' }}>{userDetails.cardNo}</div>
                    </div>
                    <div style={{ padding: '10px', border: '1px solid maroon', borderRadius: '5px', backgroundColor: '#f9f9f9' }}>
                      <strong>TIME IN:</strong>
                      <div style={{ color: 'maroon', fontWeight: 'bold', fontSize: '18px' }}>{userDetails.timeIn}</div>
                    </div>
                    <div style={{ marginRight: '20px', padding: '10px', border: '1px solid maroon', borderRadius: '5px', backgroundColor: '#f9f9f9' }}>
                      <strong>PURPOSE:</strong>
                      <div style={{ color: 'maroon', fontWeight: 'bold', fontSize: '18px' }}>{userDetails.purpose}</div>
                    </div>
                    <div style={{ padding: '10px', border: '1px solid maroon', borderRadius: '5px', backgroundColor: '#f9f9f9' }}>
                      <strong>BUILDING TO VISIT:</strong>
                      <div style={{ color: 'maroon', fontWeight: 'bold', fontSize: '18px' }}>{userDetails.buildingToVisit}</div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <p>No user details available.</p>
            )}

          </Modal.Body>
          <Modal.Footer>
    <BootstrapButton 
        variant="secondary" 
        onClick={this.handleConfirmClose} 
        style={{ 
            backgroundColor: 'maroon', 
            color: 'white', 
            borderColor: 'maroon',
            padding: '10px 20px',   
            fontSize: '18px',       
            width: '150px',         
            height: '50px',          
            marginRight: '15px'
        }}
    >
        Cancel
    </BootstrapButton>
    <BootstrapButton 
        variant="primary" 
        onClick={this.handleConfirmExit} 
        style={{ 
            backgroundColor: 'maroon', 
            color: '#F4C522', 
            borderColor: 'maroon',
            padding: '10px 20px',   
            fontSize: '18px',       
            width: '150px',         
            height: '50px'         
        }}
    >
        Confirm
    </BootstrapButton>
</Modal.Footer>





        </Modal>
        <Modal show={showModal} onHide={this.handleClose} centered size="lg">
        <Modal.Header style={{ borderBottom: '5px solid maroon' }}>
          <Modal.Title style={{ fontWeight: 'bold', fontSize: '24px', color: 'maroon' }}>Exit Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
        <FaCheckCircle size={80} style={{ marginBottom: '20px', color: 'green' }} />
        <h4 style={{ marginBottom: '10px', color: 'maroon' }}>Exit confirmed. Thank you for visiting our campus!</h4>
      </div>
      </Modal.Body>
        <Modal.Footer>
        <BootstrapButton 
    variant="primary" 
    onClick={this.handleClose} 
    style={{ 
        backgroundColor: 'maroon', 
        color: 'white', 
        borderColor: 'maroon',
        padding: '10px 20px',   
        fontSize: '18px',       
        width: '150px',         
        height: '50px'          
    }}
>
    Close
</BootstrapButton>

        </Modal.Footer>
      </Modal>

        <Modal show={showErrorModal} onHide={this.handleErrorClose} centered>
          <Modal.Header closeButton>
            <Modal.Title style={{ color: 'red' }}>Error</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>{errorMessage}</p>
          </Modal.Body>
          <Modal.Footer>
            <BootstrapButton variant="danger" onClick={this.handleErrorClose}>
              Close
            </BootstrapButton>
          </Modal.Footer>
        </Modal>
      </section>
    );
  }
}

const VisitorExitWithNavigate = (props) => {
  const navigate = useNavigate();
  return <VisitorExit {...props} navigate={navigate} />;
};

export default VisitorExitWithNavigate;
