import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Button from '@mui/material/Button';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

class BackgateAlliedBuilding extends Component {
    handleGoBack = () => {
        window.location.href = '/visitor-navigation';
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
                        <img src="/images/CIT LOGO.png" alt="CITSecure Logo" width="67" height="60" />
                        <span style={{ width: '2.5px', height: '40px', backgroundColor: 'white', margin: '0 5px' }}></span>
                        <span>CITSecure</span>
                    </div>
                    <ul className="nav nav-pills d-flex justify-content-center" style={{ margin: 0, padding: 0, flexGrow: 1 }}>
                        <li className="nav-item">
                            <span className="nav-link active" style={{ color: 'maroon', backgroundColor: 'white', cursor: 'pointer', marginLeft: '-150px' }}>
                                Allied Building
                            </span>
                        </li>
                    </ul>
                    <Button
                        variant="contained"
                        startIcon={<ChevronLeftIcon />}
                        onClick={this.handleGoBack}
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

                <Container fluid style={{ backgroundColor: '#ebebeb', display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh' }}>
                    <h3 style={{ color: 'black', margin: '20px 0', fontFamily: 'Arial, sans-serif', fontWeight: 'bold' }}>
                        BACK GATE DIRECTION
                    </h3>
                    <Row className="justify-content-center">
                        <Col sm={12} className="d-flex justify-content-center">
                            <img
                                src="/images/AlliedMap (Back).png"
                                alt="Backgate Allied Map"
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

export default BackgateAlliedBuilding;
