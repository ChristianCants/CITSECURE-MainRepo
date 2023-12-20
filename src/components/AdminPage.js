import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Dropdown, Table, Container, Row, Col, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [updatedUserData, setUpdatedUserData] = useState({
    firstName: '',
    lastName: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch users from the backend when the component mounts
    axios.get('http://localhost:8080/User/getAllUsers')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error.message);
      });
  }, []);

  const navBarStyles = {
    backgroundColor: '#B06161',
    display: 'flex',
    alignItems: 'center',
    padding: '10px',
    justifyContent: 'space-between',
  };

  const citNaviGoStyles = {
    color: 'white',
    marginLeft: '10px',
    position: 'relative',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
  };

  const handleUpdate = (userId) => {
    setSelectedUserId(userId);
    setShowUpdateModal(true);
  };

  const handleUpdateModalClose = () => {
    setShowUpdateModal(false);
    setSelectedUserId(null);
    setUpdatedUserData({
      firstName: '',
      lastName: '',
    });
  };

  const handleDelete = async (userId) => {
    try {
      const confirmDelete = window.confirm('Are you sure you want to delete this user?');
      if (confirmDelete) {
        const response = await axios.delete(`http://localhost:8080/User/deleteUser/${userId}`);
        if (response.status === 200) {
          alert('User deleted successfully!');
          // You may want to fetch the updated user list after deletion
          // to reflect the changes in the table.
          // For simplicity, you can re-fetch the user list here.
          const updatedUsers = await axios.get('http://localhost:8080/User/getAllUsers');
          setUsers(updatedUsers.data);
        } else {
          alert('Failed to delete user.');
        }
      }
    } catch (error) {
      console.error('Error deleting user:', error.message);
    }
  };
  

  const handleUpdateModalSave = async () => {
    try {
      const response = await axios.put(`http://localhost:8080/User/updateUser/${selectedUserId}`, {
        firstName: updatedUserData.firstName,
        lastName: updatedUserData.lastName,
      });
  
      if (response.status === 200) {
        alert('User updated successfully!');
        // Fetch the updated user list after the update to reflect changes in the table
        const updatedUsers = await axios.get('http://localhost:8080/User/getAllUsers');
        setUsers(updatedUsers.data);
      } else {
        alert('Failed to update user.');
      }
  
      // Close the modal after updating
      handleUpdateModalClose();
    } catch (error) {
      console.error('Error updating user:', error.message);
    }
  };
  

  return (
    <>
      <Navbar className="d-flex flex-wrap align-items-center justify-content-between py-3 mb-4 border-bottom" style={navBarStyles}>
        <div style={citNaviGoStyles}>
          {/* Your CIT NaviGO logo SVG and text */}
        </div>
        <Nav className="d-flex align-items-center">
          {/* Add your navigation links here */}
          {/* ... */}
          {/* Dropdown Button */}
          <Dropdown>
            {/* Dropdown content */}
          </Dropdown>
          {/* Logout button */}
        </Nav>
      </Navbar>

      <Container fluid className="py-5">
        <Row>
          <Col>
            {/* ... (previous code) */}
          </Col>
        </Row>

        <Row>
          <Col lg={12}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Gender</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody style={{ color: 'black' }}>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td style={{ borderBottom: '1px solid #B06161' }}>{user.id}</td>
                    <td style={{ borderBottom: '1px solid #B06161' }}>{user.firstName}</td>
                    <td style={{ borderBottom: '1px solid #B06161' }}>{user.lastName}</td>
                    <td style={{ borderBottom: '1px solid #B06161' }}>{user.gender}</td>
                    <td style={{ borderBottom: '1px solid #B06161' }}>{user.email}</td>
                    <td style={{ borderBottom: '1px solid #B06161' }}>
                      <Button variant="info" onClick={() => handleUpdate(user.id)}>Update</Button>
                      {/* Use a different onClick handler for the delete button */}
                      <Button variant="danger" onClick={() => handleDelete(user.id)}>Delete</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>

      {/* Update Modal */}
      <Modal show={showUpdateModal} onHide={handleUpdateModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter first name"
                value={updatedUserData.firstName}
                onChange={(e) => setUpdatedUserData({ ...updatedUserData, firstName: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter last name"
                value={updatedUserData.lastName}
                onChange={(e) => setUpdatedUserData({ ...updatedUserData, lastName: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleUpdateModalClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdateModalSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AdminPage;
