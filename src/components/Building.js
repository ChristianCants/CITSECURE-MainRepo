import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { SearchBar } from './SearchBar'; // Update the path accordingly
import Carousel from 'react-bootstrap/Carousel';
import Dropdown from 'react-bootstrap/Dropdown';

const Building = () => {
  const [activeLink, setActiveLink] = useState('building');
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  const pageStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const navBarStyles = {
    backgroundColor: 'maroon',
    width: '100%',
    padding: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  };

  const searchBarContainerStyles = {
    position: 'absolute',
    top: '30%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: '1', // Ensures the search bar is above the image
  };

  const directionButtonStyles = {
    backgroundColor: 'maroon',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '30px',
    marginTop: '70px',
    cursor: 'pointer',
    width: '323px',
    height: '50px',
    flexShrink: 0,
  };

  const citNaviGoStyles = {
    color: 'white',
    marginLeft: '10px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
  };

  const iconStyles = {
    marginRight: '5px', // Adjust the margin as needed
  };

  const lineStyles = {
    content: '""',
    height: '2px',
    width: '100%',
    backgroundColor: 'white',
    position: 'absolute',
    bottom: '-4px',
    left: 0,
    display: 'block',
    transition: '0.3s',
  };

  const navLinkStyles = {
    color: 'white',
    margin: '0 80px',
    position: 'relative',
  };

  const navLinks = [
    { label: 'Home', href: '/menu', id: 'home' },
    { label: 'View Map', href: '/view-map', id: 'view-map' },
    { label: 'Building', href: '/building', id: 'building' },
  ];

  const handleSearchResults = (results) => {
    setSearchResults(results);
  };

  const handleGetDirections = () => {
    // Implement logic to get directions
    console.log('Getting directions...');
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
            <path d="M2.91855 24.6698L53.7146 2.74497L28.2999 51.8879L23.7747 30.6645L2.91855 24.6698Z" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
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

        {/* Dropdown Button */}
        <Dropdown>
          <Dropdown.Toggle variant="link" id="dropdown-basic" style={{ color: 'white', marginLeft: '10px' }}>
            <img src="images/Avatar.png" alt="Your Image" width="32" height="32" className="rounded-circle" />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={handleProfileClick}>Profile</Dropdown.Item>
            <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      {/* Container for SearchBar, DarkVariantExample Carousel, and Building content */}
      <div style={{ position: 'relative', marginTop: '20px' }}>
        {/* SearchBar Container */}
        <div style={searchBarContainerStyles}>
          <SearchBar setResults={handleSearchResults} placeholderText="Search Course" />

          {/* Get Directions Button */}
          <button style={directionButtonStyles} onClick={handleGetDirections}>
            Get Directions
          </button>
        </div>

        {/* DarkVariantExample Carousel */}
        <Carousel data-bs-theme="dark" style={{ width: '80%', margin: '20px auto' }}>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="/images/Building1.jpg"
              alt=""
              style={{ height: '600px', width: '200%' }}
            />
            <Carousel.Caption>
              <h5>First slide label</h5>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://images.pexels.com/photos/1480688/pexels-photo-1480688.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
              alt=""
              style={{ height: '600px' }}
            />
            <Carousel.Caption>
              <h5>Second slide label</h5>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg?size=626&ext=jpg&ga=GA1.1.2116175301.1701129600&semt=ais"
              alt=""
              style={{ height: '600px' }}
            />
            <Carousel.Caption>
              <h5>Third slide label</h5>
              <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>

        {/* Your Building content goes here */}
        <div style={{ marginTop: '20px', position: 'relative' }}>
          {/* Add your content, images, etc. */}
        </div>

        {/* Display search results */}
        <div>
          {searchResults.map((result) => (
            <div key={result.id}>{result.name}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Building;
