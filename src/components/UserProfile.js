import React, { useState, useEffect } from "react";
import axios from "axios";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Container, Card, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './UserProfile.css'; // Assuming the CSS file with styles is named styles.css

function UserProfile() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);


  const handleSaveChanges = () => {
    console.log('Changes saved');
    // Add logic to save the changes (e.g., make an API request)
    // setEditing(false);
  };
  
  const handleEditProfileClick = () => {
    console.log('Edit Profile button clicked');
    // setEditing(true);
  };
  

  useEffect(() => {
    axios.get("http://localhost:8080/User/getAllUsers")
      .then(res => {
        setData(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  const handleEdit = (user) => {
    confirmAlert({
      title: 'Edit User',
      message: (
        <>
          <div>
            <label>First Name:</label>
            <input type="text" id="editedFirstName" defaultValue={user.firstName} />
          </div>
          <div>
            <label>Last Name:</label>
            <input type="text" id="editedLastName" defaultValue={user.lastName} />
          </div>
          <div>
            <label>Password:</label>
            <input type="text" id="editedPassword" defaultValue={user.password} />
          </div>
        </>
      ),
      buttons: [
        {
          label: 'Save',
          onClick: () => {
            const updatedFirstName = document.getElementById('editedFirstName').value;
            const updatedLastName = document.getElementById('editedLastName').value;
            const updatedPassword = document.getElementById('editedPassword').value;

            if (updatedFirstName || updatedLastName || updatedPassword) {
              axios.put(`http://localhost:8080/User/updateUser/${user.id}`, {
                firstName: updatedFirstName || user.firstName,
                lastName: updatedLastName || user.lastName,
                password: updatedPassword || user.password,
              })
                .then(res => {
                  setData(data.map((u) => (u.id === user.id ? res.data : u)));
                })
                .catch(err => console.log(err));
            }
          }
        },
        {
          label: 'Cancel',
          onClick: () => {}
        }
      ],
      closeOnEscape: true,
      closeOnClickOutside: true,
      overlayClassName: 'custom-overlay',
    });
  };

  return (
    <section style={{ backgroundColor: '#eee' }}>
      <Container fluid className="py-5" style={{ backgroundColor: '#fff' }}>
        <Row>
          <Col>
            {/* Breadcrumb navigation */}
            <nav aria-label="breadcrumb" className="bg-light rounded-3 p-3 mb-4">
            <ol className="breadcrumb mb-0 custom-breadcrumb" style={{ backgroundColor: '#fff' }}>

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
          <Col lg={4}>
            {/* User profile card */}
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
            {/* Additional card (if needed) */}
          </Col>
          <Col lg={8}>
            {/* User information card */}
            <Card className="mb-4">
              <Card.Body>
                {/* Information rows (editable or non-editable) */}
                {data.map((user, i) => (
                  <div key={i}>
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">Full Name</p>
                      </div>
                      <div className="col-sm-9">
                        {user.isEditing ? (
                          <input
                            type="text"
                            value={user.firstName}
                            onChange={(e) => console.log(e.target.value)}
                          />
                        ) : (
                          <p className="text-muted mb-0">{user.firstName}</p>
                        )}
                      </div>
                    </div>
                    {/* ... (repeat for other information rows) */}
                    <hr />
                  </div>
                ))}
                {/* Save Changes or Edit Profile button */}
                <div className="row">
                  <div className="col-sm-9">
                    <Button variant="success" onClick={handleSaveChanges}>
                      Save Changes
                    </Button>
                  </div>
                  <div className="col-sm-3 d-flex justify-content-end">
                    <Button variant="primary" onClick={handleEditProfileClick}>
                      Edit Profile
                    </Button>
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
