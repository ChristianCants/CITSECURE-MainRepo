import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Dropdown, Table, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Add this line to import useNavigate

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();  // Add this line to use navigate

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
    backgroundColor: '#DC8686', // Change the background color to #B06161
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
    {/* Breadcrumb navigation */}
    <nav aria-label="breadcrumb" className="rounded-3 p-3 mb-4" style={{ backgroundColor: 'rgb(164, 63, 63)' }}>
      <ol className="breadcrumb mb-0" style={{ backgroundColor: 'rgb(164, 63, 63)', color: 'white' }}>
        <li className="breadcrumb-item" onClick={() => navigate('/menu')}>
          <a href="#" style={{ color: 'white' }}>Admin</a>
        </li>
        <li className="breadcrumb-item">
          <a href="#" style={{ color: 'white' }}>User</a>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          User Profile
        </li>
      </ol>
    </nav>
  </Col>
</Row>

        <Row>
          <Col lg={12}>
          
          <Table striped bordered hover style={{ border: '1px solid #B06161', color: 'black' }}>
  <thead>
    <tr>
      <th style={{ verticalAlign: 'bottom', borderBottom: '2px solid #dc3545' }}>ID</th>
      <th style={{ verticalAlign: 'bottom', borderBottom: '2px solid #dc3545' }}>First Name</th>
      <th style={{ verticalAlign: 'bottom', borderBottom: '2px solid #dc3545' }}>Last Name</th>
      <th style={{ verticalAlign: 'bottom', borderBottom: '2px solid #dc3545' }}>Gender</th>
      <th style={{ verticalAlign: 'bottom', borderBottom: '2px solid #dc3545' }}>Email</th>
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
    </tr>
  ))}
</tbody>
</Table>

          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AdminPage;
