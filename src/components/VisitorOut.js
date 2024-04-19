import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const VisitorOut = () => {
  const [cardNo, setCardNo] = useState('');
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [ampm, setAmPm] = useState('AM'); // Default AM/PM is 'AM'
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const formattedTime = `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')} ${ampm}`;
      const response = await axios.post(
        `http://localhost:8080/admin/updateVisitorTimeOut/${cardNo}`,
        null,
        {
          params: {
            cardNo: cardNo,
            timeOut: formattedTime,
          },
        }
      );

      if (response.status === 200) {
        navigate('/menu');
      } else {
        setError('Submit failed. Please try again.');
      }
    } catch (error) {
      console.error('Submit failed:', error.message);
      setError('Submit failed. Please try again.');
    }
  };

  const backgroundImageStyle = {
    backgroundImage: 'url("images/TIME OUT.png")',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    height: '100vh',
    overflow: 'hidden',
  };

  const formStyle = {
    border: '3px solid #A43F3F',
    borderRadius: '8px',
    padding: '20px',
    backgroundColor: '#FFF9EB',
  };

  const inputStyle = {
    borderColor: '#A43F3F',
    borderRadius: '8px',
  };

  const dropdownStyle = {
    borderColor: '#A43F3F', // Border color for dropdown menu
    borderRadius: '8px',
    width: '80px',
    marginLeft: '10px', // Adjust the margin to move it a little bit to the right
  };

  const loginButtonStyle = {
    backgroundColor: '#A43F3F',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '5px',
    padding: '10px',
    cursor: 'pointer',
    marginBottom: '10px',
  };

  const titleStyle = {
    color: '#A43F3F',
    fontWeight: 'bold',
    marginBottom: '20px',
  };

  return (
    <section className="background-radial-gradient overflow-hidden" style={backgroundImageStyle}>
      <div className="container px-4 py-5 px-md-5 text-center text-lg-start my-5 d-flex justify-content-end align-items-center">
        <div className="col-lg-6 mb-5 mb-lg-0 position-relative">
          <div className="card bg-glass" style={formStyle}>
            <div className="card-body px-4 py-5 px-md-5">
              <form onSubmit={handleLogin}>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="formCardNo">
                    Enter Card No.
                  </label>
                  <input
                    type="number"
                    id="formCardNo"
                    className="form-control custom-input"
                    style={inputStyle}
                    value={cardNo}
                    onChange={(e) => setCardNo(e.target.value)}
                    required
                  />
                </div>

                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="timeIn">
                    Time Out
                  </label>
                  <input
                    type="time"
                    id="timeIn"
                    className="form-control custom-input"
                    style={inputStyle}
                    value={hours + ':' + minutes}
                    onChange={(e) => {
                      const [hour, minute] = e.target.value.split(':');
                      setHours(hour);
                      setMinutes(minute);
                    }}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-block mb-4"
                  style={loginButtonStyle}
                >
                  Submit
                </button>

                <div className="text-center">
                  {/* Remove the social media buttons */}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisitorOut;
