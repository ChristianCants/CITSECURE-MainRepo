import React, { useState } from 'react';
import { Container, Card, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const navigate = useNavigate();
  const [isEditing, setEditing] = useState(false);

  const handleHomeClick = () => {
    console.log('Home link clicked');
    navigate('/menu');
  };

  const handleEditProfileClick = () => {
    console.log('Edit Profile button clicked');
    setEditing(true);
  };

  const handleSaveChanges = () => {
    console.log('Changes saved');
    // Add logic to save the changes (e.g., make an API request)
    setEditing(false);
  };

  const handleDeleteAccount = () => {
    const confirmDelete = window.confirm('Are you sure you want to delete your account?');
    if (confirmDelete) {
      console.log('Account deleted');
      // Add logic to delete the account (e.g., make an API request)
      // After successful deletion, you may want to navigate the user to a different page or log them out.
    }
  };

  return (
    <section style={{ backgroundColor: '#eee' }}>
      <Container fluid className="py-5">
        <Row>
          <Col>
            <nav aria-label="breadcrumb" className="bg-light rounded-3 p-3 mb-4">
              <ol className="breadcrumb mb-0">
                <li className="breadcrumb-item" onClick={handleHomeClick}>
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
          <Col lg={4}>
            <Card className="mb-4">
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
            </Card>
            <Card className="mb-4 mb-lg-0">
              <Card.Body className="p-0">
                <ul className="list-group list-group-flush rounded-3">
                  <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                    <i className="fas fa-globe fa-lg text-warning"></i>
                    <p className="mb-0">CIT-NaviGo</p>
                  </li>
                  {/* ... (other list items) */}
                </ul>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={8}>
            <Card className="mb-4">
              <Card.Body>
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Full Name</p>
                  </div>
                  <div className="col-sm-9">
                    {isEditing ? (
                      <input
                        type="text"
                        value="John Doe"
                        onChange={(e) => console.log(e.target.value)}
                      />
                    ) : (
                      <p className="text-muted mb-0">John Doe</p>
                    )}
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Nickname</p>
                  </div>
                  <div className="col-sm-9">
                    {isEditing ? (
                      <input
                        type="text"
                        value="Johnny"
                        onChange={(e) => console.log(e.target.value)}
                      />
                    ) : (
                      <p className="text-muted mb-0">Johnny</p>
                    )}
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Gender</p>
                  </div>
                  <div className="col-sm-9">
                    {isEditing ? (
                      <input
                        type="text"
                        value="Male"
                        onChange={(e) => console.log(e.target.value)}
                      />
                    ) : (
                      <p className="text-muted mb-0">Male</p>
                    )}
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Email</p>
                  </div>
                  <div className="col-sm-9">
                    {isEditing ? (
                      <input
                        type="text"
                        value="john.doe@example.com"
                        onChange={(e) => console.log(e.target.value)}
                      />
                    ) : (
                      <p className="text-muted mb-0">john.doe@example.com</p>
                    )}
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Phone Number</p>
                  </div>
                  <div className="col-sm-9">
                    {isEditing ? (
                      <input
                        type="text"
                        value="123-456-7890"
                        onChange={(e) => console.log(e.target.value)}
                      />
                    ) : (
                      <p className="text-muted mb-0">123-456-7890</p>
                    )}
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Student ID</p>
                  </div>
                  <div className="col-sm-9">
                    {isEditing ? (
                      <input
                        type="text"
                        value="ST123456"
                        onChange={(e) => console.log(e.target.value)}
                      />
                    ) : (
                      <p className="text-muted mb-0">ST123456</p>
                    )}
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Address</p>
                  </div>
                  <div className="col-sm-9">
                    {isEditing ? (
                      <input
                        type="text"
                        value="123 Main Street, Cityville"
                        onChange={(e) => console.log(e.target.value)}
                      />
                    ) : (
                      <p className="text-muted mb-0">123 Main Street, Cityville</p>
                    )}
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-9">
                    {isEditing ? (
                      <Button variant="success" onClick={handleSaveChanges}>
                        Save Changes
                      </Button>
                    ) : (
                      <Button variant="primary" onClick={handleEditProfileClick}>
                        Edit Profile
                      </Button>
                    )}
                  </div>
                  <div className="col-sm-3 d-flex justify-content-end">
                    {isEditing ? null : (
                      <Button variant="danger" onClick={handleDeleteAccount}>
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
};

export default UserProfile;
