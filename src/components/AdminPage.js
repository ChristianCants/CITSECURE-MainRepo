import React, { useState, useEffect } from 'react';
import { Table, Container, Row, Col, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { PDFDownloadLink, Page, Document, Text, View, StyleSheet } from '@react-pdf/renderer';
import pdfMake from 'pdfmake/build/pdfmake';  // Import pdfmake here
import pdfFonts from 'pdfmake/build/vfs_fonts';

// Register fonts with pdfMake
pdfMake.vfs = pdfFonts.pdfMake.vfs;

// Styles for the PDF document
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  table: {
    display: 'table',
    width: '100%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: { margin: 'auto', flexDirection: 'row' },
  tableCol: { width: '25%', borderStyle: 'solid', borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0 },
  tableCell: { margin: 'auto', marginTop: 5, fontSize: 12, padding: 5 },
});

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [updatedUserData, setUpdatedUserData] = useState({
    firstName: '',
    lastName: '',
  });

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

  const handleExportPDF = () => {
    const docDefinition = {
      content: [
        { text: 'List of Visitors', style: 'header' },
        {
          style: 'table',
          table: {
            headerRows: 1,
            widths: ['auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto'],
            body: [
              ['ID', 'First Name', 'Last Name', 'Purpose', 'Time In', 'Time Out', 'Building Visited'],
              ...users.map((user) => [
                user.id,
                user.firstName,
                user.lastName,
                user.purpose,
                user.timeInString,
                user.timeOutString,
                user.buildingToVisit,
              ]),
            ],
          },
        },
      ],
      styles: {
        header: {
          fontSize: 20,
          bold: true,
          alignment: 'center',
          margin: [0, 0, 0, 10],
        },
        table: {
          margin: [0, 5, 0, 15],
        },
      },
    };
  
    // Create PDF document
    const pdfDocGenerator = pdfMake.createPdf(docDefinition);
  
    // Generate PDF blob and download
    pdfDocGenerator.getBlob((blob) => {
      const downloadLink = document.createElement('a');
      downloadLink.href = URL.createObjectURL(blob);
      downloadLink.download = 'visitor_list.pdf';
      downloadLink.click();
    });
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
        const updatedUsers = await axios.get('http://localhost:8080/admin/getAllVisitors');
        setUsers(updatedUsers.data);
      } else {
        alert('Failed to update user.');
      }

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
                    <img src="/images/CITSecure LOGO.png" alt="CITSecure Logo" width="67" height="60" />
                    <span style={{ width: '2.5px', height: '40px', backgroundColor: 'white', margin: '0 5px' }}></span>
                    <span>CITSecure</span>
                </div>
  <ul className="nav nav-pills d-flex justify-content-center" style={{ margin: 0, padding: 0, flexGrow: 1 }}>
    <li className="nav-item">
      <Link to="/menu" className="nav-link" style={{ color: 'white' }}>
        Home
      </Link>
    </li>
    <li className="nav-item">
      <Link to="/visitor-navigation" className="nav-link" style={{ color: 'white' }}>
        Visitor Navigation
      </Link>
    </li>
    <li className="nav-item">
      <Link to="/about" className="nav-link" style={{ color: 'white' }}>
        About us
      </Link>
    </li>
  </ul>
  <Button onClick={handleExportPDF} style={{ color: 'white', backgroundColor: 'transparent', border: '1px solid white', marginLeft: '10px' }}>
    Export PDF
  </Button>
</header>


      <Container fluid className="py-5">
        <Row>
          <Col lg={12}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Purpose</th> {/* Include Purpose column in the table header */}
                  <th>Time in</th>
                  <th>Time out</th>
                  <th>Building Visited</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody style={{ color: 'black' }}>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td style={{ borderBottom: '1px solid #B06161' }}>{user.id}</td>
                    <td style={{ borderBottom: '1px solid #B06161' }}>{user.firstName}</td>
                    <td style={{ borderBottom: '1px solid #B06161' }}>{user.lastName}</td>
                    <td style={{ borderBottom: '1px solid #B06161' }}>{user.purpose}</td> {/* Display purpose field */}
                    <td style={{ borderBottom: '1px solid #B06161' }}>{user.timeInString}</td>
                    <td style={{ borderBottom: '1px solid #B06161' }}>{user.timeOutString}</td>
                    <td style={{ borderBottom: '1px solid #B06161' }}>{user.buildingToVisit}</td>
                    <td style={{ borderBottom: '1px solid #B06161', textAlign: 'left' }}>
                      <Button
                        variant="info"
                        style={{ marginRight: '5px', fontWeight: 'bold', color: 'black' }}
                        onClick={() => handleUpdate(user.id)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        style={{ marginLeft: '5px', fontWeight: 'bold', color: 'black' }}
                        onClick={() => handleDelete(user.id)}
                      >
                        Delete
                      </Button>
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
