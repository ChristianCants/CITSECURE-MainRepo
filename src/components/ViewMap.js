import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { SearchBar } from './SearchBar'; // Update the path accordingly

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
    top: '60%',
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
      </div>

      {/* SearchBar Container */}
      <div style={searchBarContainerStyles}>
      <SearchBar setResults={handleSearchResults} placeholderText="What are you looking for?" />
        {/* Get Directions Button */}
        <button style={directionButtonStyles} onClick={handleGetDirections}>
          Get Direction
        </button>
      </div>

      {/* Your View Map content goes here */}
      <div style={{ marginTop: '20px', position: 'relative' }}>
        {/* Add your content, images, etc. */}
        <img
          src={process.env.PUBLIC_URL + '/images/SearchBar.png'}
          alt="Your Image"
          style={{
            width: '100%',
            height: 'auto', // Set height to auto to maintain the original aspect ratio
          }}
        />
      </div>

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