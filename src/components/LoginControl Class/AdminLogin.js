import React, { Component } from 'react';

class AdminLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      adminUsername: 'Admin',
      adminPassword: '1234',
      inputUsername: '',
      inputPassword: ''
    };
  }

  handleAdminLogin = async (e) => {
    e.preventDefault();

    const { adminUsername, adminPassword, inputUsername, inputPassword } = this.state;

    try {
      if (inputUsername === adminUsername && inputPassword === adminPassword) {
        localStorage.setItem('uname', adminUsername);
        localStorage.setItem('password', adminPassword);
        window.location.href = '/admin/adminpage';
      } else {
        alert('Invalid admin credentials');
      }
    } catch (error) {
      console.error('Login failed:', error.message);
      alert('Login failed. Please check the console for details.');
    }
  };

  render() {
    const { inputUsername, inputPassword } = this.state;

    return (
      <div className="container-fluid" style={{ backgroundImage: 'url("images/TIME OUT.png")', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', height: '100vh', overflow: 'hidden' }}>
        <div className="row justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
          <div className="col-lg-6">
            <div className="card bg-glass" style={{ border: '3px solid maroon', borderRadius: '8px', padding: '60px', backgroundColor: '#FFF9EB', width: '400px', margin: 'auto', marginTop: '50px', textAlign: 'center' }}>
              <div className="card-body">
                <h2 className="text-center mb-4" style={{ color: 'maroon', fontWeight: 'bold', marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '50px' }}>Admin Login</h2>
                <form onSubmit={this.handleAdminLogin}>
                  <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '15px', textAlign: 'left' }}>
                    <label htmlFor="adminUsername" style={{ color: 'maroon', fontWeight: 'bold', marginBottom: '5px' }}>Username</label>
                    <input
                      type="text"
                      id="adminUsername"
                      className="form-control"
                      style={{ borderColor: 'maroon', borderRadius: '10px', padding: '10px', width: '100%', marginTop: '10px' }}
                      placeholder="Enter your username"
                      value={inputUsername}
                      onChange={(e) => this.setState({ inputUsername: e.target.value })}
                      required
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '15px', textAlign: 'left' }}>
                    <label htmlFor="adminPassword" style={{ color: 'maroon', fontWeight: 'bold', marginBottom: '5px' }}>Password</label>
                    <input
                      type="password"
                      id="adminPassword"
                      className="form-control"
                      style={{ borderColor: 'maroon', borderRadius: '10px', padding: '10px', width: '100%', marginTop: '10px' }}
                      placeholder="Enter your password"
                      value={inputPassword}
                      onChange={(e) => this.setState({ inputPassword: e.target.value })}
                      required
                    />
                  </div>

                  <div style={{ marginTop: '20px' }}>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      style={{ backgroundColor: '#A43F3F', color: '#FFFFFF', border: 'none', borderRadius: '5px', padding: '10px', cursor: 'pointer', width: '100%', marginTop: '30px' }}
                    >
                      Login
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminLogin;
