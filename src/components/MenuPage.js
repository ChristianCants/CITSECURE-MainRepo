import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Nav, Navbar, Dropdown } from 'react-bootstrap';
import { Card, Row, Col } from 'react-bootstrap';
import './MenuPage.css';

const MenuPage = () => {
  const [activeLink, setActiveLink] = useState('home');

  const styles = {
    backgroundImage: 'url("images/GLE.png")',
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

  const teamMembers = [
    { name: 'Adrian Alegarbes', imageSrc: './images/adrian.png' },
    { name: 'Christian Cantiveros', imageSrc: './images/christian.png' },
    { name: 'Jaimes Cabante', imageSrc: './images/jaimes.png' },
    { name: 'Ñamalyzha Tejeno', imageSrc: './images/Ñamalyzha.png' },
  ];

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
  

  const handleLogout = () => {
    const shouldLogout = window.confirm('Are you sure you want to log out?');

    if (shouldLogout) {
      // Add any logout logic here
      // For example, clear user session, cookies, or perform API logout
      // After the logout logic, navigate to the login page or any other desired page
      navigate('/');
    }
  };

  const handleSettingsClick = () => {
    // Add logic to handle settings click
    console.log('Settings clicked');
  };

  const handleProfileClick = () => {
    // Add logic to handle profile click
    navigate('/user-profile'); // Navigate to the user profile page
  };


  const navigate = useNavigate();

  const handleLogoClick = () => {
    // setActiveLink('home');
    // navigate('/');
  };

  const navBarStyles = {
    backgroundColor: 'maroon',
    display: 'flex',
    alignItems: 'center',
    padding: '10px',
    justifyContent: 'space-between',
  };

  const lineStylesCITNaviGO = {
    content: '""',
    height: '2px',
    width: '100%',
    backgroundColor: 'white',
    position: 'absolute',
    bottom: '-4px',
    left: '-10px', // Adjust the left position to move the underline to the left
    display: 'none', // Hide the underline
    transition: '0.3s',
  };

  const citNaviGoStyles = {
    color: 'white',
    marginLeft: '10px',
    position: 'relative',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
  };
  
  const iconStyles = {
    marginRight: '5px', // Adjust the spacing between the icon and text
  };
  
  const lineStyles = {
    content: '""',
    height: '2px',
    width: '100%',
    backgroundColor: 'white',
    position: 'absolute',
    bottom: '-4px',
    left: '0',
    display: 'none', // Hide the underline
    transition: '0.3s',
  };

  const navLinkStyles = {
    color: 'white',
    margin: '0 80px',
    textDecoration: 'none', // Remove underline
  };

  const navLinks = [
    { label: 'Home', href: '/', id: 'home' },
    { label: 'View Map', href: '/view-map', id: 'view-map' },
    { label: 'Building', href: '/building', id: 'building' },
  ];

  return (
    <>
      <Navbar className="d-flex flex-wrap align-items-center justify-content-between py-3 mb-4 border-bottom" style={navBarStyles}>
  <div style={citNaviGoStyles} onClick={handleLogoClick}>
    <svg xmlns="http://www.w3.org/2000/svg" width="56" height="40" viewBox="0 0 56 54" fill="none">
      <path d="M2.91855 24.6698L53.7146 2.74497L28.2999 51.8879L23.7747 30.6645L2.91855 24.6698Z" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
    <span style={{ width: '2px', height: '30px', backgroundColor: 'white', margin: '0 5px' }}></span>
    <span>CIT NaviGO</span>
  </div>
        <Nav className="d-flex align-items-center">
          {navLinks.map(({ label, href, id }) => (
            <Nav.Link
              key={id}
              href={href}
              className={`nav-link ${activeLink === id ? 'active' : ''}`}
              style={{ ...navLinkStyles, color: activeLink === id ? 'white' : 'white', position: 'relative' }}
              onClick={() => setActiveLink(id)}
            >
              {label}
              <div style={{ ...lineStyles, display: activeLink === id ? 'block' : 'none' }}></div>
            </Nav.Link>
          ))}

          {/* Dropdown Button */}
          <Dropdown>
            <Dropdown.Toggle variant="link" id="dropdown-basic" style={{ color: 'white', marginRight: '10px' }}>
              <img src="images/Avatar.png" alt="Your Image" width="32" height="32" className="rounded-circle" />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={handleProfileClick}>Profile</Dropdown.Item>
             
              <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          {/* Logout button */}
        </Nav>
      </Navbar>

      <Container fluid style={styles}>
        <div style={welcomeRectangleStyles}>
          <h1>Welcome CIT-Navigo </h1>
        </div>
      </Container>

      <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '1.5em', padding: '10px 100px' }}>
        <div
          style={{
            textAlign: 'center',
            marginTop: '20px',
            fontSize: '1.5em',
            marginBottom: '20px',
            color: '#8E0018',
          }}
        >
          EXPLORE CIT BUILDINGS
        </div>
        <img src="./images/MapBuilding.png" alt="MapBuilding" style={{ width: '85%', height: '100%' }} />
      </div>
      <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '2em', padding: '10px 100px' }}>
  <div
    style={{
      textAlign: 'left',
      marginTop: '20px',
      fontSize: '2em',
      fontWeight: 'bold',
      marginBottom: '-44px',
      color: '#8E0018',
      borderBottom: '3px solid #F8BD00', // Adjust the width and color of the underline
      display: 'left',
    }}
  >
    ABOUT US
  </div>
