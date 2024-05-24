import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import Button from '@mui/material/Button'; // Import MUI Button
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

const HighSchoolCanteen = () => {
    const navigate = useNavigate();
  
    const handleGoBack = () => {
        navigate('/visitor-navigation'); // Navigate to the home page ("/")
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
                    <li className="nav-item"><Link to="/visitor-navigation" className="nav-link" style={{ color: 'white' }}>Home</Link></li>
                    <li className="nav-item"><Link to="/menu" className="nav-link active" style={{ color: 'maroon', backgroundColor: 'white' }}>Visitor Navigation</Link></li>
                        <li className="nav-item"><Link to="/about" className="nav-link" style={{ color: 'white' }}>About us</Link></li>
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

            <Container fluid style={{ backgroundColor: '#ebebeb', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
                <Row className="justify-content-center">
                    <Col sm={12} className="d-flex justify-content-center">
                        <img
                            src="/images/HighSchoolCanteenMap.png"
                            alt="Acad Map"
                            style={{
                                width: '60%',
                                height: 'auto',
                            }}
                        />
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default HighSchoolCanteen;
