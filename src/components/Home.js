import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
  containerStyle = {
    backgroundImage: `url('/images/Menuu.png')`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '150px'
  };

  buttonStyle = {
    width: '400px',
    height: '70px',
    flexShrink: 0,
    borderRadius: '100px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'black',
    fontSize: '30px',
    marginTop: '50px',
    transition: 'background-color 0.3s ease',
  };

  loginButtonStyle = {
    ...this.buttonStyle,
    background: '#FFF9EB',
    border: '2px solid black',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 50), 0 8px 16px rgba(0, 0, 0, 91)',
  };

  signupButtonStyle = {
    ...this.buttonStyle,
    background: '#FFF9EB',
    border: '2px solid black',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 50), 0 8px 16px rgba(0, 0, 0, 91)'
  };

  render() {
    return (
      <div style={this.containerStyle}>
        <Link
          to="/visitorentry"
          className="btn btn-primary btn-lg rounded-pill mx-2"
          style={this.loginButtonStyle}
        >
          <span style={{ marginRight: '8px', fontWeight: 'bold' }}>Visitor Entry</span>
          <svg className="bi" width="24" height="24">
            <use xlinkHref="#arrow-right-short"></use>
          </svg>
        </Link>
        <Link
          to="/visitorexit"
          className="btn btn-outline-secondary btn-lg rounded-pill mx-2"
          style={this.signupButtonStyle}
        >
          <span style={{ marginRight: '8px',fontWeight: 'bold' }}>Visitor Exit</span>
        </Link>
      </div>
    );
  }
}

export default Home;