</div>



      <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '1.5em', padding: '10px 100px',  }}>
        <div
          style={{
            textAlign: 'center',
            marginTop: '20px',
            fontSize: '1.5em',
            marginBottom: '20px',
            color: '#8E0018',
          }}
        >
          Welcome to CIT Navigo, your seamless guide to campus exploration, ensuring students and faculty effortlessly navigate their educational journey with interactive maps.
        </div>
      </div>
      <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '2em', padding: '10px 100px' }}>
      <div
        style={{
          textAlign: 'center',
          marginTop: '20px',
          fontSize: '2em',
          fontWeight: 'bold',
          marginBottom: '40px',
          color: '#8E0018',
          textDecoration: 'underline',
          textDecorationThickness: '5px', // Adjust the stroke thickness as needed
          textDecorationWidth: '0.1em', // Adjust the width of the underline
          textDecorationColor: '#F8BD00', // Set the color of the underline
        }}
      >
        OUR TEAM
      </div>

      <Row>
        {teamMembers.map((member, index) => (
          <Col key={index} xs={6} md={3}>
            <Card style={{ width: '18rem', marginBottom: '20px' }}>
              <Card.Img variant="top" src={member.imageSrc} alt={member.name} />
              <Card.Body>
                {/* Apply font size style here */}
                <Card.Title style={{ fontSize: '25px' }}>{member.name}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>

    <section style={{ padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
  <div style={{ backgroundColor: '#FFEFBA', width: '1100px', height: '400px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <div style={{ display: 'flex', alignItems: 'center', marginTop: '100px' }}>
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 56 54" fill="none">
        <path d="M2.91855 24.6698L53.7146 2.74497L28.2999 51.8879L23.7747 30.6645L2.91855 24.6698Z" stroke="black" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span style={{ width: '1px', height: '35px', backgroundColor: 'black', margin: '0 5px' }}></span>
      <span>CIT NaviGO</span>
    </div>
    <div style={{ marginTop: '20px', textAlign: 'center' }}>
      <p style={{ color: 'maroon' }}>Contact Us</p>
      <p>Natalio B. Bacalso Ave, Cebu City, 6000 Cebu</p>
      <p>(032) 261 7741</p>
    </div>
  </div>
</section>


    </>
  );
};

export default MenuPage;