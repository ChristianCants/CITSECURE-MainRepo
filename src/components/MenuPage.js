import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { Card, Row, Col } from 'react-bootstrap';
import './MenuPage.css';

const MenuPage = () => {

  // const navLinks = [
  //   { label: 'View Map', href: '/view-map', id: 'view-map' },
  //   { label: 'Exit', href: '/', id: '' },
  // ];

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
                <li className="nav-item"><Link to="/menu" className="nav-link active" style={{ color: 'maroon', backgroundColor: 'white' }}>Home</Link></li>
                <li className="nav-item"><Link to="/visitor-navigation" className="nav-link" style={{ color: 'white' }}>Visitor Navigation</Link></li>
                 <li className="nav-item"><Link to="/about" className="nav-link" style={{ color: 'white' }}>About us</Link></li>
        </ul>
        
      </header>


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
