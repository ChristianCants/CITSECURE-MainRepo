import React, { Component } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

class VisitorOut extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardNo: '',
      hours: '',
      minutes: '',
      ampm: 'AM',
      showModal: false,
    };
  }

  componentDidMount() {
    this.setInitialTime();
  }

  setInitialTime = () => {
    const now = new Date();
    const hours = String(now.getHours() % 12 || 12); // Ensure hours is a string
    const minutes = String(now.getMinutes()).padStart(2, '0'); // Ensure minutes is a string
    const ampm = now.getHours() >= 12 ? 'PM' : 'AM';
    this.setState({ hours, minutes, ampm });
  };

  handleExit = () => {
    this.props.history.push('/');
  };

  resetFormInputs = () => {
    this.setState({ cardNo: '' });
  };

  handleClose = () => {
    this.setState({ showModal: false });
    this.resetFormInputs();
  };

  handleLogin = async (e) => {
    e.preventDefault();
    const { cardNo, hours, minutes, ampm } = this.state;

    try {
      if (!cardNo) {
        alert('Please fill out all fields');
        return;
      }

      if (cardNo <= 0 || cardNo > 100) {
        alert('Invalid card number.');
        return;
      }

      await axios.put(
        `http://localhost:8080/admin/updateVisitorTimeOut/${cardNo}?timeOut=${hours}:${minutes} ${ampm}`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      this.setState({ showModal: true });
    } catch (error) {
      console.error('Time-out failed! Reason:', error.message);
      alert('Unsuccessful. Please try again.');
    }
  };

  render() {
    const { cardNo, hours, minutes, ampm, showModal } = this.state;

    const backgroundImageStyle = {
      backgroundImage: 'url("images/TIME OUT.png")',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      height: '100vh',
      overflow: 'hidden',
    };

    const formStyle = {
      border: '3px solid #A43F3F',
      borderRadius: '8px',
      padding: '20px',
      backgroundColor: '#FFF9EB',
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

    // Convert hours and minutes to strings before using padStart
    const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')} ${ampm}`;

    return (
      <section className="background-radial-gradient overflow-hidden" style={backgroundImageStyle}>
        <div className="container px-4 py-5 px-md-5 text-center text-lg-start my-5 d-flex justify-content-end align-items-center">
          <div className="col-lg-6 mb-5 mb-lg-0 position-relative">
            <div className="card bg-glass" style={formStyle}>
              <div className="card-body px-4 py-5 px-md-5">
                <form onSubmit={this.handleLogin}>
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

                  <button
                    type="submit"
                    className="btn btn-primary btn-block mb-4"
                    style={loginButtonStyle}
                  >
                    Submit
                  </button>
                  <div style={{ color: 'maroon', textAlign: 'center' }}>or</div>
                  <NavLink
                    to="/signup"
                    style={{
                      color: 'maroon',
                      textAlign: 'center',
                      display: 'block',
                      marginTop: '10px',
                      textDecoration: 'none',
                    }}
                  >
                    Time in
                  </NavLink>
                </form>
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
              <p style={{ marginRight: '10px' }}>
                Card Number {cardNo} Has Been Successfully Timed Out!
              </p>
              <p style={{ color: 'green', fontSize: '2rem' }}>✓</p>
            </div>
          </Modal.Body>

          <Modal.Footer
            style={{ borderTop: '2px solid maroon', display: 'flex', justifyContent: 'center' }}
          >
            <Button
              variant="primary"
              onClick={this.handleExit}
              style={{ background: 'maroon', width: '150px' }}
            >
              Exit
            </Button>
          </Modal.Footer>
        </Modal>
      </section>
    );
  }
}

export default VisitorOut;
