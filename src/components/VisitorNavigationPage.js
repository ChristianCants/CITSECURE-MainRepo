import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import './VisitorNavigationPage.css';
import Button from '@mui/material/Button'; // Import MUI Button
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';



const VisitorNavigationPage = () => {
    const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0);
    const [showMapImage, setShowMapImage] = useState(false);
    const navigate = useNavigate();

    const handleGetDirections = (direction, index) => {
        console.log('Get directions clicked:', direction, index);
        // Implement the logic to navigate or display directions
    };
    const handleGoBack = () => {
      navigate('/'); // Navigate to the home page ("/")
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
                    <li className="nav-item"><NavLink to="/menu" className="nav-link" style={{ color: 'white', marginRight: '10px' }}>Home</NavLink></li>
                    <li className="nav-item"><NavLink to="/visitor-navigation" className="nav-link" activeClassName="active" style={{ color: 'maroon', backgroundColor: 'white', marginRight: '10px' }}>Visitor Navigation</NavLink></li>
                    <li className="nav-item"><NavLink to="/about" className="nav-link" style={{ color: 'white', marginRight: '10px' }}>About us</NavLink></li>
                </ul>

                <Button
                    variant="contained"
                    startIcon={<ChevronLeftIcon />}
                    onClick={handleGoBack} // Call the handleGoBack function
                    style={{
                        position: 'absolute',
                        top: '30px',
                        right: '30px',
                        backgroundColor: 'white', // Maroon
                        color: 'maroon', // White text for better contrast
                    }}
                >
                    Return
                </Button>

                
            </header>
      <div>
        
        {/* Add navigation information and links here */}

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
        src="https://scontent.fdvo1-1.fna.fbcdn.net/v/t1.15752-9/385551382_1325420938165319_6667272040145660917_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=5f2048&_nc_ohc=8OHgZ66EbggAb4abnJT&_nc_ht=scontent.fdvo1-1.fna&oh=03_Q7cD1QG0ZUJ1lFN0Vdnf_oyqu9-J4IeRgFDRWuiIetXYFlbALA&oe=664892D4"
        alt="ACAD Building"
        style={{ height: '600px', width: '100%', objectFit: 'cover' }}
      />
      <Carousel.Caption style={carouselCaptionStyle}>
        <div style={{ color: 'black', display: 'flex', flexDirection: 'column' }}>
          <h5>Academic Building</h5>
          <p>The Academic Building is a hub for various academic and administrative functions, including Architecture, Tourism, Industrial Engineering, Hospital Management, Alumni Office, Safety and Security, and Property Custodian Office. It offers design studios, specialized classrooms, labs, and a secure environment for students. The building serves as a hub for learning, innovation, and community building, fostering a dynamic learning environment.</p>
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
 
    {/* GLE Building Carousel Item */}
    <Carousel.Item>
      <img
        className="d-block w-100"
        src="https://scontent.fdvo1-2.fna.fbcdn.net/v/t1.15752-9/384549675_1028090461807314_3470518651785484799_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_ohc=UG28_pPHEHoAb4pPdkK&_nc_ht=scontent.fdvo1-2.fna&oh=03_Q7cD1QGTcdRiWEyUVPgOhvIyY5NfpqDz45cMusK_IGQV6FabjQ&oe=664875FF"
        alt="GLE Building"
        style={{ height: '600px', width: '100%', objectFit: 'cover' }}
      />
      <Carousel.Caption style={carouselCaptionStyle}>
        <div style={{ color: 'black', display: 'flex', flexDirection: 'column' }}>
          <h5>GLE Building</h5>
          <p>The educational complex is a hub for academic and administrative functions, encompassing the Human Resources office, Computer Engineering department, diverse classrooms, and a VPAA office. It promotes interdisciplinary collaboration and serves as a hub for administrative functions, technological education, and diverse academic disciplines.</p>
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
 
    {/* Main Canteen Carousel Item */}
    
<Carousel.Item>
  <img
    className="d-block w-100"
    src="https://scontent.fdvo1-1.fna.fbcdn.net/v/t1.15752-9/404324525_1484226729085275_1644542747142881475_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=5f2048&_nc_ohc=7jEXOQk76IcAb72RgTf&_nc_ht=scontent.fdvo1-1.fna&oh=03_Q7cD1QF3b4b0BXkCUcVyayuYGaLlG034vB6gtZeeQMmTnfyB2g&oe=664873F3"
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
            src="https://scontent.fdvo1-1.fna.fbcdn.net/v/t1.15752-9/405387925_366884246001992_5093631182942274981_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_ohc=uT_Og12BfXEAb5EsMdi&_nc_ht=scontent.fdvo1-1.fna&oh=03_Q7cD1QHnBmkJwvjPG9k4mnizEugYCA3er3yN_q47PaJfKCoF4w&oe=6648871B"
            alt="RTL"
            style={{ height: '600px', width: '100%', objectFit: 'cover' }}
          />
          <Carousel.Caption style={carouselCaptionStyle}>
            <div style={{ color: 'black', display: 'flex', flexDirection: 'column' }}>
              <h5>RTL BUILDING</h5>
              <p>The administrative center is a multifunctional building that houses various functions such as Accounting, Finance, Enrollment, Technical, and Executive. It ensures financial accuracy, compliance, and streamlines operations across various departments, ensuring smooth functioning and efficient operations across the institution.</p>
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
 
        {/* NGE Building Carousel Item */}
        <Carousel.Item>
          <img
            className="d-block w-100"
            
            src="https://scontent.fdvo1-2.fna.fbcdn.net/v/t1.15752-9/405163005_300960122904581_3254547494294859463_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=5f2048&_nc_ohc=iHLpvncIWCEAb4iFxxO&_nc_ht=scontent.fdvo1-2.fna&oh=03_Q7cD1QHg0kpBAawIE6DlqKhIXDt9t6ZcDEd7PJthHMGsQCxg-Q&oe=66488759"
            alt="NGE"
            style={{ height: '600px', width: '100%', objectFit: 'cover' }}
          />
          <Carousel.Caption style={carouselCaptionStyle}>
            <div style={{ color: 'black', display: 'flex', flexDirection: 'column' }}>
              <h5>NGE BUILDING</h5>
              <p>Enter our specialized building, a fusion of innovation and care, where the realms of Computer Studies and Nursing seamlessly coexist.</p>
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
 
       {/* LIB Building Carousel Item */}
<Carousel.Item>
  <img
    className="d-block w-100"
    src="https://scontent.fdvo1-2.fna.fbcdn.net/v/t1.15752-9/370076161_1262911477846419_8408329714752699598_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=5f2048&_nc_ohc=M4twlOvOM0YAb52AUOx&_nc_ht=scontent.fdvo1-2.fna&oh=03_Q7cD1QH7-pwxVKBqFlyNbzKsmvaK1HsZI7WtP44xypwdaPD9gQ&oe=66488B8C"
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
          onClick={() => handleGetDirections('main-canteen-direction', 0)}
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
            src="https://scontent.fdvo1-1.fna.fbcdn.net/v/t1.15752-9/370207209_1952851695116256_2470887601798806799_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_ohc=hMs94LPtQ1cAb6zl3bb&_nc_ht=scontent.fdvo1-1.fna&oh=03_Q7cD1QG2cdQg9u0usZxDcdayDRHLTzx6XPNNqTgzUluyrAQFzg&oe=66488A33"
            alt="ALLIED"
            style={{ height: '600px', width: '100%', objectFit: 'cover' }}
          />
          <Carousel.Caption style={carouselCaptionStyle}>
            <div style={{ color: 'black', display: 'flex', flexDirection: 'column' }}>
              <h5>ALLIED BUILDING </h5>
              <p>Our engineering hub is a comprehensive facility for students specializing in electrical, chemical, mining, civil, and mechanical engineering. It features specialized laboratories, classrooms, and collaborative spaces, fostering hands-on learning and innovation to shape the future.</p>
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
 
        {/* HS CANTEEN Building Carousel Item */}
<Carousel.Item>
  <img
    className="d-block w-100"
    src="https://scontent.fdvo1-1.fna.fbcdn.net/v/t1.15752-9/385551399_732608838901279_8380616811116167146_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=5f2048&_nc_ohc=3L9gxlzQ8rcAb6R1poB&_nc_ht=scontent.fdvo1-1.fna&oh=03_Q7cD1QEytycguDGr_ExOIPiTv0oFO9B-rBBLIiDa_sN2Eqrq6A&oe=66487C5C"
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
          onClick={() => handleGetDirections('main-canteen-direction', 0)}
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

   

      

      {/* Line at the bottom of the page */}
      <div style={{ borderTop: '2px solid maroon', margin: '20px auto', width: '90%' }}></div>

      {/* Copyright Information */}
  {/* Copyright Information */}
<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'maroon', marginBottom: '20px', padding: '0 30px' }}>
  <p style={{ marginRight: '100px' }}>&copy; 2024 CIT-Secure. All rights reserved</p>
  <p style={{ marginLeft: '400px' }}>Discover Your Campus Pathways with CIT-SECURE.</p>
  </div>
      </div>
    </>
  );
};

export default VisitorNavigationPage;