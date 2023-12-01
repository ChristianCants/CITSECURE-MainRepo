import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { SearchBar } from './SearchBar'; // Update the path accordingly
import Carousel from 'react-bootstrap/Carousel';
import Dropdown from 'react-bootstrap/Dropdown';

const ViewMap = () => {
  const [activeLink, setActiveLink] = useState('view-map');
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
    top: '16%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: '1', // Ensures the search bar is above the image
  };

  const directionButtonStyles = {
    backgroundColor: 'maroon',
    color: 'white',
    borderRadius: '30px',
    cursor: 'pointer',
    width: '323px',
    height: '50px',
    flexShrink: 0,
    margin: '0 auto',
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

      {/* SearchBar Container */}
      <div style={searchBarContainerStyles}>
        <SearchBar setResults={handleSearchResults} placeholderText="What are you looking for?" />
      </div>

      {/* Carousel */}
      <Carousel data-bs-theme="dark" style={{ width: '80%', margin: '20px auto', marginTop: '60px' }}>
        {/* First Carousel Item */}
        <Carousel.Item>
          {/* Content for the first slide */}
          <img
            className="d-block w-100"
            src="https://scontent.fceb1-1.fna.fbcdn.net/v/t39.30808-6/306843108_570231334896413_7426194698363759958_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=783fdb&_nc_ohc=JWjL1a2-03MAX_YR0QL&_nc_ht=scontent.fceb1-1.fna&oh=00_AfCm-6PIb0WHfpYo9VHuAKS7SNNX8-S5WLujQj3_IrlhYg&oe=656C3361"
            alt="First slide"
            style={{ height: '600px', width: '100%', objectFit: 'cover' }}
          />
          <Carousel.Caption style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', backgroundColor: 'white', padding: '20px', textAlign: 'left', border: '5px solid black' }}>
            <div style={{ color: 'black', display: 'flex', flexDirection: 'column' }}>
              <div>
                <h5>Academic Building</h5>
                <p>One of the best buildings at CIT-U University</p>
              </div>
              <button style={directionButtonStyles} onClick={handleGetDirections}>
                Get Directions
              </button>
            </div>
          </Carousel.Caption>
        </Carousel.Item>

        {/* Second Carousel Item */}
        <Carousel.Item>
          {/* Content for the second slide */}
          <img
            className="d-block w-100"
            src="https://cit.edu/wp-content/uploads/2023/07/SAL-Building.jpg"
            alt="Second slide"
            style={{ height: '600px', width: '100%', objectFit: 'cover' }}
          />
          <Carousel.Caption style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', backgroundColor: 'white', padding: '20px', textAlign: 'left', border: '5px solid black' }}>
            <div style={{ color: 'black', display: 'flex', flexDirection: 'column' }}>
              <div>
                <h5>High School Building</h5>
                <p>One of the best buildings at CIT-U University</p>
              </div>
              <button style={directionButtonStyles} onClick={handleGetDirections}>
                Get Directions
              </button>
            </div>
          </Carousel.Caption>
        </Carousel.Item>

        {/* Third Carousel Item */}
        <Carousel.Item>
          {/* Content for the third slide */}
          <img
            className="d-block w-100"
            src="https://cit.edu/wp-content/uploads/2023/07/Elementary-Building.jpg"
            alt="Third slide"
            style={{ height: '600px', width: '100%', objectFit: 'cover' }}
          />
          <Carousel.Caption style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', backgroundColor: 'white', padding: '20px', textAlign: 'left', border: '5px solid black' }}>
            <div style={{ color: 'black', display: 'flex', flexDirection: 'column' }}>
              <div>
                <h5>Elementary Building</h5>
                <p>One of the best buildings at CIT-U University</p>
              </div>
              <button style={directionButtonStyles} onClick={handleGetDirections}>
                Get Directions
              </button>
            </div>
          </Carousel.Caption>
        </Carousel.Item>

        {/* GLE Building Carousel Item */}
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://storage.googleapis.com/bukas-website-v3-prd/website_v3/images/CIT-U_GLE_Building_01.original.png"
            alt="GLE Building"
            style={{ height: '600px', width: '100%', objectFit: 'cover' }}
          />
          <Carousel.Caption style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', backgroundColor: 'white', padding: '20px', textAlign: 'left', border: '5px solid black' }}>
            <div style={{ color: 'black', display: 'flex', flexDirection: 'column' }}>
              <div>
                <h5>GLE Building</h5>
                <p>This is a new building at CIT-U University</p>
              </div>
              <button style={directionButtonStyles} onClick={handleGetDirections}>
                Get Directions
              </button>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      {/* Display search results */}
      <div>
        {searchResults.map((result) => (
          <div key={result.id}>{result.name}</div>
        ))}
      </div>
    </div>
  );
};

export default ViewMap;
