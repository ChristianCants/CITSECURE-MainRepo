import React, { useState, useEffect } from "react";
import axios from "axios";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Container, Card, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function UserProfile() {
  const navigate = useNavigate();
  const [isEditing, setEditing] = useState(false);
  const [userData, setUserData] = useState({
    id: '',
    firstName: '',
    lastName: '',
    gender: '',
    email: '',
    password: '',
  });

  const handleEditProfileClick = () => {
    console.log('Edit Profile button clicked');
    setEditing(true);
  };

  const [isLoading, setLoading] = useState(false);

  const handleSaveChanges = async () => {
    try {
      console.log('Updating user data:', userData);

      // Create an object with fields to update
      const updatedFields = {
        firstName: userData.firstName,
        lastName: userData.lastName,
      };

      // Include password in the update only if it is being edited
      if (isEditing) {
        updatedFields.password = userData.password;
      }

      console.log('Updated fields:', updatedFields);

      setLoading(true);

      const response = await fetch(`http://localhost:8080/User/updateUser/${userData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedFields),
      });

      console.log('Response:', response);

      if (!response.ok) {
        throw new Error(`Failed to update user data. Status: ${response.status}`);
      }

      const updatedUserData = await response.json();

      console.log('Changes saved successfully');
      console.log('Updated user data:', updatedUserData);

      setUserData(updatedUserData);
      setEditing(false);

      alert('Changes saved successfully!');
    } catch (error) {
      console.error('Error saving changes:', error.message);

      alert('Failed to save changes. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete your account?');
    if (confirmDelete) {
      try {
        setLoading(true);

        const userId = userData.id;

        const response = await fetch(`http://localhost:8080/User/deleteUser/${userId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to delete user account. Status: ${response.status}`);
        }

        console.log('Account deleted successfully');

        navigate('/signup');
      } catch (error) {
        console.error('Error deleting account:', error.message);

        if (error.message.includes('404')) {
          alert('Account not found. It may have already been deleted.');
          navigate('/signup');
        } else {
          alert('Failed to delete account. Please try again.');
        }
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:8080/User/getAllUsers');
 
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
 
        const data = await response.json();
 
        if (data.length > 0) {
          setUserData(data[0]);
        } else {
          console.warn('No user data found');
        }
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    };
 
    fetchUserData();
  }, []);



  return (
    <section style={{ backgroundcolor: ``,  height: '800px', width: '100%', backgroundSize: 'cover', backgroundPosition: 'center'}}>
      <Container fluid className="py-5">
      <Row>
        <Col>
          {/* Breadcrumb navigation */}
          <nav aria-label="breadcrumb" className="rounded-3 p-3 mb-4" style={{ backgroundColor: 'rgb(164, 63, 63)' }}>
            <ol className="breadcrumb mb-0" style={{  backgroundColor: 'rgb(164, 63, 63)' }}>
              <li className="breadcrumb-item" onClick={() => navigate('/menu')}>
                <a href="#">Home</a>
              </li>
              <li className="breadcrumb-item">
                <a href="#">User</a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                User Profile
              </li>
            </ol>
          </nav>
        </Col>
      </Row>

        

        <Row>
        <Col lg={3}>
            {/* User profile card */}
            {/* <Card className="mb-4">
              <Card.Body className="text-center">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                  alt="avatar"
                  className="rounded-circle img-fluid"
                  style={{ width: '150px' }}
                />
                <h5 className="my-3">John</h5>
                <p className="text-muted mb-1">Student</p>
                <p className="text-muted mb-4">BSIT</p>
                <div className="d-flex justify-content-center mb-2"></div>
              </Card.Body>
            </Card> */}
            {/* Additional card (if needed) */}
          </Col>
          <Col lg={6}>
            <Card className="Card">
              <Card.Body>
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">First Name</p>
                  </div>
                  <div className="Fname">
                    {isEditing ? (
                      <input
                        type="text"
                        value={userData.firstName}
                        onChange={(e) => setUserData({ ...userData, firstName: e.target.value })}
                      />
                    ) : (
                      <p className="text-muted mb-0">{userData.firstName}</p>
                    )}
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Last Name</p>
                  </div>
                  <div className="col-sm-9">
                    {isEditing ? (
                      <input
                        type="text"
                        value={userData.lastName}
                        onChange={(e) => setUserData({ ...userData, lastName: e.target.value })}
                      />
                    ) : (
                      <p className="text-muted mb-0">{userData.lastName}</p>
                    )}
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Gender</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{userData.gender}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Email</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{userData.email}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Password</p>
                  </div>
                  <div className="col-sm-9">
                    {isEditing ? (
                      <input
                        type="password"
                        value={userData.password}
                        onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                      />
                    ) : (
                      <p className="text-muted mb-0">{userData.password}</p>
                    )}
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="edit">
                    {isEditing ? (
                      <Button onClick={handleSaveChanges} disabled={isLoading}>
                        {isLoading ? 'Saving...' : 'Save Changes'}
                      </Button>
                    ) : (
                      <Button style={{ backgroundColor: '#E7E7E7',  color: 'black', border: '#FFF9EB', marginLeft:'5px' }} onClick={handleEditProfileClick}>
                        Edit Profile
                      </Button>
                    )}
                  </div>
                  <div className="col-sm-3 d-flex justify-content-end">
                    {isEditing ? null : (
                      <Button style={{ backgroundColor: '#A43F3F', color: 'white', border: '#A43F3F', marginLeft:'5px' }} onClick={handleDeleteAccount}>
                        Delete Account
                      </Button>
                    )}
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default UserProfile;
