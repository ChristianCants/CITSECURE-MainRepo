import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
  containerStyle = {
    backgroundImage: `url('/images/Menu5.png')`,
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
    margin: '30px', // Adjust the margin if needed
    textDecoration: 'none',
    backgroundColor: '#EAF4F4', // Changed background color
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.25)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  };

  render() {
    return (
      <div style={this.containerStyle}>
        <Link
          to="/visitorentry"
          style={this.buttonStyle}
        >
          Visitor Entry
        </Link>
        <Link
          to="/visitorexit"
          style={this.buttonStyle}
        >
          Visitor Exit
        </Link>
      </div>
    );
  }
}

export default Home;
