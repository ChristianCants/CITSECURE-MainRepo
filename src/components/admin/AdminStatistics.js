import React, { Component } from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { isWithinInterval, parse } from 'date-fns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

Chart.register(...registerables);

class AdminStatistics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: JSON.parse(localStorage.getItem('visitorData')) || [],
      filteredData: [],
      fromDate: null,
      toDate: null,
      filterBuilding: '',
      filterMonth: '',
    };
  }

  componentDidMount() {
    this.filterData();
  }

  handleLogout = () => {
    localStorage.removeItem('uname');
    localStorage.removeItem('password');
    this.props.navigate('/AdminLogin');
  };

  handleFilterChange = (event) => {
    this.setState({ [event.target.name]: event.target.value }, this.filterData);
  };

  handleDateChange = (date, name) => {
    this.setState({ [name]: date }, this.filterData);
  };

  clearFilters = () => {
    this.setState(
      {
        fromDate: null,
        toDate: null,
        filterBuilding: '',
        filterMonth: '',
      },
      this.filterData
    );
  };

  filterData = () => {
    const { data, fromDate, toDate, filterBuilding, filterMonth } = this.state;

    let filteredData = data;

    // Filter by date range if dates are provided
    if (fromDate && toDate) {
      filteredData = filteredData.filter((item) => {
        if (!item.date || typeof item.date !== 'string') {
          return false;
        }

        const parsedDate = parse(item.date, 'dd/MM/yyyy', new Date());

        return isWithinInterval(parsedDate, { start: fromDate, end: toDate });
      });
    }

    // Filter by building
    if (filterBuilding) {
      filteredData = filteredData.filter((item) => item.buildingToVisit === filterBuilding);
    }

    // Filter by specific month
    if (filterMonth) {
      filteredData = filteredData.filter((item) => {
        if (!item.date || typeof item.date !== 'string') {
          return false;
        }

        const parsedDate = parse(item.date, 'dd/MM/yyyy', new Date());
        const month = parsedDate.getMonth() + 1;

        return String(month).padStart(2, '0') === filterMonth;
      });
    }

    this.setState({ filteredData });
  };

  getBuildingData = () => {
    const { filteredData } = this.state;

    const buildingCounts = filteredData.reduce((acc, item) => {
      acc[item.buildingToVisit] = (acc[item.buildingToVisit] || 0) + 1;
      return acc;
    }, {});

    return {
      labels: Object.keys(buildingCounts),
      datasets: [
        {
          label: 'Number of Visits',
          data: Object.values(buildingCounts),
          backgroundColor: 'rgba(75,192,192,0.2)',
          borderColor: 'rgba(75,192,192,1)',
          borderWidth: 2,
        },
      ],
    };
  };

  render() {
    const { filterBuilding, filterMonth, fromDate, toDate } = this.state;
    const chartData = this.getBuildingData();

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            font: {
              weight: 'bold',
            },
            color: '#000000',
          },
        },
      },
      scales: {
        x: {
          grid: {
            color: 'rgba(0, 0, 0, 0.1)',
            lineWidth: 1,
          },
          ticks: {
            font: {
              weight: 'bold',
            },
            color: '#000000',
          },
          title: {
            display: true,
            text: 'Building',
            font: {
              weight: 'bold',
            },
            color: '#000000',
          },
        },
        y: {
          grid: {
            color: 'rgba(0, 0, 0, 0.8)',
            lineWidth: 1.5,
          },
          ticks: {
            font: {
              weight: 'bold',
            },
            color: '#000000',
          },
          title: {
            display: true,
            text: 'Number of Visits',
            font: {
              weight: 'bold',
            },
            color: '#000000',
          },
        },
      },
    };

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
            <img src="/images/CITSecure LOGO.png" alt="CITSecure Logo" width="67" height="60" />
            <span
              style={{ width: '2.5px', height: '40px', backgroundColor: 'white', margin: '0 5px' }}
            ></span>
            <span>CITSecure</span>
          </div>
          <ul
            className="nav nav-pills d-flex justify-content-center"
            style={{ margin: 0, padding: 0, flexGrow: 1 }}
          >
            <li className="nav-item">
              <span
                className="nav-link"
                style={{ color: 'white', fontSize: '40px', fontWeight: 'bold' }}
              >
                Admin Statistics
              </span>
            </li>
          </ul>
          <Button
            onClick={this.handleLogout}
            style={{
              color: 'white',
              backgroundColor: 'transparent',
              border: '1px solid white',
              marginLeft: '10px',
            }}
          >
            Logout
          </Button>
        </header>
        <Container style={{ marginBottom: '20px' }}>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>From Date:</Form.Label>
                <div>
                  <DatePicker
                    selected={fromDate}
                    onChange={(date) => this.handleDateChange(date, 'fromDate')}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="dd/MM/yyyy"
                    className="form-control"
                  />
                </div>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>To Date:</Form.Label>
                <div>
                  <DatePicker
                    selected={toDate}
                    onChange={(date) => this.handleDateChange(date, 'toDate')}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="dd/MM/yyyy"
                    className="form-control"
                  />
                </div>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Building:</Form.Label>
                <Form.Control as="select" name="filterBuilding" value={filterBuilding} onChange={this.handleFilterChange}>
                  <option value="">Select Buildings</option>
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
            <Col>
              <Form.Group>
                <Form.Label>Month:</Form.Label>
                <Form.Control as="select" name="filterMonth" value={filterMonth} onChange={this.handleFilterChange}>
                  <option value="">Select Month</option>
                  <option value="01">January</option>
                  <option value="02">February</option>
                  <option value="03">March</option>
                  <option value="04">April</option>
                  <option value="05">May</option>
                  <option value="06">June</option>
                  <option value="07">July</option>
                  <option value="08">August</option>
                  <option value="09">September</option>
                  <option value="10">October</option>
                  <option value="11">November</option>
                  <option value="12">December</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Button onClick={this.clearFilters} variant="danger" className="mt-2">Clear Filters</Button>
        </Container>
        <Container style={{ height: '500px', marginBottom: '20px' }}>
          <Bar data={chartData} options={chartOptions} />
        </Container>
      </div>
    );
  }
}

const AdminStatisticsWithNavigate = () => {
  const navigate = useNavigate();
  return <AdminStatistics navigate={navigate} />;
};

export default AdminStatisticsWithNavigate;
