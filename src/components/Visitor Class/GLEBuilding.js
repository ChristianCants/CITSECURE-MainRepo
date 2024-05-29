import React, { Component } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import Button from '@mui/material/Button'; // Import MUI Button
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

class GLEBuilding extends Component {
    handleGoBack = () => {
        const navigate = useNavigate();
        navigate('/visitor-navigation');
      };

    render() {
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
                        onClick={() => window.location.href = 'visitor-navigation'} 
                        style={{
                            position: 'absolute',
                            top: '30px',
                            right: '30px',
                            backgroundColor: 'white', 
                            color: 'maroon', 
                        }}
                    >
                        Return
                    </Button>
                </header>

                <Container fluid style={{ backgroundColor: '#ebebeb', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
                    <Row className="justify-content-center">
                        <Col sm={12} className="d-flex justify-content-center">
                            <img
                                src="/images/GLEMap.png"
                                alt="GLE Map"
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
    }
}

export default GLEBuilding;
