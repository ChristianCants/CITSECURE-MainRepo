import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Table, Container, Row, Col, Button, Modal, Form } from 'react-bootstrap';
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
    axios.get('http://localhost:8080/admin/getAllVisitors')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error.message);
      });
  }, []);

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
        const response = await axios.delete(`http://localhost:8080/admin/deleteUser/${userId}`);
        if (response.status === 200) {
          alert('User deleted successfully!');
          // Fetch the updated user list after deletion
          const updatedUsers = await axios.get('http://localhost:8080/admin/getAllVisitors');
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
        // Fetch the updated user list after the update
        const updatedUsers = await axios.get('http://localhost:8080/admin/getAllVisitors');
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
      <Navbar bg="dark" variant="dark" className="mb-4">
        <Navbar.Brand href="#home">CIT Secure</Navbar.Brand>
        <Nav className="mr-auto">
          {/* Add your navigation links here */}
          {/* <Nav.Link href="#home">Home</Nav.Link> */}
          {/* <Nav.Link href="#features">Features</Nav.Link> */}
          {/* Dropdown Button */}
          {/* <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Dropdown
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#action/1">Action</Dropdown.Item>
                <Dropdown.Item href="#action/2">Another action</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown> */}
        </Nav>
        <Button variant="outline-light" onClick={() => navigate('/')}>Logout</Button>
      </Navbar>

      <Container>
        <Row>
          <Col>
            <h2>User Management</h2>
          </Col>
        </Row>

        <Row>
          <Col>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Purpose</th>
                  <th>Time in</th>
                  <th>Time out</th>
                  <th>Building Visited</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.purpose}</td>
                    <td>{user.timeInString}</td>
                    <td>{user.timeOutString}</td>
                    <td>{user.buildingToVisit}</td>
                    <td>
                      <Button variant="info" onClick={() => handleUpdate(user.id)}>Update</Button>
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
