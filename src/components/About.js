import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Container, Card, Row, Col } from 'react-bootstrap';
import Button from '@mui/material/Button';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import './About.css';

class AboutPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teamMembers: [
        { name: 'Alegarbes, Adrian', title: 'Project Manager', image: 'Adrian.jpg' },
        { name: 'Cabante, Jaimes Edward', title: 'Developer', image: 'Jaimes.jpg' },
        { name: 'Cantiveros, Christian Benedict', title: 'Developer', image: 'Christian.jpg' },
        { name: 'Huyo, Hans Werner', title: 'Developer', image: 'Hans.jpg' }, // Assuming you don't have an image for Hans yet
      ],
    };
  }

  render() {
    const { teamMembers } = this.state;

    const styles = {
      backgroundImage: 'url("images/GLE.2.png")',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      minHeight: '80vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      overflowY: 'hidden',
    };

    const welcomeRectangleStyles = {
      width: '421px',
      height: '121px',
      flexShrink: 0,
      borderRadius: '8px',
      background: '#A43F3F',
      marginTop: '20px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      lineHeight: '121px',
    };

    const glassStyle = {
      width: '1100px',
      height: '400px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      background: 'rgba(255, 255, 255, 0.2)',  // semi-transparent background
      borderRadius: '16px',
      backdropFilter: 'blur(15px)',  // blur effect
      boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',  // light shadow for depth
      border: '2px solid maroon',  // Maroon border
    };

    return (
      <>
        <header className="d-flex flex-wrap align-items-center justify-content-between py-3 mb-4 border-bottom" style={{ backgroundColor: 'maroon', padding: '10px', fontSize: '20px' }}>
          <div style={{ color: 'white', display: 'flex', alignItems: 'center' }}>
            <img src="/images/CIT LOGO.png" alt="CITSecure Logo" width="67" height="60" />
            <span style={{ width: '2.5px', height: '40px', backgroundColor: 'white', margin: '0 5px' }}></span>
            <span>CITSecure</span>
          </div>
          <ul className="nav nav-pills d-flex justify-content-center" style={{ margin: 0, padding: 0, flexGrow: 1 }}>
            <li className="nav-item"><NavLink exact to="/menu" className="nav-link" style={{ color: 'white' }}>Home</NavLink></li>
            <li className="nav-item"><NavLink to="/visitor-navigation" className="nav-link" style={{ color: 'white' }}>Visitor Navigation</NavLink></li>
            <li className="nav-item"><NavLink to="/about" className="nav-link" activeClassName="active" style={{ color: 'maroon', backgroundColor: 'white' }}>About Us</NavLink></li>
          </ul>
          <Button
            variant="contained"
            startIcon={<ChevronLeftIcon />}
            onClick={() => window.location.href = '/'} // Navigates to home page
            style={{
              position: 'absolute',
              top: '30px',
              right: '30px',
              backgroundColor: 'white',
              color: 'maroon',
            }}
          >
            Return
          </Button>
        </header>
        <Container fluid style={styles}>
          <div style={welcomeRectangleStyles}>
            <h1>Welcome CIT-Secure </h1>
          </div>
        </Container>
        <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '1.5em', padding: '10px 100px' }}>
          <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '1.5em', marginBottom: '20px', color: '#8E0018' }}>EXPLORE CIT-U BUILDINGS</div>
          <img src="./images/MapBuilding.png" alt="MapBuilding" style={{ width: '85%', height: '100%' }} />
        </div>
        <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '2em', padding: '10px 100px' }}>
          <div style={{ textAlign: 'left', marginTop: '20px', fontSize: '2em', fontWeight: 'bold', marginBottom: '-44px', color: '#8E0018', borderBottom: '3px solid #F8BD00', display: 'left' }}>ABOUT US</div>
        </div>
        <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '1.5em', padding: '10px 100px' }}>
          <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '1.5em', marginBottom: '20px', color: '#8E0018' }}>CITU-Secure aims to develop and implement an integrated system for visitor database monitoring and navigation within the CIT-U campus premises</div>
        </div>
        <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '2em', padding: '10px 100px' }}>
          <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '2em', fontWeight: 'bold', marginBottom: '40px', color: '#8E0018', textDecoration: 'underline', textDecorationThickness: '5px', textDecorationWidth: '0.1em', textDecorationColor: '#F8BD00' }}>MEET THE TEAM</div>
          <Row style={{ justifyContent: 'center' }}>
  {teamMembers.map((member, index) => (
    <Col key={index} xs={12} sm={6} md={4} lg={3} style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
      <Card style={{ width: '18rem' }}>
        <Card.Img 
          variant="top" 
          src={`/images/${member.image}`} 
          alt={`${member.name}`} 
          style={{
            height: '300px',  // Ensure uniform height
            objectFit: 'cover',  // This keeps the aspect ratio while cropping the image to fit the dimensions
          }}
        />
        <Card.Body>
          <Card.Title style={{ fontSize: '25px', fontWeight: 'bold' }}>{member.name}</Card.Title>
          <Card.Text style={{ fontSize: '18px' }}>{member.title}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  ))}
</Row>

        </div>
        <section style={{ padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={glassStyle}>
            <div style={{ display: 'flex', alignItems: 'center', marginTop: '100px' }}>
              <img src="/images/CIT LOGO.png" alt="CITSecure Logo" width="67" height="60" />
              <span style={{ width: '1px', height: '35px', backgroundColor: 'black', margin: '0 5px' }}></span>
              <span>CITU- Secure</span>
            </div>
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
              <p style={{ color: 'maroon' }}>Contact Us</p>
              <p>Natalio B. Bacalso Ave, Cebu City, 6000 Cebu</p>
              <p>(032) 261 7741</p>
            </div>
          </div>
        </section>
        <div style={{ borderTop: '3px solid maroon', margin: '20px auto 30px', width: '90%' }}></div>
        <div style={{ textAlign: 'center', color: 'maroon', marginBottom: '20px' }}>
          2024 CITU - Secure. All rights reserved™.
        </div>
      </>
    );
  }
}

export default AboutPage;
