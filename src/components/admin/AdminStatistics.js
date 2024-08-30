import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

class AdminStatistics extends Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout = () => {
    localStorage.removeItem('uname');
    localStorage.removeItem('password');
    this.props.navigate('/AdminLogin');
  };

  render() {
    return (
      <div style={{ backgroundColor: '#FFF9EB', minHeight: '100vh' }}>
        <header
          className="d-flex flex-wrap align-items-center justify-content-between py-3 mb-4 border-bottom"
          style={{
            backgroundColor: 'maroon',
            padding: '10px',
            fontSize: '20px',
          }}
        >
          <div style={{ color: 'white', display: 'flex', alignItems: 'center' }}>
            <img src="/images/CITSecure LOGO.png" alt="CITSecure Logo" width="67" height="60" />
            <span style={{ width: '2.5px', height: '40px', backgroundColor: 'white', margin: '0 5px' }}></span>
            <span>CITSecure</span>
          </div>
          <ul className="nav nav-pills d-flex justify-content-center" style={{ margin: 0, padding: 0, flexGrow: 1 }}>
            <li className="nav-item">
              <span className="nav-link" style={{ color: 'white', fontSize: '40px', fontWeight: 'bold' }}>
                Admin Statistics
              </span>
            </li>
          </ul>
          <Button onClick={this.handleLogout} style={{ color: 'white', backgroundColor: 'transparent', border: '1px solid white', marginLeft: '10px' }}>
            Logout
          </Button>
        </header>
      </div>
    );
  }
}


export default function AdminStatisticsWithNavigate(props) {
  const navigate = useNavigate();
  return <AdminStatistics {...props} navigate={navigate} />;
}
