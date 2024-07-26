import React, { Component } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Modal, Button as BootstrapButton } from 'react-bootstrap';
import Button from '@mui/material/Button';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import SendIcon from '@mui/icons-material/Send';
import { FaTimesCircle } from 'react-icons/fa';
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
      userDetails: null,
      errorMessage: '',
      firstName: '',
      lastName: '',
      visitorImage: null,
      timeIn: '', // Add timeIn to state
      uniqueID: '' // Add uniqueID to state
    };
  }

  componentDidMount() {
    this.setInitialTime();
  }

  setInitialTime = () => {
    const now = new Date();
    const hours = String(now.getHours() % 12 || 12).padStart(2, '0'); // Adjust for 12-hour format
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

  handleFetchVisitorImage = async (cardNo) => {
    const now = new Date();
    const date = `${String(now.getDate()).padStart(2, '0')}-${String(now.getMonth() + 1).padStart(2, '0')}-${now.getFullYear()}`;
    const sanitizedCardNo = cardNo.replace(/[^a-zA-Z0-9]/g, '_');
    const imageUrl = `http://localhost:8080/image/getIDImg/${sanitizedCardNo}/${date}`;
    console.log(`Fetching image from URL: ${imageUrl}`); // Log the URL to verify
  
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
    const { cardNo, hours, minutes, ampm } = this.state;

    if (!cardNo) {
      alert('Please fill out all fields');
      return;
    }

    if (cardNo <= 0 || cardNo > 100) {
      alert('Invalid card number.');
      return;
    }

    // Construct timeIn from hours, minutes, and current date
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const year = now.getFullYear();
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    const timeIn = `${formattedHours}-${formattedMinutes}_${day}-${month}-${year}_${ampm}`;
    const uniqueID = uuidv4(); // Generate a unique ID

    try {
      console.log(`Fetching details for cardNo: ${cardNo}`);
      const response = await axios.get(`http://localhost:8080/visitor/getVisitorByCardNo/${cardNo}`);

      if (response.data) {
        console.log(`Fetching image for cardNo: ${cardNo}`);
        await this.handleFetchVisitorImage(cardNo);

        this.setState({
          userDetails: response.data,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          showConfirmModal: true,
          timeIn, // Set timeIn in state
          uniqueID // Set uniqueID in state
        });
      } else {
        console.warn('No visitor currently using this card.');
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
      const formattedHours = String(hours).padStart(2, '0');
      const formattedMinutes = String(minutes).padStart(2, '0');
      const timeOut = `${formattedHours}:${formattedMinutes} ${ampm}`;

      const response = await axios.put(
        `http://localhost:8080/visitor/updateVisitorTimeOut/${cardNo}?timeOut=${timeOut}`,
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
      backgroundColor: '#FFFFFF',
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
            <>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  {visitorImage && (
                    <div style={{ marginBottom: '20px' }}>
                      <img
                        src={visitorImage}
                        alt="Visitor"
                        style={{ width: '450px', height: '450px', borderRadius: '5px', border: '2px solid maroon' }}
                      />
                    </div>
                  )}
                  <div>
                    <table style={{ margin: '0 auto', textAlign: 'left', fontSize: '16px' }}>
                      <tbody>
                        <tr>
                          <td style={{ padding: '5px 15px', color: 'maroon', fontSize: '16px' }}>First Name:</td>
                          <td style={{ padding: '5px 15px', color: 'maroon', fontWeight: 'bold', fontSize: '18px' }}>{userDetails.firstName}</td>
                        </tr>
                        <tr>
                          <td style={{ padding: '5px 15px', color: 'maroon', fontSize: '16px' }}>Last Name:</td>
                          <td style={{ padding: '5px 15px', color: 'maroon', fontWeight: 'bold', fontSize: '18px' }}>{userDetails.lastName}</td>
                        </tr>
                        <tr>
                          <td style={{ padding: '5px 15px', color: 'maroon', fontSize: '16px' }}>Card No:</td>
                          <td style={{ padding: '5px 15px', color: 'maroon', fontWeight: 'bold', fontSize: '18px' }}>{userDetails.cardNo}</td>
                        </tr>
                        <tr>
                          <td style={{ padding: '5px 15px', color: 'maroon', fontSize: '16px' }}>Time In:</td>
                          <td style={{ padding: '5px 15px', color: 'maroon', fontWeight: 'bold', fontSize: '18px' }}>{userDetails.timeIn}</td>
                        </tr>
                        <tr>
                          <td style={{ padding: '5px 15px', color: 'maroon', fontSize: '16px' }}>Building to Visit:</td>
                          <td style={{ padding: '5px 15px', color: 'maroon', fontWeight: 'bold', fontSize: '18px' }}>{userDetails.buildingToVisit}</td>
                        </tr>
                        <tr>
                          <td style={{ padding: '5px 15px', color: 'maroon', fontSize: '16px' }}>Purpose:</td>
                          <td style={{ padding: '5px 15px', color: 'maroon', fontWeight: 'bold', fontSize: '18px' }}>{userDetails.purpose}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <p>No user details available.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <BootstrapButton variant="secondary" onClick={this.handleConfirmClose} style={{ backgroundColor: 'maroon', color: 'white' }}>
            Cancel
          </BootstrapButton>
          <BootstrapButton variant="primary" onClick={this.handleConfirmExit} style={{ backgroundColor: 'maroon', color: 'white' }}>
            Confirm
          </BootstrapButton>
        </Modal.Footer>
      </Modal>


        <Modal show={showModal} onHide={this.handleClose} centered size="lg">
        <Modal.Header style={{ borderBottom: '5px solid maroon' }}>
          <Modal.Title style={{ fontWeight: 'bold', fontSize: '24px', color: 'maroon' }}>Visitor Exit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <FaTimesCircle size={80} style={{ marginBottom: '20px', color: 'maroon' }} />
            <h4 style={{ marginBottom: '10px', color: 'maroon' }}>You have been successfully logged out!</h4>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <BootstrapButton 
            variant="primary" 
            onClick={this.handleClose} 
            style={{ backgroundColor: 'maroon', color: 'white', borderColor: 'maroon' }}
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
