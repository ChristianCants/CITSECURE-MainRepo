import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Nav, Navbar, Dropdown } from 'react-bootstrap';
import { Card, Row, Col } from 'react-bootstrap';
import './MenuPage.css';

const MenuPage = () => {
  const [activeLink, setActiveLink] = useState('home');
  const navigate = useNavigate();

  const handleLogout = () => {
    const shouldLogout = window.confirm('Are you sure you want to log out?');
    if (shouldLogout) {
      navigate('/');
    }
  };

  const navLinks = [
    { label: 'View Map', href: '/view-map', id: 'view-map' },
    { label: 'Exit', href: '/exit', id: 'exit' },
  ];

  // Array containing all campus locations
  const campusLocations = [
    "B1 - Dr. Nicolas G. Escario Sr. Building (NGE)",
    "B2 - Don Rodolfo T. Lizares Sr. Building (RTL)",
    "B3 - Learning Resource and Activity Center (LRAC)",
    "B4 - T-Rooms BS",
    "B5 - Satellite School Canteen",
    "B6 - Allied Engineering Building",
    "B7 - Chemical Engineering Building",
    "B8 - Electrical Power House",
    "B9 - Mechanical Engineering Building",
    "B10 - Don Simplicio A. Lizares, Sr. Building (SAL)",
    "B11 - Mining Engineering Building",
    "B12 - School Gymnasium",
    "B13 - Elementary Pupils Activity Center",
    "B14 - Elementary Department Building",
    "B15 - Elementary Waiting Shed",
    "B16 - Elementary Guidance Building",
    "B17 - Elementary Department Office",
    "B18 - New Academic Building",
    "B19 - Main School Canteen",
    "B20 - Covered Court",
    "B21 - Lecture Rooms",
    "B22 - Physical Education Dressing Room",
    "B23 - Front Gate Guard House",
    "B24 - Food Innovation Center",
    "B25 - High School Canteen",
    "B26 - Maintenance Stockroom",
    "B27 - Back Gate Guard House",
    "B28 - Community Extension Service Training Center",
    "B29 - Back Gate Motorcycle Parking Area",
    "B30 - Material Recovery Facility Area",
    "B31 - Motorcycle Parking Lot and STP Area",
    "B32 - Flair Tending Area",
    "B33 - Gym Powerhouse",
    "B34 - Physics Laboratories",
    "B35 - Gregorio L. Escario Building (GLE)",
    "B36 - Gregorio L. Escario Building Powerhouse",
    "B37 - School Bus Garage",
    "B38 - Front Gate Isolation Room"
  ];

  return (
    <>
      <Navbar
        className="d-flex flex-wrap align-items-center justify-content-between py-3 mb-0 border-bottom"
        style={{
          backgroundColor: 'maroon',
          display: 'flex',
          alignItems: 'center',
          padding: '10px',
          justifyContent: 'space-between',
        }}
      >
        <div
          style={{
            color: 'white',
            marginLeft: '10px',
            position: 'relative',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
          }}
          onClick={() => navigate('/')}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="56"
            height="40"
            viewBox="0 0 56 54"
            fill="none"
          >
            <path
              d="M2.91855 24.6698L53.7146 2.74497L28.2999 51.8879L23.7747 30.6645L2.91855 24.6698Z"
              stroke="white"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span
            style={{
              width: '2px',
              height: '30px',
              backgroundColor: 'white',
              margin: '0 5px',
            }}
          ></span>
          <span>CIT Secure</span>
        </div>
        <Nav className="d-flex align-items-center">
          {navLinks.map(({ label, href, id }) => (
            <Nav.Link
              key={id}
              href={href}
              className={`nav-link ${activeLink === id ? 'active' : ''}`}
              style={{
                color: activeLink === id ? 'white' : 'white',
                margin: '0 80px',
                textDecoration: 'none',
                position: 'relative',
              }}
              onClick={() => setActiveLink(id)}
            >
              {label}
              <div
                style={{
                  height: '4px',
                  width: '100%',
                  backgroundColor: 'white',
                  position: 'absolute',
                  bottom: '-4px',
                  left: '0',
                  display: activeLink === id ? 'block' : 'none',
                  transition: '0.3s',
                }}
              ></div>
            </Nav.Link>
          ))}
          <Dropdown>
            {/* Dropdown content */}
          </Dropdown>
        </Nav>
      </Navbar>

      <Container fluid style={{ backgroundColor: '#ebebeb' }}>
        <Row>
          <Col sm={12} style={{ position: 'relative' }}>
            <img
              src="/images/MenuMap.png"
              alt="Menu Map"
              style={{
                width: '60%',
                height: 'auto',
                position: 'absolute',
                top: '0',
                left: '60px',
                transform: 'translate(0, 0)',
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col sm={3} style={{ position: 'relative', marginLeft: 'auto', marginBottom: '50px', marginTop: '10px' }}>
            <Card style={{ width: '500px', right: '200px', border: '2px solid maroon', backgroundColor: '#fff9eb' }}>
            <Card.Header style={{ backgroundColor: 'maroon', color: 'white', fontWeight: 'bold', textAlign: 'center' }}>Campus Directory</Card.Header>
              <Card.Body>
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                  {campusLocations.map(location => (
                    <li key={location}>{location}</li>
                  ))}
                </ul>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default MenuPage;
