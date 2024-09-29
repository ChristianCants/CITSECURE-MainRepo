import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

library.add(faSignInAlt, faSignOutAlt);

class Home extends Component {
  containerStyle = {
    backgroundImage: `url('/images/TRY NEW.png')`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '150px',
  };

  buttonContainerStyle = {
    display: 'flex',
    flexDirection: 'row',
    gap: '90px', // Adjust the gap to control space between buttons
  };

  buttonStyle = {
    width: '350px', // Increased width
    height: '90px', // Increased height
    borderRadius: '40px', // Adjusted border-radius to maintain proportional roundness
    border: '2.5px solid #000',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#000',
    fontSize: '24px', // Increased font size
    fontWeight: 'bold',
    textDecoration: 'none',
    backgroundColor: '#FFD0D0', // Changed background color
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.25)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    background: 'linear-gradient(145deg, #ffffff, #d4d4d4)', // Added gradient for 3D effect
  };

  buttonHoverStyle = {
    transform: 'translateY(-5px)', // Lifts the button on hover
    boxShadow: '0 15px 30px rgba(0, 0, 0, 0.35)', // Increases the shadow for a more pronounced 3D effect
  };

  render() {
    return (
      <div style={this.containerStyle}>
        <div style={this.buttonContainerStyle}>
          <Link
            to="/visitorentry"
            style={this.buttonStyle}
            onMouseOver={(e) => e.currentTarget.style.transform = this.buttonHoverStyle.transform}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            Visitor Entry
            <FontAwesomeIcon icon="sign-in-alt" style={{ marginLeft: '10px' }} />
          </Link>
          <Link
            to="/visitorexit"
            style={this.buttonStyle}
            onMouseOver={(e) => e.currentTarget.style.transform = this.buttonHoverStyle.transform}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            Visitor Exit
            <FontAwesomeIcon icon="sign-out-alt" style={{ marginLeft: '10px' }} />
          </Link>
        </div>
      </div>
    );
  }
}

export default Home;
