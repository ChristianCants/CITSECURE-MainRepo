  import React, { useState, useEffect } from 'react';
  import { useNavigate, Link } from 'react-router-dom';
  import Dropdown from 'react-bootstrap/Dropdown';
  import Modal from 'react-bootstrap/Modal';
  import Button from 'react-bootstrap/Button';
  import axios from 'axios';

  const HighSchoolBuilding = () => {
    const [activeLink, setActiveLink] = useState('view-map');
    const [isEditing, setEditing] = useState(false);
    const [rooms, setRooms] = useState([]);
    const [fetchedData, setFetchedData] = useState([]);
    const [editedNames, setEditedNames] = useState({});
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [currentRoomId, setCurrentRoomId] = useState(null);

    
    useEffect(() => {
      fetchData();
    }, []);

    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/highschool/getAllHighSchool');
        console.log('Response from backend:', response.data);
        setFetchedData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    

    const handleAddRoom = async () => {
      try {
        const roomName = window.prompt('Room Name:');
        if (!roomName) {
          // If the user cancels or enters an empty name, do nothing
          return;
        }
    
        const newHighSchool = {
          highSchoolName: roomName, // Use the entered roomName
          // You can add other properties as needed
        };
    
        const response = await axios.post('http://localhost:8080/highschool/addHighSchool', newHighSchool);
        console.log('High School added:', response.data);
        fetchData();
      } catch (error) {
        console.error('Error adding High School:', error);
      }
    };
    

    const handleDeleteRoom = async (id) => {
      try {
        const confirmDelete = window.confirm('Are you sure you want to delete this room?');
        if (confirmDelete) {
          await axios.delete(`http://localhost:8080/highschool/deleteHighSchool/${id}`);
          console.log('High School deleted:', id);
          // Update the state to trigger a re-render without fetching the data again
          setFetchedData((prevData) => prevData.filter((room) => room.highSchoolId !== id));
        }
      } catch (error) {
        console.error('Error deleting High School:', error);
      }
    };
    

    const handleUpdateRoom = async (id) => {
      try {
        const updatedName = editedNames[id].trim();
        if (!updatedName || updatedName.length > 50) {
          alert('Please enter a valid name (up to 50 characters).');
          return;
        }
  
        const updatedHighSchool = {
          highSchoolName: updatedName,
        };
  
        const response = await axios.put(`http://localhost:8080/highschool/updateHighSchool/${id}`, updatedHighSchool);
        console.log('Highschool updated:', response.data);
        fetchData();
        setEditing(false);
      } catch (error) {
        console.error('Error updating HighSchool:', error);
      }
    };
  
    
  
    const openModal = (roomId) => {
      setCurrentRoomId(roomId);
      setShowModal(true);
    };
  
    const closeModal = () => {
      setCurrentRoomId(null);   
      setShowModal(false);
    };
  
    const handleSaveChanges = async () => {
      try {
        const updatedName = editedNames[currentRoomId].trim();
        if (!updatedName || updatedName.length > 50) {
          alert('Please enter a valid name (up to 50 characters).');
          return;
        }
  
        const updatedHighSchool = {
          highSchoolName: updatedName,
        };
  
        const response = await axios.put(`http://localhost:8080/highschool/updateHighSchool/${currentRoomId}`, updatedHighSchool);
        console.log('HighSchool updated:', response.data);
        fetchData();
        closeModal();
      } catch (error) {
        console.error('Error updating HighSchool:', error);
      }
    };
  
    const pageStyles = {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      background: '#FFFFFF',
    };
  
    const handleLogout = () => {
      const shouldLogout = window.confirm('Are you sure you want to log out?');
   
      if (shouldLogout) {
        // Add any logout logic here
        // For example, clear user session, cookies, or perform API logout
        // After the logout logic, navigate to the login page or any other desired page
        navigate('/');
      }
    };
   
    const handleProfileClick = () => {
      navigate('/user-profile');
    };
  
    const handleEditClick = () => {
      const initialEditedNames = {};
      fetchedData.forEach((highSchool) => {
        initialEditedNames[highSchool.highSchoolId] = highSchool.highSchoolName;
      });
      setEditedNames(initialEditedNames);
      setEditing(true);
    };
    
  
    const handleDoneEditing = () => {
      setEditing(false);
    };


    const titleStyles = {
      marginTop: '20px',
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '20px',
    };

    const cardStyles = {
      marginTop: '20px',
      marginBottom: '10px'
    };

    const cardWrapperStyles = {
      marginBottom: '10px', // Set the bottom margin for consistent spacing
    };

    const navBarStyles = {
      backgroundColor: 'maroon',
      width: '100%',
      padding: '10px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    };

    const navLinkStyles = {
      color: 'white',
      margin: '0 80px',
      position: 'relative',
    };

    const roofStyles = {
      width: '100%',
      height: '20px',
      backgroundColor: 'maroon',
      position: 'relative',
      marginTop: '10px',
    };


    const roofSvg = (
    <svg width="1161" height="122" viewBox="0 0 1161 122" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_d_1_2)">
        <path d="M580.5 0L1156.84 114H4.1601L580.5 0Z" fill="#800000" />
        <path d="M9.26467 113.5L580.5 0.509692L1151.74 113.5H9.26467Z" stroke="black" />
        <path d="M9.26467 113.5L580.5 0.509692L1151.74 113.5H9.26467Z" stroke="black" strokeOpacity="0.2" />
        <path d="M9.26467 113.5L580.5 0.509692L1151.74 113.5H9.26467Z" stroke="black" strokeOpacity="0.2" />
        <path d="M9.26467 113.5L580.5 0.509692L1151.74 113.5H9.26467Z" stroke="black" strokeOpacity="0.2" />
      </g>
      <defs>
        <filter
          id="filter0_d_1_2"
          x="0.160095"
          y="0"
          width="1160.68"
          height="122"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_2" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_2" result="shape" />
        </filter>
      </defs>
    </svg>
  );

    

    const roofTitleStyles = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      color: 'white',
      fontSize: '18px',
      fontWeight: 'bold',
    };

    const roofContainerStyles = {
      marginTop: '20px',
      position: 'relative',
      width: '100%',
      backgroundColor: 'white',
      textAlign: 'center', // Center the content
    };

    const navLinks = [
      { label: 'Home', href: '/menu', id: 'home' },
      { label: 'View Map', href: '/view-map', id: 'view-map' },
      { label: 'Building', href: '/building', id: 'building' },
      // Add more navigation links as needed
    ];

    return (
      <div style={pageStyles}>
        {/* Navigation Bar */}
        <div style={navBarStyles}>
          <div
            style={{
              color: 'white',
              marginLeft: '10px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
            }}
            onClick={() => {
              setActiveLink('view-map');
              navigate('/view-map');
            }}
          >
            {/* Your logo or icon */}
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 56 54" fill="none">
              <path
                d="M2.91855 24.6698L53.7146 2.74497L28.2999 51.8879L23.7747 30.6645L2.91855 24.6698Z"
                stroke="white"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span style={{ width: '1px', height: '35px', backgroundColor: 'white', margin: '0 5px' }}></span>
            <span>CIT NaviGO</span>
          </div>
          <div>
            {navLinks.map((link) => (
              <Link
                key={link.id}
                to={link.href}
                style={{
                  ...navLinkStyles,
                  color: activeLink === link.id ? 'white' : 'white',
                }}
                onClick={() => setActiveLink(link.id)}
              >
                {link.label}
                {link.id === 'view-map' && (
                  <div
                    style={{
                      content: '""',
                      height: '2px',
                      width: '100%',
                      backgroundColor: 'white',
                      position: 'absolute',
                      bottom: '-4px',
                      left: 0,
                      display: activeLink === link.id ? 'block' : 'none',
                      transition: '0.3s',
                    }}
                  ></div>
                )}
              </Link>
            ))}
          </div>

          {/* Dropdown Button */}
          <Dropdown>
            <Dropdown.Toggle variant="link" id="dropdown-basic" style={{ color: 'white', marginLeft: '10px' }}>
              <img src="/images/Avatar.png" alt="Your Image" width="32" height="32" className="rounded-circle" />
            </Dropdown.Toggle>

            <Dropdown.Menu>
            <Dropdown.Item onClick={handleProfileClick}>Profile</Dropdown.Item>
            <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        
        <div style={{ display: 'flex', margin: '20px', gap: '20px', justifyContent: 'flex-start' }}>
        <div>
          {isEditing ? null : (
            <button
              onClick={handleEditClick}
              style={{
                backgroundColor: 'maroon',
                color: 'white',
                padding: '10px',
                borderRadius: '5px',
                marginRight: '1100px',
              }}
            >
              Edit Room
            </button>
          )}
        </div>
        {isEditing ? (
          <div style={{ marginLeft: 'auto' }}>
            <button
              onClick={handleDoneEditing}
              style={{ backgroundColor: 'maroon', color: 'white', padding: '10px', borderRadius: '5px', marginLeft: '1100px' }}
            >
              Done Editing
            </button>
          </div>
        ) : null}
      </div>
      <div style={roofContainerStyles}>
        {roofSvg}
        <div style={roofTitleStyles}>HIGH SCHOOL BUILDING ROOMS</div>
      </div>
      {isEditing ? (
        <div style={{ margin: '20px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <button
            onClick={handleAddRoom}
            style={{ backgroundColor: 'green', color: 'white', padding: '10px', borderRadius: '5px' }}
          >
            Add Room
          </button>
        </div>
      ) : null}
       <div className="container">
        <div className="row">
          {fetchedData.map((highSchool) => (
            <div className="col-md-3" style={{ ...cardStyles }} key={highSchool.highSchoolId}>
              <div className="card text-black" style={{ backgroundColor: '#FFEBCD', ...cardStyles }}>
                <div className="card-header">Room Id: {highSchool.highSchoolId}</div>
                <div className="card-body" style={{ height: '90px', overflow: 'hidden' }}>
                  <h5 className="card-title">
                    {isEditing ? (
                      <input
                      type="text"
                      value={editedNames[highSchool.highSchoolId] || ''}
                      onChange={(e) => setEditedNames({ ...editedNames, [highSchool.highSchoolId]: e.target.value })}
                      placeholder="Room Name"
                    />
                    ) : (
                      highSchool.highSchoolName
                    )}
                  </h5>
                </div>
                {isEditing && (
                  <div className="card-footer" style={{ display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
                    <button
                      onClick={() => openModal(highSchool.highSchoolId)} // Open the modal with the current room ID
                      style={{ backgroundColor: 'blue', color: 'white', padding: '5px', borderRadius: '5px' }}
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDeleteRoom(highSchool.highSchoolId)}
                      style={{ backgroundColor: 'red', color: 'white', padding: '5px', borderRadius: '5px' }}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for updating room */}
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Update Room</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            value={editedNames[currentRoomId] || ''}
            onChange={(e) => setEditedNames({ ...editedNames, [currentRoomId]: e.target.value })}
            placeholder="Room Name"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default HighSchoolBuilding;