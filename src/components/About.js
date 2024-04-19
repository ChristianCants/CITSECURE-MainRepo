import React from 'react';
import { NavLink } from 'react-router-dom';
import "./About.css";// Import CSS module

const AboutPage = () => {
  return (
    <>
      <header
                className="d-flex flex-wrap align-items-center justify-content-between py-3 mb-4 border-bottom"
                style={{
                    backgroundColor: 'maroon',
                    padding: '10px',
                    fontSize: '20px',
                }}
            >
                <div style={{ color: 'white', display: 'flex', alignItems: 'center' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="56" height="40" viewBox="0 0 56 54" fill="none">
                        <path d="M2.91855 24.6698L53.7146 2.74497L28.2999 51.8879L23.7747 30.6645L2.91855 24.6698Z" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span style={{ width: '2px', height: '30px', backgroundColor: 'white', margin: '0 5px' }}></span>
                    <span>CITSecure</span>
                </div>
                <ul className="nav nav-pills d-flex justify-content-center" style={{ margin: 0, padding: 0, flexGrow: 1 }}>
          <li className="nav-item"><NavLink exact to="  /menu" className="nav-link" style={{ color: 'white' }}>Home</NavLink></li>
          <li className="nav-item"><NavLink to="/visitor-navigation" className="nav-link" style={{ color: 'white' }}>Visitor Navigation</NavLink></li>
          <li className="nav-item"><NavLink to="/about" className="nav-link" activeClassName="active" style={{ color: 'maroon', backgroundColor: 'white' }}>About Us</NavLink></li>
          
        </ul>
      </header>

      <div className="about-container">
        <header className="about-header">
          <h1 className="about-title">Welcome to CITU-Secure</h1>
          <p className="about-description">
          CITU-Secure aims to develop and implement an integrated system for visitor database monitoring and navigation within the CIT-U campus premises
          </p>
        </header>

        <section className="about-features">
          <h2 className="section-title">Key Features</h2>
          <div className="feature-grid">
            <div className="feature-card">
              <i className="fas fa-user-check feature-icon"></i>
              <h3 className="feature-title">Visitor Login</h3>
              <p className="feature-description">
                Streamlined visitor registration and authentication process.
              </p>
            </div>
            <div className="feature-card">
              <i className="fas fa-map-marked-alt feature-icon"></i>
              <h3 className="feature-title">Campus Navigation</h3>
              <p className="feature-description">
                Interactive campus map and step-by-step navigation for visitors.
              </p>
            </div>
            <div className="feature-card">
              <i className="fas fa-shield-alt feature-icon"></i>
              <h3 className="feature-title">Robust Security</h3>
              <p className="feature-description">
                Comprehensive security measures to protect the campus community.
              </p>
            </div>
          </div>
        </section>

        <section className="about-commitment">
          <h2 className="section-title">Our Commitment</h2>
          <p className="commitment-description">
            At CITU-Secure, we are dedicated to providing a secure and efficient visitor management solution that enhances the overall experience of the CIT-U campus community. By combining cutting-edge technology, robust security protocols, and user-centric design, we strive to create a safe and welcoming environment for all visitors to the CIT-U campus.
          </p>
          <div className="commitment-actions">
            <a href="https://citu-secure.com" className="commitment-link">
              Visit our website
            </a>
            <a href="mailto:info@citu-secure.com" className="commitment-link">
              Contact us
            </a>
          </div>
        </section>
      </div>
    </>
  );
};

export default AboutPage;
