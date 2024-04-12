import React from 'react';
import styles from './About.css'; // Import CSS module

const AboutPage = () => {
  return (
    <div className="about-container">
      <h1 className="about-title">About CITU-Secure</h1>
      <p className="about-description">
        CITU-Secure is a cutting-edge platform designed to provide secure and efficient visitor management solutions for educational institutions.
      </p>
      <div className="about-features">
        <div className="about-feature">
          
          <p className="feature-text">Visitor Login</p>
        </div>
        <div className="about-feature">
          
          <p className="feature-text">Campus Information</p>
        </div>
        {/* Add more features here */}
      </div>
      <button className="about-button">Learn More</button>
      <div className="about-commitment">
        <h2 className="commitment-title">Our Commitment</h2>
        <p className="commitment-description">
          At CITU-Secure, we are committed to delivering a secure and efficient visitor management solution that enhances the overall experience of the CIT-U campus community. By combining cutting-edge technology, robust security protocols, and user-centric design, we strive to create a safe and welcoming environment for all visitors to the CIT-U campus.
        </p>
        <p className="commitment-contact">
           please visit our website at <a href="https://citu-secure.com">citu-secure.com</a> or contact us at <a href="mailto:info@citu-secure.com">info@citu-secure.com</a>.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;