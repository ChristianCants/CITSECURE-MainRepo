import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { SearchBar } from './SearchBar'; 
import Carousel from 'react-bootstrap/Carousel';
import Dropdown from 'react-bootstrap/Dropdown';

 
const ViewMap = () => {
  const [activeLink, setActiveLink] = useState('view-map');
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  const [showMapImage, setShowMapImage] = useState(false);
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0);

 
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
    height: '45px', // Adjust the height as needed
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

  const carouselCaptionStyle = {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    backgroundColor: 'white',
    padding: '20px',
    textAlign: 'left',
    border: '5px solid maroon', // Updated to maroon
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
 
  

  const handleGetDirections = (route, index) => {
    console.log(`Handling Get Directions for route: ${route}`);
    setCurrentCarouselIndex(index);
    setShowMapImage(true);
    navigate(`/view-map/${route}`);
  };
  
  
  
  
  
  
  
  const handleViewRooms = (buildingName, buildingRoute) => {
    // Implement logic to view building rooms
    console.log(`Viewing rooms for ${buildingName}...`);
    navigate(`/view-map/${buildingRoute}`); // Use the correct path
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
      
 
      {/* Carousel */}
      <Carousel
  data-bs-theme="dark"
  style={{ width: '80%', margin: '20px auto', marginTop: '60px' }}
  onSelect={(index) => setCurrentCarouselIndex(index)}
>
 
 
 {/* First Carousel Item */}
    <Carousel.Item>
      {/* Content for the first slide */}
      <img
        className="d-block w-100"
        src="https://scontent.xx.fbcdn.net/v/t1.15752-9/404848766_3530568167184243_5377353952213421616_n.jpg?stp=dst-jpg_p206x206&_nc_cat=110&ccb=1-7&_nc_sid=510075&_nc_eui2=AeEsEf4SouLMOpcw2UNHKPGD7LHQpONP9m7ssdCk40_2bmqnYYnajcuvmKtAWq-kB1dNVud4meC6DHuFM7w-o4Db&_nc_ohc=7tdhCeKFuRYAX86g6H6&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdTImPLuJMLx1nOjRJlxYx9x7NUJ0AiUwmpNOphR1G9P0Q&oe=6598921C"
        alt="ACAD Building"
        style={{ height: '600px', width: '100%', objectFit: 'cover' }}
      />
      <Carousel.Caption style={carouselCaptionStyle}>
        <div style={{ color: 'black', display: 'flex', flexDirection: 'column' }}>
          <h5>Academic Building</h5>
          <p>The Academic Building is a hub for various academic and administrative functions, including Architecture, Tourism, Industrial Engineering, Hospital Management, Alumni Office, Safety and Security, and Property Custodian Office. It offers design studios, specialized classrooms, labs, and a secure environment for students. The building serves as a hub for learning, innovation, and community building, fostering a dynamic learning environment.</p>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {/* Get Directions Button (switched to the left) */}
            <button
  style={{ ...directionButtonStyles, marginRight: '10px', color: 'white' }}
  onClick={() => handleGetDirections('academic-direction', 0)} // Pass the route and index
>
  Get Directions
</button>

            {/* View Building Rooms Button (switched to the right) */}
            <button
              variant="dark"
              onClick={() => handleViewRooms('Academic Building', 'academic-building')}  // Update the route and building name as needed
              style={{ ...directionButtonStyles, marginLeft: 'auto' }}
            >
              View Building Rooms
            </button>
          </div>
        </div>
      </Carousel.Caption>
    </Carousel.Item>
 
    {/* Second Carousel Item */}
    {/* Content for the second slide */}
    <Carousel.Item>
      <img
        className="d-block w-100"
        src="https://cit.edu/wp-content/uploads/2023/07/SAL-Building.jpg"
        alt="Second slide"
        style={{ height: '600px', width: '100%', objectFit: 'cover' }}
      />
      <Carousel.Caption style={carouselCaptionStyle}>
        <div style={{ color: 'black', display: 'flex', flexDirection: 'column' }}>
          <h5>High School Building</h5>
          <p>Explore the hallways of our high school, a dynamic environment geared for academic advancement and exciting student life. The high school facility creates a suitable atmosphere for study and personal growth by providing well-equipped classrooms, contemporary amenities, and collaboration spaces.</p>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {/* Get Directions Button (switched to the left) */}
            <button
              style={{ ...directionButtonStyles, marginRight: '10px', color: 'white' }}
             onClick={() => handleGetDirections('hs-direction', 0)}
              >
            Get Directions
              </button>

            {/* View Building Rooms Button (switched to the right) */}
            <button
              variant="dark"
              onClick={() => handleViewRooms('High School Building', 'high-school-building')}  // Update the route and building name as needed
              style={{ ...directionButtonStyles, marginLeft: 'auto' }}
            >
              View Building Rooms
            </button>
          </div>
        </div>
      </Carousel.Caption>
    </Carousel.Item>
 
    {/* Third Carousel Item */}
    {/* Content for the third slide */}
    <Carousel.Item>
      <img
        className="d-block w-100"
        src="https://cit.edu/wp-content/uploads/2023/07/Elementary-Building.jpg"
        alt="Third slide"
        style={{ height: '600px', width: '100%', objectFit: 'cover' }}
      />
      <Carousel.Caption style={carouselCaptionStyle}>
        <div style={{ color: 'black', display: 'flex', flexDirection: 'column' }}>
          <h5>Elementary Building</h5>
          <p>Step inside the heart of our elementary building, a dynamic and loving environment designed for early childhood education.</p>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {/* Get Directions Button (switched to the left) */}
            <button
              style={{ ...directionButtonStyles, marginRight: '10px', color: 'white' }}
       onClick={() => handleGetDirections('elementary-direction', 0)}
          >
          Get Directions
          </button>

            {/* View Building Rooms Button (switched to the right) */}
            <button
              variant="dark"
              onClick={() => handleViewRooms('Elementary Building', 'elementary-building')}  // Update the route and building name as needed
              style={{ ...directionButtonStyles, marginLeft: 'auto' }}
            >
              View Building Rooms
            </button>
          </div>
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
      <Carousel.Caption style={carouselCaptionStyle}>
        <div style={{ color: 'black', display: 'flex', flexDirection: 'column' }}>
          <h5>GLE Building</h5>
          <p>The educational complex is a hub for academic and administrative functions, encompassing the Human Resources office, Computer Engineering department, diverse classrooms, and a VPAA office. It promotes interdisciplinary collaboration and serves as a hub for administrative functions, technological education, and diverse academic disciplines.</p>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {/* Get Directions Button (switched to the left) */}
            <button
            style={{ ...directionButtonStyles, marginRight: '10px', color: 'white' }}
          onClick={() => handleGetDirections('gle-direction', 0)}
            >
           Get Directions
         </button>

            {/* View Building Rooms Button (switched to the right) */}
            <button
              variant="dark"
              onClick={() => handleViewRooms('GLE Building', 'gle-building')}  // Update the route and building name as needed
              style={{ ...directionButtonStyles, marginLeft: 'auto' }}
            >
              View Building Rooms
            </button>
          </div>
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
  <Carousel.Caption style={{ ...carouselCaptionStyle, justifyContent: 'center' }}>
    <div style={{ color: 'black', display: 'flex', flexDirection: 'column' }}>
      <h5>Main Canteen</h5>
      <p>Immerse yourself in a culinary journey at the Main Canteen, where an assortment of delightful aromas and diverse flavors unite.</p>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {/* Get Directions Button (centered) */}
        <button
          style={{ ...directionButtonStyles, color: 'white' }}
          onClick={() => handleGetDirections('main-canteen-direction', 0)}
        >
          Get Directions
        </button>
      </div>
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
          <Carousel.Caption style={carouselCaptionStyle}>
            <div style={{ color: 'black', display: 'flex', flexDirection: 'column' }}>
              <h5>RTL BUILDING</h5>
              <p>The administrative center is a multifunctional building that houses various functions such as Accounting, Finance, Enrollment, Technical, and Executive. It ensures financial accuracy, compliance, and streamlines operations across various departments, ensuring smooth functioning and efficient operations across the institution.</p>
              <div style={{ display: 'flex', alignItems: 'center' }}>
              <button
              style={{ ...directionButtonStyles, marginRight: '10px', color: 'white' }}
             onClick={() => handleGetDirections('rtl-direction', 0)}
                >
                Get Directions
                </button>

                <button
                  variant="dark"
                  onClick={() => handleViewRooms('RTL Building', 'rtl-building')}
                  style={{ ...directionButtonStyles, marginLeft: 'auto' }}
                >
                  View Building Rooms
                </button>
              </div>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
 
        {/* NGE Building Carousel Item */}
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://scontent.fceb3-1.fna.fbcdn.net/v/t1.15752-9/405163005_300960122904581_3254547494294859463_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=8cd0a2&_nc_eui2=AeFzls6QtGSf_l8ho_sNkXCTn62iURtPKh2fraJRG08qHbHsXRwSI_J3Ld7ec9N9vLcES11xWAeJSnwrbhLab4GQ&_nc_ohc=AySrOyNGWRoAX-_H6Fu&_nc_ht=scontent.fceb3-1.fna&oh=03_AdRqiXulrYtdoN9bynJv3-FHDnKpbt9Wp5fTGnoW6PQehg&oe=659227D9"
            alt="NGE"
            style={{ height: '600px', width: '100%', objectFit: 'cover' }}
          />
          <Carousel.Caption style={carouselCaptionStyle}>
            <div style={{ color: 'black', display: 'flex', flexDirection: 'column' }}>
              <h5>NGE BUILDING</h5>
              <p>Enter our specialized building, a fusion of innovation and care, where the realms of Computer Studies and Nursing seamlessly coexist.</p>
              <div style={{ display: 'flex', alignItems: 'center' }}>
              <button
                  style={{ ...directionButtonStyles, marginRight: '10px', color: 'white' }}
                  onClick={() => handleGetDirections('nge-direction', 0)}
                  >
               Get Directions
                  </button>

                <button
                  variant="dark"
                  onClick={() => handleViewRooms('NGE Building', 'nge-building')}
                  style={{ ...directionButtonStyles, marginLeft: 'auto' }}
                >
                  View Building Rooms
                </button>
              </div>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
 
       {/* LIB Building Carousel Item */}
<Carousel.Item>
  <img
    className="d-block w-100"
    src="https://scontent.fceb3-1.fna.fbcdn.net/v/t1.15752-9/370076161_1262911477846419_8408329714752699598_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=8cd0a2&_nc_eui2=AeE_a4klRbr01RTpQOIJ60rX0NWEt2-8TAjQ1YS3b7xMCIr61s85JZzjiW068dRO9993k_p8fplehB-YNDcACZd5&_nc_ohc=8_6167HbqaEAX-s3X7D&_nc_ht=scontent.fceb3-1.fna&oh=03_AdRkZK5EIglh8-ISdJQiWg1jv2qbmwjn2fWmNEczLOhlXA&oe=65922C0C"
    alt="LIB"
    style={{ height: '600px', width: '100%', objectFit: 'cover' }}
  />
  <Carousel.Caption style={{ ...carouselCaptionStyle, justifyContent: 'center' }}>
    <div style={{ color: 'black', display: 'flex', flexDirection: 'column' }}>
      <h5>LIBRARY BUILDING</h5>
      <p>Begin a literary adventure within the walls of our library, a haven for knowledge and discovery.</p>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {/* Get Directions Button (centered) */}
        <button
          style={{ ...directionButtonStyles, color: 'white' }}
          onClick={() => handleGetDirections('library-direction', 0)}
        >
          Get Directions
        </button>
      </div>
    </div>
  </Carousel.Caption>
</Carousel.Item>

 
        {/* ALLIED Building Carousel Item */}
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://scontent.fceb3-1.fna.fbcdn.net/v/t1.15752-9/370207209_1952851695116256_2470887601798806799_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=8cd0a2&_nc_eui2=AeHO0bK3W6cMlKeMIH6nEuKR-5DPL2NLp_L7kM8vY0un8mJHnSwDQlmOi4kCnMt9HKiW-HcOk6pvEov7mcAv2EOz&_nc_ohc=IagXPZPdGDkAX8eQCkF&_nc_ht=scontent.fceb3-1.fna&oh=03_AdReZ2oRJh1fvcPgXZ1tqtE3oiNN__R7t91DxkxMjRD2xg&oe=65922AB3"
            alt="ALLIED"
            style={{ height: '600px', width: '100%', objectFit: 'cover' }}
          />
          <Carousel.Caption style={carouselCaptionStyle}>
            <div style={{ color: 'black', display: 'flex', flexDirection: 'column' }}>
              <h5>ALLIED BUILDING </h5>
              <p>Our engineering hub is a comprehensive facility for students specializing in electrical, chemical, mining, civil, and mechanical engineering. It features specialized laboratories, classrooms, and collaborative spaces, fostering hands-on learning and innovation to shape the future.</p>
              <div style={{ display: 'flex', alignItems: 'center' }}>
              <button
                 style={{ ...directionButtonStyles, marginRight: '10px', color: 'white' }}
            onClick={() => handleGetDirections('allied-direction', 0)}
                >
             Get Directions
              </button>

                <button
                  variant="dark"
                  onClick={() => handleViewRooms('Allied Building', 'allied-building')}
                  style={{ ...directionButtonStyles, marginLeft: 'auto' }}
                >
                  View Building Rooms
                </button>
              </div>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
 
        {/* HS CANTEEN Building Carousel Item */}
<Carousel.Item>
  <img
    className="d-block w-100"
    src="https://scontent.fceb3-1.fna.fbcdn.net/v/t1.15752-9/385551399_732608838901279_8380616811116167146_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=8cd0a2&_nc_eui2=AeGnJhpB6GIg43ZNxjgWML3iiy-5E4NY4PiLL7kTg1jg-MQEDaNbSCQBHQ7eViwHFLMOleknwlF0VyFHgLY2kjmj&_nc_ohc=xpjfaiUL3JgAX8U0O6c&_nc_ht=scontent.fceb3-1.fna&oh=03_AdQRKdSL5ZUus5SiBaD4-uTEW_12o5Wo94T-K6r6F7SVzQ&oe=6592551C"
    alt="HS CANTEEN"
    style={{ height: '600px', width: '100%', objectFit: 'cover' }}
  />
  <Carousel.Caption style={{ ...carouselCaptionStyle, justifyContent: 'center' }}>
    <div style={{ color: 'black', display: 'flex', flexDirection: 'column' }}>
      <h5>HIGH-SCHOOL CANTEEN</h5>
      <p>Discover a vibrant dining experience at the high school canteen, where a lively atmosphere meets diverse culinary offerings.</p>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {/* Get Directions Button (centered) */}
        <button
          style={{ ...directionButtonStyles, color: 'white' }}
          onClick={() => handleGetDirections('hs-canteen-direction', 0)}
        >
          Get Directions
        </button>
      </div>
    </div>
  </Carousel.Caption>
</Carousel.Item>

 
      </Carousel>

      {showMapImage && (
  <img
    src="images/GLE.png"  // Replace with your map image URL
    alt="Map"
    style={{ width: '100%', maxHeight: '600px', objectFit: 'contain' }}
  />
)}

   {/* Display search results */}
   <div>
        {searchResults.map((result) => (
          <div key={result.id}>{result.name}</div>
        ))}
      </div>

      

      {/* Line at the bottom of the page */}
      <div style={{ borderTop: '2px solid maroon', margin: '20px auto', width: '90%' }}></div>

      {/* Copyright Information */}
  {/* Copyright Information */}
<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'maroon', marginBottom: '20px', padding: '0 30px' }}>
  <p style={{ marginRight: '100px' }}>&copy; 2023 CIT NaviGo. All rights reserved</p>
  <p style={{ marginLeft: '400px' }}>Discover Your Campus Pathways with CIT-NaviGo.</p>
</div>


    </div>
  );
};

export default ViewMap;