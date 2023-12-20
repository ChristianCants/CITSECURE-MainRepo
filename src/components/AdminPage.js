import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Dropdown } from 'react-bootstrap'; // Import necessary Bootstrap components
import { Table } from 'react-bootstrap';
import axios from 'axios';


const AdminPage = () => {
    const [users, setUsers] = useState([]);
  
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
      backgroundColor: 'maroon',
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
  
        <div className="container mt-4">
          <h2>User Information</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Gender</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.gender}</td>
                  <td>{user.email}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </>
    );
  };
  
  export default AdminPage; 