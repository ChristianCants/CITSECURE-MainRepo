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
      src="https://scontent.fceb3-1.fna.fbcdn.net/v/t1.15752-9/384549675_1028090461807314_3470518651785484799_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=8cd0a2&_nc_eui2=AeH4YJ3ewAXxeEZWKUllvmrusOKrfiTjMuuw4qt-JOMy6ws0EhnQNqYZhkXeugb5jqE7yzilwMLN_fssIX_JYrsh&_nc_ohc=KYx0WMR84hkAX_e3iE4&_nc_ht=scontent.fceb3-1.fna&oh=03_AdSlsEhQ4B2wxZmIpPCR8AHU6t0b3DxYy6Lfrle9p0fk4A&oe=65924EBF"
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

  {/* Main Canteen Carousel Item */}
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="https://scontent.fceb3-1.fna.fbcdn.net/v/t1.15752-9/404324525_1484226729085275_1644542747142881475_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=8cd0a2&_nc_eui2=AeFhLMwCtqF9GfbYJ24sLzZKtGfr-qdm_Z20Z-v6p2b9narKh0MtKl-tpTPe41nXkwzW9Hezt09nxLAafQ5YyqG2&_nc_ohc=_uRE4owBP1oAX-ZeBP6&_nc_ht=scontent.fceb3-1.fna&oh=03_AdS13t71Jt0Y98Te1IY9L3VLZfb7kU6Agm9MmgR4ldvqaw&oe=65924CB3"
      alt="Canteen"
      style={{ height: '600px', width: '100%', objectFit: 'cover' }}
    />
    <Carousel.Caption style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', backgroundColor: 'white', padding: '20px', textAlign: 'left', border: '5px solid black' }}>
      <div style={{ color: 'black', display: 'flex', flexDirection: 'column' }}>
        <div>
          <h5>Main Canteen</h5>
          <p>Enjoy spending money</p>
        </div>
        <button style={directionButtonStyles} onClick={handleGetDirections}>
          Get Directions
        </button>
      </div>
    </Carousel.Caption>
  </Carousel.Item>

  {/* RTL Building Carousel Item */}
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="https://scontent.fceb3-1.fna.fbcdn.net/v/t1.15752-9/405387925_366884246001992_5093631182942274981_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=8cd0a2&_nc_eui2=AeHKffuhZ9NEBt6YGhkO6RMNNIm8CriwhuU0ibwKuLCG5WrFfxw_qRRcjxRvzSkGC-9TsVWB9R7o4apsv-53gDTQ&_nc_ohc=TWmi3jQi46EAX-zgK5r&_nc_oc=AQnHbgTn9jGJnLgRx7DM6XmLI6EKZuRxMwgde9WYJFmTY8K_GsJAijj_Cc9U6ScOpVY&_nc_ht=scontent.fceb3-1.fna&oh=03_AdTSic1vGKxNZRq4zjTNvHaHcxw7Q050voDRKHteyk-rfg&oe=6592279B"
      alt="RTL"
      style={{ height: '600px', width: '100%', objectFit: 'cover' }}
    />
    <Carousel.Caption style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', backgroundColor: 'white', padding: '20px', textAlign: 'left', border: '5px solid black' }}>
      <div style={{ color: 'black', display: 'flex', flexDirection: 'column' }}>
        <div>
          <h5>RTL BUILDING</h5>
          <p>Description for the new building 2</p>
        </div>
        <button style={directionButtonStyles} onClick={handleGetDirections}>
          Get Directions
        </button>
      </div>
    </Carousel.Caption>
  </Carousel.Item>

  {/* RTL Building Carousel Item */}
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="https://scontent.fceb3-1.fna.fbcdn.net/v/t1.15752-9/405387925_366884246001992_5093631182942274981_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=8cd0a2&_nc_eui2=AeHKffuhZ9NEBt6YGhkO6RMNNIm8CriwhuU0ibwKuLCG5WrFfxw_qRRcjxRvzSkGC-9TsVWB9R7o4apsv-53gDTQ&_nc_ohc=TWmi3jQi46EAX-zgK5r&_nc_oc=AQnHbgTn9jGJnLgRx7DM6XmLI6EKZuRxMwgde9WYJFmTY8K_GsJAijj_Cc9U6ScOpVY&_nc_ht=scontent.fceb3-1.fna&oh=03_AdTSic1vGKxNZRq4zjTNvHaHcxw7Q050voDRKHteyk-rfg&oe=6592279B"
      alt="RTL"
      style={{ height: '600px', width: '100%', objectFit: 'cover' }}
    />
    <Carousel.Caption style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', backgroundColor: 'white', padding: '20px', textAlign: 'left', border: '5px solid black' }}>
      <div style={{ color: 'black', display: 'flex', flexDirection: 'column' }}>
        <div>
          <h5>NGE BUILDING</h5>
          <p>Description for the new building 2</p>
        </div>
        <button style={directionButtonStyles} onClick={handleGetDirections}>
          Get Directions
        </button>
      </div>
    </Carousel.Caption>
  </Carousel.Item>

  {/* RTL Building Carousel Item */}
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="https://scontent.fceb3-1.fna.fbcdn.net/v/t1.15752-9/405387925_366884246001992_5093631182942274981_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=8cd0a2&_nc_eui2=AeHKffuhZ9NEBt6YGhkO6RMNNIm8CriwhuU0ibwKuLCG5WrFfxw_qRRcjxRvzSkGC-9TsVWB9R7o4apsv-53gDTQ&_nc_ohc=TWmi3jQi46EAX-zgK5r&_nc_oc=AQnHbgTn9jGJnLgRx7DM6XmLI6EKZuRxMwgde9WYJFmTY8K_GsJAijj_Cc9U6ScOpVY&_nc_ht=scontent.fceb3-1.fna&oh=03_AdTSic1vGKxNZRq4zjTNvHaHcxw7Q050voDRKHteyk-rfg&oe=6592279B"
      alt="RTL"
      style={{ height: '600px', width: '100%', objectFit: 'cover' }}
    />
    <Carousel.Caption style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', backgroundColor: 'white', padding: '20px', textAlign: 'left', border: '5px solid black' }}>
      <div style={{ color: 'black', display: 'flex', flexDirection: 'column' }}>
        <div>
          <h5>ALLIED BUILDING</h5>
          <p>Description for the new building 2</p>
        </div>
        <button style={directionButtonStyles} onClick={handleGetDirections}>
          Get Directions
        </button>
      </div>
    </Carousel.Caption>
  </Carousel.Item>

  {/* RTL Building Carousel Item */}
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="https://scontent.fceb3-1.fna.fbcdn.net/v/t1.15752-9/405387925_366884246001992_5093631182942274981_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=8cd0a2&_nc_eui2=AeHKffuhZ9NEBt6YGhkO6RMNNIm8CriwhuU0ibwKuLCG5WrFfxw_qRRcjxRvzSkGC-9TsVWB9R7o4apsv-53gDTQ&_nc_ohc=TWmi3jQi46EAX-zgK5r&_nc_oc=AQnHbgTn9jGJnLgRx7DM6XmLI6EKZuRxMwgde9WYJFmTY8K_GsJAijj_Cc9U6ScOpVY&_nc_ht=scontent.fceb3-1.fna&oh=03_AdTSic1vGKxNZRq4zjTNvHaHcxw7Q050voDRKHteyk-rfg&oe=6592279B"
      alt="RTL"
      style={{ height: '600px', width: '100%', objectFit: 'cover' }}
    />
    <Carousel.Caption style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', backgroundColor: 'white', padding: '20px', textAlign: 'left', border: '5px solid black' }}>
      <div style={{ color: 'black', display: 'flex', flexDirection: 'column' }}>
        <div>
          <h5>HIGH SCHOOL CANTEEN </h5>
          <p>Description for the new building 2</p>
        </div>
        <button style={directionButtonStyles} onClick={handleGetDirections}>
          Get Directions
        </button>
      </div>
    </Carousel.Caption>
  </Carousel.Item>

  {/* RTL Building Carousel Item */}
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="https://scontent.fceb3-1.fna.fbcdn.net/v/t1.15752-9/405387925_366884246001992_5093631182942274981_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=8cd0a2&_nc_eui2=AeHKffuhZ9NEBt6YGhkO6RMNNIm8CriwhuU0ibwKuLCG5WrFfxw_qRRcjxRvzSkGC-9TsVWB9R7o4apsv-53gDTQ&_nc_ohc=TWmi3jQi46EAX-zgK5r&_nc_oc=AQnHbgTn9jGJnLgRx7DM6XmLI6EKZuRxMwgde9WYJFmTY8K_GsJAijj_Cc9U6ScOpVY&_nc_ht=scontent.fceb3-1.fna&oh=03_AdTSic1vGKxNZRq4zjTNvHaHcxw7Q050voDRKHteyk-rfg&oe=6592279B"
      alt="RTL"
      style={{ height: '600px', width: '100%', objectFit: 'cover' }}
    />
    <Carousel.Caption style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', backgroundColor: 'white', padding: '20px', textAlign: 'left', border: '5px solid black' }}>
      <div style={{ color: 'black', display: 'flex', flexDirection: 'column' }}>
        <div>
          <h5>Extraa BUILDING</h5>
          <p>Description for the new building 2</p>
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
