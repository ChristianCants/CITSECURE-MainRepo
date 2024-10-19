import React, { Component } from 'react';
import { Table, Container, Row, Col, Modal, Form, Dropdown } from 'react-bootstrap'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { FaTimesCircle } from 'react-icons/fa';
import BootstrapButton from 'react-bootstrap/Button';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format, parse } from 'date-fns';
import { Settings as SettingsIcon } from '@mui/icons-material'; 

pdfMake.vfs = pdfFonts.pdfMake.vfs;

class AdminPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      showUpdateModal: false,
      showErrorModal: false,
      selectedUserId: null,
      updatedUserData: { firstName: '', lastName: '' },
      filterDateTimeIn: null,
      filterCardNumber: '',
      filterBuilding: '',
      filterPurpose: '',
    };

    this.handleExportPDF = this.handleExportPDF.bind(this);
    this.handleExportFilteredPDF = this.handleExportFilteredPDF.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleUpdateModalClose = this.handleUpdateModalClose.bind(this);
    this.handleUpdateModalSave = this.handleUpdateModalSave.bind(this);
    this.handleErrorClose = this.handleErrorClose.bind(this);
    this.handleDateFilterChange = this.handleDateFilterChange.bind(this);
    this.handleCardNumberFilterChange = this.handleCardNumberFilterChange.bind(this);
    this.handleBuildingFilterChange = this.handleBuildingFilterChange.bind(this);
    this.handlePurposeFilterChange = this.handlePurposeFilterChange.bind(this);
  }

  componentDidMount() {
    this.checkLogin();
    this.fetchUsers();
  }

  checkLogin = () => {
    const username = localStorage.getItem('uname');
    if (!username || username !== 'Admin') {
      this.setState({ showErrorModal: true });
    }
  };
  fetchUsers = () => {
    axios
      .get('http://localhost:8080/visitor/getAllVisitors') // API call to fetch visitors
      .then((response) => {
        console.log('API Response:', response.data); // Log the response data to the console
        this.setState({ users: response.data }); // Update users state with the fetched data
      })
      .catch((error) => {
        console.error('Error fetching users:', error.message); // Log errors in case of failure
      });
  };
  

  handleExportPDF = () => {
    const { users } = this.state;
  
    localStorage.setItem('allVisitorData', JSON.stringify(users));
  
    if (!users.length) {
      alert('No data to export.');
      return;
    }
  
    const docDefinition = {
      pageOrientation: 'landscape',
      content: [
        { text: 'Visitor Records 2024', style: 'header' },
        {
          style: 'table',
          table: {
            headerRows: 1,
            widths: ['auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto'], 
            body: [
              ['Card Number', 'First Name', 'Last Name', 'Purpose', 'Time In', 'Time Out', 'Building Visited', 'Gate Selected', 'Status'],
              ...users.map((user) => [
                user.cardNo || '',
                user.firstName || '',
                user.lastName || '',
                user.purpose || '',
                user.timeIn || '',
                user.timeOut || '',
                user.buildingToVisit || '',
                user.selected_gate || '', 
                user.status === 1 ? 'Inside Campus' : 'Exited',
              ]),
            ],
          },
          layout: {
            fillColor: (rowIndex) => (rowIndex % 2 === 0 ? '#f2f2f2' : null),
            hLineWidth: (i, node) => (i === 0 || i === node.table.body.length ? 2 : 1),
            vLineWidth: () => 1,
            hLineColor: () => '#000000',
            vLineColor: () => '#000000',
            paddingLeft: () => 4,
            paddingRight: () => 4,
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
      downloadLink.download = 'Visitor List Data.pdf';
      downloadLink.click();
    });
  };
  
  handleExportFilteredPDF = () => {
    const { users, filterDateTimeIn, filterCardNumber, filterBuilding, filterPurpose, filterGateSelected } = this.state;
  
    const filteredUsers = users.filter((user) => {
      const matchesDate = !filterDateTimeIn || 
        (user.timeIn && new Date(user.timeIn).toLocaleDateString() === filterDateTimeIn.toLocaleDateString());
      const matchesCardNumber = !filterCardNumber || user.cardNo.toString().includes(filterCardNumber);
      const matchesBuilding = !filterBuilding || user.buildingToVisit === filterBuilding;
      const matchesPurpose = !filterPurpose || user.purpose.toLowerCase().includes(filterPurpose.toLowerCase());
      const matchesGateSelected = !filterGateSelected || user.selected_gate === filterGateSelected;
  
      return matchesDate && matchesCardNumber && matchesBuilding && matchesPurpose && matchesGateSelected;
    });
  
    console.log('Filtered Users:', filteredUsers);  // Add this for debugging purposes
  
    if (!filteredUsers.length) {
      alert('No filtered data to export.');
      return;
    }
  
    const docDefinition = {
      pageOrientation: 'landscape',
      content: [
        { text: 'Filtered Visitor Records 2024', style: 'header' },
        {
          style: 'table',
          table: {
            headerRows: 1,
            widths: ['auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto'], 
            body: [
              ['Visitor No.', 'First Name', 'Last Name', 'Purpose', 'Time In', 'Time Out', 'Building Visited', 'Gate Selected', 'Status'],
              ...filteredUsers.map((user) => [
                user.cardNo || '',
                user.firstName || '',
                user.lastName || '',
                user.purpose || '',
                user.timeIn || '',
                user.timeOut || '',
                user.buildingToVisit || '',
                user.selected_gate || '', 
                user.status === 1 ? 'Inside Campus' : 'Exited',
              ]),
            ],
          },
          layout: {
            fillColor: (rowIndex) => (rowIndex % 2 === 0 ? '#f2f2f2' : null),
            hLineWidth: (i, node) => (i === 0 || i === node.table.body.length ? 2 : 1),
            vLineWidth: () => 1,
            hLineColor: () => '#000000',
            vLineColor: () => '#000000',
            paddingLeft: () => 4,
            paddingRight: () => 4,
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
      downloadLink.download = 'Filtered Data of Visitor List.pdf';
      downloadLink.click();
    });
  };
  
  
  
  

  handleLogout = async () => {
    localStorage.removeItem('uname');
    localStorage.removeItem('password');
    this.props.navigate('/AdminLogin');
  };

  handleStatistics = () => {
    this.props.navigate('/admin/AdminStatistics'); // Example navigation
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
      const response = await axios.put(`http://localhost:8080/visitor/updateVisitor/${selectedUserId}`, {
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

  handleErrorClose = () => {
    this.setState({ showErrorModal: false }, () => {
      this.props.navigate('/AdminLogin');
    });
  };

  handleDateFilterChange = (date) => {
    this.setState({ filterDateTimeIn: date });
  };

  handleGateSelectedFilterChange = (event) => {
    this.setState({ filterGateSelected: event.target.value });
  };

  handleCardNumberFilterChange = (event) => {
    this.setState({ filterCardNumber: event.target.value });
  };

  handleBuildingFilterChange = (event) => {
    this.setState({ filterBuilding: event.target.value });
  };

  handlePurposeFilterChange = (event) => {
    this.setState({ filterPurpose: event.target.value });
  };

  formatDate = (date) => {
    return format(date, 'dd/MM/yyyy');
  };

  render() {
    const { users, showUpdateModal, updatedUserData, showErrorModal, filterDateTimeIn, filterCardNumber, filterBuilding, filterPurpose, filterGateSelected } = this.state;

    const filteredUsers = users.filter((user) => {
      const matchesDate =
        !filterDateTimeIn || parse(user.timeIn, 'hh:mm a dd/MM/yyyy', new Date()).toDateString() === filterDateTimeIn.toDateString();
      const matchesCardNumber = !filterCardNumber || user.cardNo.toString().includes(filterCardNumber);
      const matchesBuilding = !filterBuilding || user.buildingToVisit === filterBuilding;
      const matchesPurpose = !filterPurpose || user.purpose.toLowerCase().includes(filterPurpose.toLowerCase());
      const matchesGateSelected = !filterGateSelected || user.selected_gate === filterGateSelected; 

      return matchesDate && matchesCardNumber && matchesBuilding && matchesPurpose && matchesGateSelected;
    });

    return (
      <div style={{ backgroundColor: '#FFF9EB', minHeight: '100vh' }}>
        <header
          className="d-flex flex-wrap align-items-center justify-content-between py-3 mb-4 border-bottom"
          style={{
            backgroundColor: 'maroon',
            padding: '10px',
            fontSize: '20px',
          }}
        >
          <div style={{ color: 'white', display: 'flex', alignItems: 'center' }}>
            <img src="/images/CIT LOGO.png" alt="CITSecure Logo" width="67" height="60" />
            <span style={{ width: '2.5px', height: '40px', backgroundColor: 'white', margin: '0 5px' }}></span>
            <span>CITSecure</span>
          </div>
          <ul className="nav nav-pills d-flex justify-content-center" style={{ margin: 0, padding: 0, flexGrow: 1 }}>
            <li className="nav-item">
              <span className="nav-link" style={{ color: 'white', fontSize: '40px', fontWeight: 'bold' }}>
                Admin Dashboard
              </span>
            </li>
          </ul>

          {/* Adding Settings Dropdown */}
          <Dropdown align="end">
            <Dropdown.Toggle variant="secondary" id="dropdown-basic" style={{ backgroundColor: 'transparent', border: 'none' }}>
              <SettingsIcon style={{ color: 'white', fontSize: '40px' }} /> {/* Settings Icon */}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={this.handleExportPDF}>Export Data</Dropdown.Item>
              <Dropdown.Item onClick={this.handleExportFilteredPDF}>Export Filtered Data</Dropdown.Item>
              <Dropdown.Item onClick={this.handleStatistics}>Admin Statistics</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={this.handleLogout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </header>

            <Container style={{ marginBottom: '20px' }}>
        <Row className="justify-content-center mb-3">
          <Col md={2}>
            <Form.Group>
              <Form.Label style={{ fontWeight: 'bold' }}>Date Filter:</Form.Label>
              <DatePicker
                selected={filterDateTimeIn}
                onChange={this.handleDateFilterChange}
                dateFormat="dd/MM/yyyy"
                placeholderText="dd/mm/yyyy"
                className="form-control"
              />
            </Form.Group>
          </Col>
          <Col md={2}>
            <Form.Group>
              <Form.Label style={{ fontWeight: 'bold' }}>Visitor  No.</Form.Label>
              <Form.Control
                type="text"
                placeholder="Visitor No."
                value={filterCardNumber}
                onChange={this.handleCardNumberFilterChange}
                className="form-control"
              />
            </Form.Group>
          </Col>
          <Col md={2}>
            <Form.Group>
              <Form.Label style={{ fontWeight: 'bold' }}>Building:</Form.Label>
              <Form.Control
                as="select"
                value={filterBuilding}
                onChange={this.handleBuildingFilterChange}
                className="form-control"
              >
                <option value="">All Buildings</option>
                <option value="NGE">NGE</option>
                <option value="GLE">GLE</option>
                <option value="RTL">RTL</option>
                <option value="ALLIED">ALLIED</option>
                <option value="ACAD">ACAD</option>
                <option value="SAL">SAL</option>
                <option value="MAIN CANTEEN">MAIN CANTEEN</option>
                <option value="HIGHSCHOOL CANTEEN">HIGHSCHOOL CANTEEN</option>
                <option value="ELEMENTARY BUILDING">ELEMENTARY BUILDING</option>
                <option value="WILDCATS LIBRARY">WILDCATS LIBRARY</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={2}>
            <Form.Group>
              <Form.Label style={{ fontWeight: 'bold' }}>Purpose:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Purpose"
                value={filterPurpose}
                onChange={this.handlePurposeFilterChange}
                className="form-control"
              />
            </Form.Group>
          </Col>
          <Col md={2}>
            <Form.Group>
              <Form.Label style={{ fontWeight: 'bold' }}>Gate Selected:</Form.Label>
              <Form.Control
                as="select"
                value={this.state.filterGateSelected}
                onChange={this.handleGateSelectedFilterChange}
                className="form-control"
              >
                <option value="">All Gates</option>
                <option value="Front Gate">Front Gate</option>
                <option value="Back Gate">Back Gate</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
      </Container>

        <Container fluid className="pt-0">
          <Row>
            <Col lg={12}>
              <Table striped bordered hover style={{ backgroundColor: 'white' }}>
                <thead>
                  <tr>
                    <th>Visitor No.</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Purpose</th>
                    <th>Time in</th>
                    <th>Time out</th>
                    <th>Building Visited</th>
                    <th>Gate Selected</th> 
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody style={{ color: 'black' }}>
                  {filteredUsers.map((user) => (
                    <tr key={user.id}>
                      <td>{user.cardNo}</td>
                      <td>{user.firstName}</td>
                      <td>{user.lastName}</td>
                      <td>{user.purpose}</td>
                      <td>{user.timeIn}</td>
                      <td>{user.timeOut}</td>
                      <td>{user.buildingToVisit}</td>
                      <td>{user.selected_gate}</td>

                      <td style={{ color: user.status === 1 ? 'red' : 'green' }}>
                        {user.status === 1 ? 'Inside Campus' : 'Exited'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>

        <Modal show={showUpdateModal} onHide={this.handleUpdateModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Update User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  value={updatedUserData.firstName}
                  onChange={(e) =>
                    this.setState({ updatedUserData: { ...updatedUserData, firstName: e.target.value } })
                  }
                />
              </Form.Group>
              <Form.Group controlId="lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  value={updatedUserData.lastName}
                  onChange={(e) =>
                    this.setState({ updatedUserData: { ...updatedUserData, lastName: e.target.value } })
                  }
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <BootstrapButton variant="secondary" onClick={this.handleUpdateModalClose}>
              Close
            </BootstrapButton>
            <BootstrapButton variant="primary" onClick={this.handleUpdateModalSave}>
              Save Changes
            </BootstrapButton>
          </Modal.Footer>
        </Modal>

        <Modal show={showErrorModal} onHide={this.handleErrorClose} centered style={{ backgroundColor: 'white' }}>
          <Modal.Header closeButton style={{ borderBottom: '2px solid maroon' }}>
            <Modal.Title>Access Denied</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="d-flex justify-content-center align-items-center">
              <div className="d-flex align-items-center">
                <p style={{ marginRight: '10px', marginBottom: '0' }}>Admin Dashboard is for Authorized personnel only.</p>
                <FaTimesCircle style={{ color: 'red', fontSize: '2rem', marginBottom: '0' }} />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer style={{ borderTop: '2px solid maroon', display: 'flex', justifyContent: 'center' }}>
            <BootstrapButton variant="primary" onClick={this.handleErrorClose} style={{ background: 'maroon', width: '200px' }}>
              OK
            </BootstrapButton>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default function AdminPageWithNavigate(props) {
  const navigate = useNavigate();
  return <AdminPage {...props} navigate={navigate} />;
}
