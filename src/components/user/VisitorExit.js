import React, { Component } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Modal, Button as BootstrapButton } from 'react-bootstrap';
import Button from '@mui/material/Button';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import SendIcon from '@mui/icons-material/Send';
import { FaCheckCircle } from 'react-icons/fa';
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
      visitorImage: null,
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
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = String(hours % 12 || 12).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');

    this.setState({
      hours: formattedHours,
      minutes: formattedMinutes,
      ampm: ampm,
    });
  };

  handleFetchVisitorImage = async (cardNo) => {
    const currentDate = new Date().toISOString().split('T')[0];
    const imageUrl = `http://localhost:8080/image/getIDImg/${cardNo}/${currentDate}`;
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

    const { cardNo } = this.state;

    try {
      const response = await axios.get(`http://localhost:8080/visitor/getVisitorByCardNo/${cardNo}`);

      if (response.data) {
        console.log('Visitor details fetched:', response.data);
        await this.handleFetchVisitorImage(cardNo);

        this.setState({
          userDetails: response.data,
          loading: false,
          showErrorModal: false,
          showConfirmModal: true,
        });
      } else {
        this.setState({
          errorMessage: 'No visitor found for this card.',
          showErrorModal: true,
          showConfirmModal: false,
          loading: false
        });
      }
    } catch (error) {
      console.error('Error fetching visitor details:', error);
      this.setState({
        errorMessage: 'Failed to fetch visitor details.',
        showErrorModal: true,
        showConfirmModal: false,
        loading: false
      });
    }
  };

  handleClose = () => {
    this.setState({
        showModal: false,
        showErrorModal: false,
        showConfirmModal: false,
        loading: false,
    }, () => {
        // Navigate to the home page after modal is closed
        const { navigate } = this.props;
        navigate('/');
    });
};

  handleConfirmExit = async () => {
    this.setState({ loading: true });
    const { cardNo, hours, minutes, ampm } = this.state;
    const timeOut = `${hours}:${minutes} ${ampm}`;

    try {
      const response = await axios.put(
        `http://localhost:8080/visitor/updateVisitorTimeOut/${cardNo}?timeOut=${timeOut}`,
        {},
        { headers: { 'Content-Type': 'application/json' } }
      );

      console.log('API Response:', response.data);
      this.setState({
        showModal: true,
        showConfirmModal: false,
        showErrorModal: false,
      });
    } catch (error) {
      console.error('Time-out failed! Reason:', error.message);
      this.setState({
        errorMessage: 'Time-out failed!',
        showErrorModal: true,
        showConfirmModal: false,
        showModal: false,
      });
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { cardNo, hours, minutes, ampm, showErrorModal, showConfirmModal, loading, userDetails, errorMessage, visitorImage } = this.state;
    const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')} ${ampm}`;

    return (
      <section className="background-radial-gradient overflow-hidden" style={{ backgroundImage: 'url("images/IN&OUT.png")', height: '100vh', overflow: 'hidden' }}>
        <div className="container px-4 py-5 px-md-5 text-center text-lg-start my-5 d-flex justify-content-end align-items-center">
          <div className="col-lg-6 mb-5 mb-lg-0 position-relative">
            <div className="card bg-glass" style={{ border: '3px solid maroon', borderRadius: '8px', padding: '15px', backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
              <Button variant="contained" startIcon={<ChevronLeftIcon />} onClick={() => this.props.navigate('/')} style={{ position: 'absolute', top: '10px', right: '10px', color: 'maroon', backgroundColor: 'transparent', boxShadow: 'none' }}>
                Go Back
              </Button>
              
              <div className="card-body px-4 py-5 px-md-5">
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
                      <label className="form-label" htmlFor="cardNo">Visitor Number</label>
                      <input
                        type="text"
                        id="cardNo"
                        className="form-control custom-input"
                        value={cardNo}
                        onChange={(e) => this.setState({ cardNo: e.target.value })}
                        required
                      />
                    </div>

                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="timeOut">Time Out</label>
                      <input
                        type="text"
                        id="timeOut"
                        className="form-control custom-input"
                        value={formattedTime}
                        readOnly
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      style={{ backgroundColor: '#A43F3F', color: '#FFFFFF', padding: '10px', borderRadius: '5px' }}
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
                {visitorImage && (
                  <div style={{ marginBottom: '20px' }}>
                    <img src={visitorImage} alt="Visitor" style={{ width: '400px', height: '300px', borderRadius: '5px', border: '2px solid maroon' }} />
                  </div>
                )}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px', maxWidth: '600px' }}>
                  <div style={{ padding: '10px', border: '1px solid maroon', borderRadius: '5px', backgroundColor: '#f9f9f9' }}>
                    <strong>GATE SELECTED:</strong>
                    <div style={{ color: 'maroon', fontWeight: 'bold' }}>{userDetails.selected_gate || "Not Specified"}</div>
                  </div>
                  <div style={{ padding: '10px', border: '1px solid maroon', borderRadius: '5px', backgroundColor: '#f9f9f9' }}>
                    <strong>FIRST NAME:</strong>
                    <div style={{ color: 'maroon', fontWeight: 'bold' }}>{userDetails.firstName}</div>
                  </div>
                  <div style={{ padding: '10px', border: '1px solid maroon', borderRadius: '5px', backgroundColor: '#f9f9f9' }}>
                    <strong>LAST NAME:</strong>
                    <div style={{ color: 'maroon', fontWeight: 'bold' }}>{userDetails.lastName}</div>
                  </div>
                  <div style={{ padding: '10px', border: '1px solid maroon', borderRadius: '5px', backgroundColor: '#f9f9f9' }}>
                    <strong>VISITOR NO:</strong>
                    <div style={{ color: 'maroon', fontWeight: 'bold' }}>{userDetails.cardNo}</div>
                  </div>
                  <div style={{ padding: '10px', border: '1px solid maroon', borderRadius: '5px', backgroundColor: '#f9f9f9' }}>
                    <strong>TIME IN:</strong>
                    <div style={{ color: 'maroon', fontWeight: 'bold' }}>{userDetails.timeIn}</div>
                  </div>
                  <div style={{ padding: '10px', border: '1px solid maroon', borderRadius: '5px', backgroundColor: '#f9f9f9' }}>
                    <strong>PURPOSE:</strong>
                    <div style={{ color: 'maroon', fontWeight: 'bold' }}>{userDetails.purpose}</div>
                  </div>
                  <div style={{ padding: '10px', border: '1px solid maroon', borderRadius: '5px', backgroundColor: '#f9f9f9' }}>
                    <strong>BUILDING TO VISIT:</strong>
                    <div style={{ color: 'maroon', fontWeight: 'bold' }}>{userDetails.buildingToVisit}</div>
                  </div>
                  <div style={{ padding: '10px', border: '1px solid maroon', borderRadius: '5px', backgroundColor: '#f9f9f9' }}>
                    <strong>OFFICE VISITED:</strong>
                    <div style={{ color: 'maroon', fontWeight: 'bold' }}>{userDetails.officeVisited || "Not Specified"}</div>
                  </div>
                </div>
              </div>
            ) : (
              <p>No user details available.</p>
            )}
          </Modal.Body>
          <Modal.Footer>
            <BootstrapButton variant="secondary" onClick={this.handleConfirmClose} style={{ backgroundColor: 'maroon', color: 'white', borderColor: 'maroon' }}>
              Cancel
            </BootstrapButton>
            <BootstrapButton variant="primary" onClick={this.handleConfirmExit} style={{ backgroundColor: 'maroon', color: '#F4C522', borderColor: 'maroon' }}>
              Confirm
            </BootstrapButton>
          </Modal.Footer>
        </Modal>

        <Modal show={this.state.showModal} onHide={this.handleClose} centered size="lg">
          <Modal.Header style={{ borderBottom: '5px solid maroon' }}>
            <Modal.Title style={{ fontWeight: 'bold', fontSize: '24px', color: 'maroon' }}>Exit Confirmation</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
              <FaCheckCircle size={80} style={{ color: 'green' }} />
              <h4 style={{ color: 'maroon' }}>Exit confirmed. Thank you for visiting our campus!</h4>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <BootstrapButton variant="primary" onClick={this.handleClose} style={{ backgroundColor: 'maroon', color: 'white', borderColor: 'maroon' }}>
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
