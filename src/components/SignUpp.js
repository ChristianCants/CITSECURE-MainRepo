import React, { useState } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput
} from 'mdb-react-ui-kit';
import './SignUp.css';

const backgroundImageStyle = {
  backgroundImage: 'url("images/TIME IN.png")',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  height: '100vh', // Adjust the height as needed
  overflowY: 'auto',
  // Other background styles
};

function SignUpp() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [purpose, setPurpose] = useState('');
  const [cardNo, setCardNo] = useState('');
  const [timeIn, setTimeIn] = useState('');
  const [buildingToVisit, setBuildingToVisit] = useState('');

  return (
    <div className="background-wrapper" style={backgroundImageStyle}>
      <div className="signup-wrapper">
        <MDBContainer className="my-5 gradient-form">

          <MDBRow>

            <MDBCol col='6' className="mb-5">
              <div className="d-flex flex-column ms-5">

                <div className="text-center">
                  <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                    style={{width: '185px'}} alt="logo" />
                  <h4 className="mt-1 mb-5 pb-1">Visitor Form</h4>
                </div>

                <MDBInput wrapperClass='mb-4' label='First name' id='firstName' type='text' value={firstName} onChange={(e) => setFirstName(e.target.value)} required/>
                <MDBInput wrapperClass='mb-4' label='Last name' id='lastName' type='text' value={lastName} onChange={(e) => setLastName(e.target.value)} required/>
                <MDBInput wrapperClass='mb-4' label='Purpose' id='purpose' type='text' value={purpose} onChange={(e) => setPurpose(e.target.value)} required/>
                <MDBInput wrapperClass='mb-4' label='Card Number' id='cardNo' type='number' value={cardNo} onChange={(e) => setCardNo(e.target.value)} required/>
                <MDBInput wrapperClass='mb-4' label='Time In' id='timeIn' type='time' value={timeIn} onChange={(e) => setTimeIn(e.target.value)} required/>
                <MDBInput wrapperClass='mb-4' label='Building to Visit' id='buildingToVisit' type='text' value={buildingToVisit} onChange={(e) => setBuildingToVisit(e.target.value)} required/>

                <div className="text-center pt-1 mb-5 pb-1">
                  <MDBBtn className="mb-4 w-100 gradient-custom-2">Time in</MDBBtn>
                  <a className="text-muted" href="#!">Forgot password?</a>
                </div>

                <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
                  <p className="mb-0">Don't have an account?</p>
                  <MDBBtn outline className='mx-2' color='danger'>
                    UWU
                  </MDBBtn>
                </div>

              </div>

            </MDBCol>

            <MDBCol col='6' className="mb-5">
              <div className="d-flex flex-column  justify-content-center gradient-custom-2 h-100 mb-4">

                <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                  <h4 className="mb-4">We are more than just a company</h4>
                  <p className="small mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                    exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                </div>

              </div>

            </MDBCol>

          </MDBRow>

        </MDBContainer>
      </div>
    </div>
  );
}

export default SignUpp;
