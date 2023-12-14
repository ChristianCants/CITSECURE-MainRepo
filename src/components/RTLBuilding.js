import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';

const RTLBuilding = () => {
  const [activeLink, setActiveLink] = useState('view-map');
  const navigate = useNavigate();

  const pageStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: '#FFFFFF',
  };

  const titleStyles = {
    marginTop: '20px',
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
  };

  const cardStyles = {
    marginTop: '20px',
    marginBottom: '10px'
  };

  const cardWrapperStyles = {
    marginBottom: '10px', // Set the bottom margin for consistent spacing
  };

  const navBarStyles = {
    backgroundColor: 'maroon',
    width: '100%',
    padding: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  };

  const navLinkStyles = {
    color: 'white',
    margin: '0 80px',
    position: 'relative',
  };

  const roofStyles = {
    width: '100%',
    height: '20px',
    backgroundColor: 'maroon',
    position: 'relative',
    marginTop: '10px',
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
 
  const handleProfileClick = () => {
    // Add logic to handle profile click
    navigate('/user-profile'); // Navigate to the user profile page
  };

  const roofSvg = (
  <svg width="1161" height="122" viewBox="0 0 1161 122" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g filter="url(#filter0_d_1_2)">
      <path d="M580.5 0L1156.84 114H4.1601L580.5 0Z" fill="#800000" />
      <path d="M9.26467 113.5L580.5 0.509692L1151.74 113.5H9.26467Z" stroke="black" />
      <path d="M9.26467 113.5L580.5 0.509692L1151.74 113.5H9.26467Z" stroke="black" strokeOpacity="0.2" />
      <path d="M9.26467 113.5L580.5 0.509692L1151.74 113.5H9.26467Z" stroke="black" strokeOpacity="0.2" />
      <path d="M9.26467 113.5L580.5 0.509692L1151.74 113.5H9.26467Z" stroke="black" strokeOpacity="0.2" />
    </g>
    <defs>
      <filter
        id="filter0_d_1_2"
        x="0.160095"
        y="0"
        width="1160.68"
        height="122"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="4" />
        <feGaussianBlur stdDeviation="2" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_2" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_2" result="shape" />
      </filter>
    </defs>
  </svg>
);

  

  const roofTitleStyles = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: 'white',
    fontSize: '18px',
    fontWeight: 'bold',
  };

  const roofContainerStyles = {
    marginTop: '20px',
    position: 'relative',
    width: '100%',
    backgroundColor: 'white',
    textAlign: 'center', // Center the content
  };

  const navLinks = [
    { label: 'Home', href: '/menu', id: 'home' },
    { label: 'View Map', href: '/view-map', id: 'view-map' },
    { label: 'Building', href: '/building', id: 'building' },
    // Add more navigation links as needed
  ];

  return (
    <div style={pageStyles}>
      {/* Navigation Bar */}
      <div style={navBarStyles}>
        <div
          style={{
            color: 'white',
            marginLeft: '10px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
          }}
          onClick={() => {
            setActiveLink('view-map');
            navigate('/view-map');
          }}
        >
          {/* Your logo or icon */}
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 56 54" fill="none">
            <path
              d="M2.91855 24.6698L53.7146 2.74497L28.2999 51.8879L23.7747 30.6645L2.91855 24.6698Z"
              stroke="white"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span style={{ width: '1px', height: '35px', backgroundColor: 'white', margin: '0 5px' }}></span>
          <span>CIT NaviGO</span>
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
              {link.id === 'view-map' && (
                <div
                  style={{
                    content: '""',
                    height: '2px',
                    width: '100%',
                    backgroundColor: 'white',
                    position: 'absolute',
                    bottom: '-4px',
                    left: 0,
                    display: activeLink === link.id ? 'block' : 'none',
                    transition: '0.3s',
                  }}
                ></div>
              )}
            </Link>
          ))}
        </div>

        {/* Dropdown Button */}
        <Dropdown>
          <Dropdown.Toggle variant="link" id="dropdown-basic" style={{ color: 'white', marginLeft: '10px' }}>
            <img src="/images/Avatar.png" alt="Your Image" width="32" height="32" className="rounded-circle" />
          </Dropdown.Toggle>

          <Dropdown.Menu>
          <Dropdown.Item onClick={handleProfileClick}>Profile</Dropdown.Item>
          <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      {/* Roof Design with Title */}
      <div style={roofContainerStyles}>
        {roofSvg}
        <div style={roofTitleStyles}>RTL BUILDING ROOMS</div>
      </div>


      {/* Cards Section */}
      <div className="container">
        <div className="row">
          <div className="col-md-3" style={{ ...cardStyles, ...cardWrapperStyles }}>
            {/* Card 1 */}
            <div className="card text-black" style={{ backgroundColor: '#FFEBCD', ...cardStyles }}>
              <div className="card-header">Room Id</div>
              <div className="card-body">
                <h5 className="card-title">Primary card title</h5>
              </div>
            </div>
          </div>

          {/* Add more cards with the same structure */}
          {/* Card 2 */}
          <div className="col-md-3" style={{ ...cardStyles }}>
          <div className="card text-black" style={{ backgroundColor: '#FFEBCD', ...cardStyles }}>
              <div className="card-header">Room Id</div>
              <div className="card-body">
                <h5 className="card-title">Secondary card title</h5>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="col-md-3" style={{ ...cardStyles }}>
            <div className="card text-black" style={{ backgroundColor: '#FFEBCD', ...cardStyles }}>
              <div className="card-header">Room Id</div>
              <div className="card-body">
                <h5 className="card-title">Success card title</h5>
              </div>
            </div>
          </div>

          {/* Card 4 */}
          <div className="col-md-3" style={{ ...cardStyles }}>
            <div className="card text-black" style={{ backgroundColor: '#FFEBCD', ...cardStyles }}>
              <div className="card-header">Room Id</div>
              <div className="card-body">
                <h5 className="card-title">Danger card title</h5>
              </div>
            </div>
          </div>

          {/* Card 5 */}
          <div className="col-md-3" style={{ ...cardStyles }}>
            <div className="card text-black" style={{ backgroundColor: '#FFEBCD', ...cardStyles }}>
              <div className="card-header">Room Id</div>
              <div className="card-body">
                <h5 className="card-title">Warning card title</h5>
              </div>
            </div>
          </div>

          {/* Card 6 */}
          <div className="col-md-3" style={{ ...cardStyles }}>
            <div className="card text-black" style={{ backgroundColor: '#FFEBCD', ...cardStyles }}>
              <div className="card-header">Room Id</div>
              <div className="card-body">
                <h5 className="card-title">Info card title</h5>
              </div>
            </div>
          </div>

          {/* Card 7 */}
          <div className="col-md-3" style={{ ...cardStyles }}>
            <div className="card text-black" style={{ backgroundColor: '#FFEBCD', ...cardStyles }}>
              <div className="card-header">Room Id</div>
              <div className="card-body">
                <h5 className="card-title">Light card title</h5>
              </div>
            </div>
          </div>

          {/* Card 8 */}
          <div className="col-md-3" style={{ ...cardStyles }}>
            <div className="card text-black" style={{ backgroundColor: '#FFEBCD', ...cardStyles }}>
              <div className="card-header">Room Id</div>
              <div className="card-body">
                <h5 className="card-title">Dark card title</h5>
              </div>
            </div>
          </div>

          <div className="col-md-3" style={{ ...cardStyles }}>
            <div className="card text-black" style={{ backgroundColor: '#FFEBCD', ...cardStyles }}>
              <div className="card-header">Room Id</div>
              <div className="card-body">
                <h5 className="card-title">Dark card title</h5>
              </div>
            </div>
          </div>

          <div className="col-md-3" style={{ ...cardStyles }}>
            <div className="card text-black" style={{ backgroundColor: '#FFEBCD', ...cardStyles }}>
              <div className="card-header">Room Id</div>
              <div className="card-body">
                <h5 className="card-title">Dark card title</h5>
              </div>
            </div>
          </div>

          <div className="col-md-3" style={{ ...cardStyles }}>
            <div className="card text-black" style={{ backgroundColor: '#FFEBCD', ...cardStyles }}>
              <div className="card-header">Room Id</div>
              <div className="card-body">
                <h5 className="card-title">Dark card title</h5>
              </div>
            </div>
          </div>

          <div className="col-md-3" style={{ ...cardStyles }}>
            <div className="card text-black" style={{ backgroundColor: '#FFEBCD', ...cardStyles }}>
              <div className="card-header">Room Id</div>
              <div className="card-body">
                <h5 className="card-title">Dark card title</h5>
              </div>
            </div>
          </div>

          <div className="col-md-3" style={{ ...cardStyles }}>
            <div className="card text-black" style={{ backgroundColor: '#FFEBCD', ...cardStyles }}>
              <div className="card-header">Room Id</div>
              <div className="card-body">
                <h5 className="card-title">Dark card title</h5>
              </div>
            </div>
          </div>

          <div className="col-md-3" style={{ ...cardStyles }}>
            <div className="card text-black" style={{ backgroundColor: '#FFEBCD', ...cardStyles }}>
              <div className="card-header">Room Id</div>
              <div className="card-body">
                <h5 className="card-title">Dark card title</h5>
              </div>
            </div>
          </div>

          <div className="col-md-3" style={{ ...cardStyles }}>
            <div className="card text-black" style={{ backgroundColor: '#FFEBCD', ...cardStyles }}>
              <div className="card-header">Room Id</div>
              <div className="card-body">
                <h5 className="card-title">Dark card title</h5>
              </div>
            </div>
          </div>

          <div className="col-md-3" style={{ ...cardStyles }}>
            <div className="card text-black" style={{ backgroundColor: '#FFEBCD', ...cardStyles }}>
              <div className="card-header">Room Id</div>
              <div className="card-body">
                <h5 className="card-title">Dark card title</h5>
              </div>
            </div>
          </div>

          {/* Add more cards with the same structure */}
        </div>
      </div>

      {/* Your View Map content */}
      {/* ... */}
    </div>
  );
};

export default RTLBuilding;
