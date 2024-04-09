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

  return (
    <>
      <Navbar
        className="d-flex flex-wrap align-items-center justify-content-between py-3 mb-4 border-bottom"
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

      <Container fluid>
  <Row>
    <Col sm={12} style={{ position: 'relative' }}>
      <img
        src="/images/MenuMap.png"
        alt="Menu Map"
        style={{
          width: '50%',
          height: 'auto',
          position: 'absolute',
          top: '0',
          left: '100px',
          transform: 'translate(0, 0)',
        }}
      />
    </Col>
  </Row>
</Container>
    </>
  );
};

export default MenuPage;