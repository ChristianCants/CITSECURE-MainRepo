import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from '@mui/material/Button';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

class NGEBuildingOffices extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentCarouselIndex: 0,
        };
    }

    handleGoBack = () => {
        window.location.href = '/visitor-navigation';
    };

    render() {
        const carouselCaptionStyle = {
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            backgroundColor: 'white',
            padding: '20px',
            textAlign: 'left',
            border: '5px solid maroon',
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
                        <img src="/images/CIT LOGO.png" alt="CITSecure Logo" width="67" height="60" />
                        <span style={{ width: '2.5px', height: '40px', backgroundColor: 'white', margin: '0 5px' }}></span>
                        <span>CITSecure</span>
                    </div>

                    {/* Add Academic Building label */}
                    <ul className="nav nav-pills d-flex justify-content-center" style={{ margin: 0, padding: 0, flexGrow: 1 }}>
                        <li className="nav-item">
                            <span className="nav-link active" style={{ color: 'maroon', backgroundColor: 'white', cursor: 'pointer', marginLeft: '-150px', fontWeight: 'bold', }}>
                                NGE BUILDING MAIN OFFICES
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

                <div>
                    {/* Carousel */}
                    <Carousel
                        data-bs-theme="dark"
                        style={{ width: '80%', margin: '20px auto', marginTop: '60px' }}
                        onSelect={(index) => this.setState({ currentCarouselIndex: index })}
                    >
                        {/* First Carousel Item */}
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="images/NGE InnovationLab.jpg"
                                alt="Innovation Lab"
                                style={{ height: '800px', width: '100%', objectFit: 'cover' }}
                            />
                            <Carousel.Caption style={carouselCaptionStyle}>
                                <div style={{ color: 'black', display: 'flex', flexDirection: 'column' }}>
                                    <h5>Wildcats Innovation Lab</h5>
                                    <p> Need Details </p>
                                </div>
                            </Carousel.Caption>
                        </Carousel.Item>

                        {/* Second Carousel Item */}
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="images/NGE CCS Faculty Office.jpg"
                                alt="CCS Faculty Office"
                                style={{ height: '800px', width: '100%', objectFit: 'cover' }}
                            />
                            <Carousel.Caption style={carouselCaptionStyle}>
                                <div style={{ color: 'black', display: 'flex', flexDirection: 'column' }}>
                                    <h5>Computer Studies Faculty Office Consultation Room</h5>
                                    <p>Need Details</p>
                                </div>
                            </Carousel.Caption>
                        </Carousel.Item>

                        {/* Third Carousel Item */}
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="images/NGE CNAHS.jpg"
                                alt="CNAHS Office"
                                style={{ height: '800px', width: '100%', objectFit: 'cover' }}
                            />
                            <Carousel.Caption style={carouselCaptionStyle}>
                                <div style={{ color: 'black', display: 'flex', flexDirection: 'column' }}>
                                    <h5>College of Nursing and Allied Health Sciences</h5>
                                    <p>Need Details</p>
                                </div>
                            </Carousel.Caption>
                        </Carousel.Item>

                        {/* Fourth Carousel Item */}
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="images/NGE Create.jpg"
                                alt="Create Office"
                                style={{ height: '800px', width: '100%', objectFit: 'cover' }}
                            />
                            <Carousel.Caption style={carouselCaptionStyle}>
                                <div style={{ color: 'black', display: 'flex', flexDirection: 'column' }}>
                                    <h5>Center for E-Learning and Technology Education / Office of the M.I.S Director / Makerspace Office</h5>
                                    <p>Need Details</p>
                                </div>
                            </Carousel.Caption>
                        </Carousel.Item>

                        {/* Fifth Carousel Item */}
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="images/NGE CCS Office.jpg"
                                alt="CCS Office"
                                style={{ height: '800px', width: '100%', objectFit: 'cover' }}
                            />
                            <Carousel.Caption style={carouselCaptionStyle}>
                                <div style={{ color: 'black', display: 'flex', flexDirection: 'column' }}>
                                    <h5>College of Computer Studies</h5>
                                    <p>Need Details</p>
                                </div>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>

                    {/* Line at the bottom of the page */}
                    <div style={{ borderTop: '2px solid maroon', margin: '10px auto', width: '95%' }}></div>

                    {/* Copyright Information */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'maroon', marginBottom: '20px', padding: '0 30px' }}>
                        <p>&copy; 2024 CIT-Secure. All rights reserved</p>
                        <p>Discover Your Campus Pathways with CIT-SECURE.</p>
                    </div>
                </div>
            </>
        );
    }
}

export default NGEBuildingOffices;
