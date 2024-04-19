import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Dropdown, Table, Container, Row, Col, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

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
        const response = await axios.delete(`http://localhost:8080/admin/deleteUser/${userId}`);
        if (response.status === 200) {
          alert('User deleted successfully!');
          // You may want to fetch the updated user list after deletion
          // to reflect the changes in the table.
          // For simplicity, you can re-fetch the user list here.
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
        // Fetch the updated user list after the update to reflect changes in the table
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
      <header
                className="d-flex flex-wrap align-items-center justify-content-between py-3 mb-4 border-bottom"
                style={{
                    backgroundColor: 'maroon',
                    padding: '10px',
                    fontSize: '20px',
                }}
            >
                <div style={{ color: 'white', display: 'flex', alignItems: 'center' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="56" height="40" viewBox="0 0 56 54" fill="none">
                        <path d="M2.91855 24.6698L53.7146 2.74497L28.2999 51.8879L23.7747 30.6645L2.91855 24.6698Z" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span style={{ width: '2px', height: '30px', backgroundColor: 'white', margin: '0 5px' }}></span>
                    <span>CITSecure</span>
                </div>
                <ul className="nav nav-pills d-flex justify-content-center" style={{ margin: 0, padding: 0, flexGrow: 1 }}>
                
                <li className="nav-item"><Link to="/menu" className="nav-link" style={{ color: 'white' }}>Home</Link></li>
                <li className="nav-item"><Link to="/visitor-navigation" className="nav-link" style={{ color: 'white' }}>Visitor Navigation</Link></li>
                 <li className="nav-item"><Link to="/about" className="nav-link" style={{ color: 'white' }}>About us</Link></li>
        </ul>
        
      </header>

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
                  <th>Full Name</th>
                  <th>Building</th>
                  <th>Purpose</th>
                  <th>Time in</th>
                  <th>Time out</th>
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
                    <td style={{ borderBottom: '1px solid #B06161', textAlign: 'right' }}>
                      <Button variant="info" style={{ marginRight: '5px', fontWeight: 'bold', color: 'black' }} onClick={() => handleUpdate(user.id)}>Update</Button>
                      <Button variant="danger" style={{ marginLeft: '5px', fontWeight: 'bold', color: 'black' }} onClick={() => handleDelete(user.id)}>Delete</Button>
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