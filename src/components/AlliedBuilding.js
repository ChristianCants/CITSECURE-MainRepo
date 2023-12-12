// AlliedBuilding.js
import React from 'react';
import { Link } from 'react-router-dom';

const AlliedBuilding = () => {
  const containerStyle = {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const buttonStyle = {
    width: '400px',
    height: '70px',
    flexShrink: 0,
    borderRadius: '100px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'black',
    fontSize: '30px',
    marginTop: '50px',
  };

  const addRoomButtonStyle = {
    ...buttonStyle,
    background: '#FFF9EB',
    border: '2px solid black',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.5), 0 8px 16px rgba(0, 0, 0, 0.91)',
  };

  const viewRoomButtonStyle = {
    ...buttonStyle,
    background: '#FFF9EB',
    border: '2px solid black',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.5), 0 8px 16px rgba(0, 0, 0, 0.91)',
  };

  return (
    <div style={containerStyle}>
      <Link to="/add-room" className="btn btn-primary btn-lg rounded-pill mx-2" style={addRoomButtonStyle}>
        <span style={{ marginRight: '8px' }}>Add Room</span>
        <svg className="bi" width="24" height="24">
          <use xlinkHref="#plus-circle"></use>
        </svg>
      </Link>
      <Link to="/view-room" className="btn btn-outline-secondary btn-lg rounded-pill mx-2" style={viewRoomButtonStyle}>
        <span style={{ marginRight: '8px' }}>View Room</span>
      </Link>
    </div>
  );
};

export default AlliedBuilding;
