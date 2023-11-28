import React from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
    const navigate = useNavigate();
  
    const handleHomeClick = () => {
      console.log('Home link clicked');
      navigate('/menu');
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
                    <li className="breadcrumb-item"><a href="#">User</a></li>
                    <li className="breadcrumb-item active" aria-current="page">User Profile</li>
                  </ol>
                </nav>
              </Col>
            </Row>
    
            <Row>
              <Col lg={4}>
                <Card className="mb-4">
                  <Card.Body className="text-center">
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp" alt="avatar" className="rounded-circle img-fluid" style={{ width: '150px' }} />
                    <h5 className="my-3">John</h5>
                    <p className="text-muted mb-1">Student </p>
                    <p className="text-muted mb-4">BSIT</p>
                    <div className="d-flex justify-content-center mb-2">
                    </div>
                  </Card.Body>
                </Card>
                <Card className="mb-4 mb-lg-0">
                  <Card.Body className="p-0">
                    <ul className="list-group list-group-flush rounded-3">
                      <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                        <i className="fas fa-globe fa-lg text-warning"></i>
                        <p className="mb-0">CIT-NaviGo</p>
                      </li>
                      {/* Add other list items */}
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
                        <p className="text-muted mb-0">John Doe</p>
                      </div>
                    </div>
                    <hr />
                    {/* Add other rows */}
                  </Card.Body>
                </Card>
                {/* Add other cards or components */}
              </Col>    
            </Row>
          </Container>
        </section>
      );
    };
    
    export default UserProfile;