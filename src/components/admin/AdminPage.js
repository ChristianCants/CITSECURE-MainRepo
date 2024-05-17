import React, { Component } from 'react';
import { Table, Container, Row, Col, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

class AdminPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      showUpdateModal: false,
      selectedUserId: null,
      updatedUserData: { firstName: '', lastName: '' },
      filterDateTimeIn: '',
    };

    // Binding methods to make `this` work in the callback
    this.handleExportPDF = this.handleExportPDF.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleUpdateModalClose = this.handleUpdateModalClose.bind(this);
    this.handleUpdateModalSave = this.handleUpdateModalSave.bind(this);
  }

  componentDidMount() {
    this.fetchUsers();
    if (!localStorage.getItem("uname") || localStorage.getItem("uname") !== "Admin") {
      this.props.navigate('/AdminLogin');
    }
  }

  fetchUsers = () => {
    axios.get('http://localhost:8080/admin/getAllVisitors')
      .then(response => {
        this.setState({ users: response.data });
      })
      .catch(error => {
        console.error('Error fetching users:', error.message);
      });
  }

  handleExportPDF = () => {
    const { users } = this.state;
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
                user.timeIn,
                user.timeOut,
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
  
    const pdfDocGenerator = pdfMake.createPdf(docDefinition);
    pdfDocGenerator.getBlob((blob) => {
      const downloadLink = document.createElement('a');
      downloadLink.href = URL.createObjectURL(blob);
      downloadLink.download = 'visitor_list.pdf';
      downloadLink.click();
    });
  };

  handleLogout = async () => {
    localStorage.removeItem('uname');
    localStorage.removeItem('password');
    this.props.navigate('/AdminLogin');
  };

  handleUpdate = (userId) => {
    const userToUpdate = this.state.users.find((user) => user.id === userId);
    if (userToUpdate) {
      this.setState({
        selectedUserId: userId,
        showUpdateModal: true,
        updatedUserData: {
          firstName: userToUpdate.firstName,
          lastName: userToUpdate.lastName,
        },
      });
    }
  };

  handleUpdateModalSave = async () => {
    const { selectedUserId, updatedUserData } = this.state;
    try {
      const response = await axios.put(`http://localhost:8080/admin/updateVisitor/${selectedUserId}`, {
        firstName: updatedUserData.firstName,
        lastName: updatedUserData.lastName,
      });
  
      if (response.status === 200) {
        alert('User updated successfully!');
        this.fetchUsers();
      } else {
        alert('Failed to update user.');
      }
  
      this.handleUpdateModalClose();
    } catch (error) {
      console.error('Error updating user:', error.message);
    }
  };

  handleUpdateModalClose = () => {
    this.setState({
      showUpdateModal: false,
      selectedUserId: null,
      updatedUserData: { firstName: '', lastName: '' },
    });
  };


  render() {
    const { users, showUpdateModal, updatedUserData, filterDateTimeIn } = this.state;

    const backdropStyle = {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
      zIndex: 999, // Ensure the backdrop is on top
      backdropFilter: 'blur(5px)', // Apply blur effect
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
              <Link to="/visitor-navigation" className="nav-link" style={{ color: 'white' }}>
                Admin Dashboard
              </Link>
            </li>
          </ul>
          <Button onClick={this.handleExportPDF} style={{ color: 'white', backgroundColor: 'transparent', border: '1px solid white', marginLeft: '10px' }}>
            Export PDF
          </Button>
          <Button onClick={this.handleLogout} style={{ color: 'white', backgroundColor: 'transparent', border: '1px solid white', marginLeft: '10px' }}>
            Logout
          </Button>
        </header>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginRight: '20px' }}>
          <input
            type="date"
            value={filterDateTimeIn}
            onChange={(e) => this.setState({ filterDateTimeIn: e.target.value })}
          />
        </div>
        <Container fluid className="py-5">
          <Row>
            <Col lg={12}>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Card Number</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Purpose</th>
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
                      <td style={{ borderBottom: '1px solid #B06161' }}>{user.cardNo}</td>
                      <td style={{ borderBottom: '1px solid #B06161' }}>{user.firstName}</td>
                      <td style={{ borderBottom: '1px solid #B06161' }}>{user.lastName}</td>
                      <td style={{ borderBottom: '1px solid #B06161' }}>{user.purpose}</td>
                      <td style={{ borderBottom: '1px solid #B06161' }}>{user.timeIn}</td>
                      <td style={{ borderBottom: '1px solid #B06161' }}>{user.timeOut}</td>
                      <td style={{ borderBottom: '1px solid #B06161' }}>{user.buildingToVisit}</td>
                      <td style={{ borderBottom: '1px solid #B06161', textAlign: 'left' }}>
                        {user.status === 1 ? (
                          <span style={{ color: 'red' }}>Card in use</span>
                        ) : (
                          <>
                            <Button
                              variant="info"
                              style={{ marginRight: '5px', fontWeight: 'bold', color: 'black' }}
                              onClick={() => this.handleUpdate(user.id)}
                            >
                              Edit
                            </Button>
                            {/* <Button
                                variant="danger"
                                style={{ marginLeft: '5px', fontWeight: 'bold', color: 'black' }}
                                onClick={() => handleDelete(user.id)}
                            >
                                Delete
                            </Button> */}
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>
        {/* Update Modal */}
        <Modal show={showUpdateModal} onHide={this.handleUpdateModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Update User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="formFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter first name"
                value={updatedUserData.firstName}
                onChange={(e) => this.setState({ updatedUserData: { ...updatedUserData, firstName: e.target.value } })}
              />
            </Form.Group>
            <Form.Group controlId="formLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter last name"
                value={updatedUserData.lastName}
                onChange={(e) => this.setState({ updatedUserData: { ...updatedUserData, lastName: e.target.value } })}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleUpdateModalClose}>
              Close
            </Button>
            <Button variant="primary" onClick={this.handleUpdateModalSave}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default AdminPage;
