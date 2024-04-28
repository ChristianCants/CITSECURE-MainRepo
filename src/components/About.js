import { NavLink } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { Card, Row, Col } from 'react-bootstrap';
import './About.css';

const Aboutpage = () => {

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

  const teamMembers = [
    { name: 'Alegarbes, Adrian', title: 'Project Manager'},
    { name: 'Abanid, Breshly', title: 'Developer'},
    { name: 'Cabante, Jaimes Edward', title: 'Developer'},
    { name: 'Cantiveros, Christian Benedict', title: 'UI/UX Designer'},
    { name: 'Ilosorio, Anne Jenel', title: 'Quality Assurance'},
    { name: 'Dumo, Kevin Zeldwyn', title: 'Quality Assurance'},
    { name: 'Cabanes, John Michael', title: 'UI/UX Designer'},
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
  // const navBarStyles = {
  //   backgroundColor: 'maroon',
  //   display: 'flex',
  //   alignItems: 'center',
  //   padding: '10px',
  //   justifyContent: 'space-between',
  // };
  // const lineStylesCITNaviGO = {
  //   content: '""',
  //   height: '2px',
  //   width: '100%',
  //   backgroundColor: 'white',
  //   position: 'absolute',
  //   bottom: '-4px',
  //   left: '-10px', 
  //   display: 'none',
  //   transition: '0.3s',
  // };
  // const citNaviGoStyles = {
  //   color: 'white',
  //   marginLeft: '10px',
  //   position: 'relative',
  //   cursor: 'pointer',
  //   display: 'flex',
  //   alignItems: 'center',
  // };
  
  // const iconStyles = {
  //   marginRight: '5px', 
  // };
  
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
  // const navLinkStyles = {
  //   color: 'white',
  //   margin: '0 80px',
  //   textDecoration: 'none', // Remove underline
  // };
  // const navLinks = [
  //   { label: 'Home', href: '/', id: 'home' },
  //   { label: 'View Map', href: '/view-map', id: 'view-map' },
  //   { label: 'Building', href: '/building', id: 'building' },
  // ];

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
          <img src="/images/CITSecure LOGO.png" alt="CITSecure Logo" width="67" height="60" />
          <span style={{ width: '2.5px', height: '40px', backgroundColor: 'white', margin: '0 5px' }}></span>
          <span>CITSecure</span>
        </div>
        <ul className="nav nav-pills d-flex justify-content-center" style={{ margin: 0, padding: 0, flexGrow: 1 }}>
          <li className="nav-item"><NavLink exact to="/menu" className="nav-link" style={{ color: 'white' }}>Home</NavLink></li>
          <li className="nav-item"><NavLink to="/visitor-navigation" className="nav-link" style={{ color: 'white' }}>Visitor Navigation</NavLink></li>
          <li className="nav-item"><NavLink to="/about" className="nav-link" activeClassName="active" style={{ color: 'maroon', backgroundColor: 'white' }}>About Us</NavLink></li>
        </ul>
      </header>
      <Container fluid style={styles}>
        <div style={welcomeRectangleStyles}>
          <h1>Welcome CIT-Secure </h1>
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
          EXPLORE CIT-U BUILDINGS
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
          CITU-Secure aims to develop and implement an integrated system for visitor database monitoring and navigation within the CIT-U campus premises
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
          THE TEAM
        </div>
        <Row style={{ justifyContent: 'center' }}>
          {teamMembers.map((member, index) => (
            <Col key={index} xs={12} sm={6} md={4} lg={3} style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
              <Card style={{ width: '25rem' }}>
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
        <div style={{ backgroundColor: '#FFEFBA', width: '1100px', height: '400px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginTop: '100px' }}>
            <img src="/images/CITSecure LOGO.png" alt="CITSecure Logo" width="67" height="60" />
            <span style={{ width: '1px', height: '35px', backgroundColor: 'black', margin: '0 5px' }}></span>
            <span>CIT NaviGO</span>
          </div>
          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <p style={{ color: 'maroon' }}>Contact Us</p>
            <p>Natalio B. Bacalso Ave, Cebu City, 6000 Cebu</p>
            <p>(032) 261 7741</p>
          </div>
          <div style={lineStyles}></div>
        </div>
      </section>
      <div style={{ borderTop: '2px solid maroon', margin: '20px auto', width: '80%' }}></div>
      <div style={{ textAlign: 'center', color: 'maroon', marginBottom: '20px' }}>
        2023 CIT NaviGo. All rights reserved.
      </div>
    </>
  );
};

export default Aboutpage;
