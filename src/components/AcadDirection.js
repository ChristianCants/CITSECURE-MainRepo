import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';

const AcadDirection = () => {
  const [activeLink, setActiveLink] = useState([]);

  const pageStyles = {
    // Define your page styles here
  };

  const navBarStyles = {
    backgroundColor: 'maroon',
    display: 'flex',
    alignItems: 'center',
    padding: '10px',
    justifyContent: 'space-between',
  };

  const citNaviGoStyles = {
    color: 'white',
    marginLeft: '10px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
  };

  const navLinkStyles = {
    color: 'white',
    margin: '0 80px',
    textDecoration: 'none', // Remove underline
  };

  const lineStyles = {
    content: '""',
    height: '2px',
    width: '100%',
    backgroundColor: 'white',
    position: 'absolute',
    bottom: '-4px',
    left: 0,
    transition: '0.3s',
  };

  const imageStyles = {
    width: '200px', // Adjust the width as needed
    height: '200px', // Adjust the height as needed
  };

  const navigate = (path) => {
    // Define your navigation logic here
  };

  const handleProfileClick = () => {
    // Define your profile click logic here
  };

  const handleLogout = () => {
    // Define your logout logic here
  };

  const handleSearchResults = (results) => {
    // Define your search results logic here
  };

  const navLinks = [
    { label: 'Home', href: '/', id: 'home' },
    { label: 'View Map', href: '/view-map', id: 'view-map' },
    { label: 'Building', href: '/building', id: 'building' },
  ];

  return (
    <div style={pageStyles}>
      {/* Navigation Bar */}
      <div style={navBarStyles}>
        <div
          style={citNaviGoStyles}
          onClick={() => {
            setActiveLink('home');
            navigate('/menu');
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 56 54" fill="none">
            <path d="M2.91855 24.6698L53.7146 2.74497L28.2999 51.8879L23.7747 30.6645L2.91855 24.6698Z" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span style={{ width: '1px', height: '35px', backgroundColor: 'white', margin: '0 5px' }}></span>
          <span>CIT NaviGO</span>
          <div
            style={{
              ...lineStyles,
              display: activeLink === 'home' ? 'block' : 'none',
            }}
          ></div>
        </div>
        <div>
          {navLinks.map((link) => (
            <Link
              key={link.id}
              to={link.href}
              style={{
                ...navLinkStyles,
                color: activeLink === link.id ? 'white' : 'white',
              }}
              onClick={() => setActiveLink(link.id)}
            >
              {link.label}
              <div
                style={{
                  ...lineStyles,
                  display: activeLink === link.id ? 'block' : 'none',
                }}
              ></div>
            </Link>
          ))}
        </div>
      </div>

      {/* Centered Image */}
      <img
        src="\images\ACAD DIRECTION.jpg"
        alt="Centered Image"
        style={imageStyles}
      />

      {/* Dropdown Button */}
      <Dropdown>
        <Dropdown.Toggle variant="link" id="dropdown-basic" style={{ color: 'white', marginLeft: '10px' }}>
          {/* Remove the avatar image */}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={handleProfileClick}>Profile</Dropdown.Item>
          <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default AcadDirection;
