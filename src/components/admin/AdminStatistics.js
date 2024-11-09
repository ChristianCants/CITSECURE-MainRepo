import React, { Component } from 'react';
import { Button, Form, Container, Row, Col, Dropdown } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { parse, format } from 'date-fns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Settings as SettingsIcon } from '@mui/icons-material';
import axios from 'axios'; // Import Axios

Chart.register(...registerables);

class AdminStatistics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [], // Initial state for visitor data
      filteredData: [],
      fromDate: null,
      toDate: null,
      filterBuilding: '',
      filterMonth: '',
    };
  }

  // Fetch data from the backend API every 5 seconds for real-time updates
  componentDidMount() {
    this.fetchData(); // Fetch the data initially
    this.dataInterval = setInterval(this.fetchData, 5000); // Fetch data every 5 seconds
  }

  componentWillUnmount() {
    clearInterval(this.dataInterval); // Clean up interval on unmount
  }

  fetchData = () => {
    axios
      .get('http://localhost:8080/visitor/getAllVisitors') // Replace with your backend endpoint
      .then((response) => {
        const allData = response.data;
        this.setState({ data: allData, filteredData: allData }, this.filterData); // Update state with fetched data
      })
      .catch((error) => {
        console.error('Error fetching visitor data:', error.message);
      });
  };

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
        if (!item.timeIn || typeof item.timeIn !== 'string') {
          return false;
        }

        const parsedDate = parse(item.timeIn, 'hh:mm a dd/MM/yyyy', new Date());

        // Check if the parsed date is within the selected date range
        return parsedDate >= fromDate && parsedDate <= toDate;
      });
    }

    // Filter by building
    if (filterBuilding) {
      filteredData = filteredData.filter((item) => item.buildingToVisit === filterBuilding);
    }

    // Filter by specific month, but skip if "All months" is selected
    if (filterMonth && filterMonth !== "all") {
      filteredData = filteredData.filter((item) => {
        if (!item.timeIn || typeof item.timeIn !== 'string') {
          return false;
        }

        const parsedDate = parse(item.timeIn, 'hh:mm a dd/MM/yyyy', new Date());
        const month = parsedDate.getMonth() + 1;

        return String(month).padStart(2, '0') === filterMonth;
      });
    }

    this.setState({ filteredData });
  };

  getTotalVisits = () => {
    const { filteredData } = this.state;
    return filteredData.length; // Return the total count of filtered data
  };

  getBuildingData = () => {
    const { filteredData } = this.state;
  
    const buildingCounts = filteredData.reduce((acc, item) => {
      acc[item.buildingToVisit] = (acc[item.buildingToVisit] || 0) + 1;
      return acc;
    }, {});
  
    // Array of colors for each building
    const colors = [
      'rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)',
      'rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)',
      'rgba(75, 192, 192, 0.6)', 'rgba(153, 102, 255, 0.6)'
    ];
  
    const borderColors = [
      'rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)',
      'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)',
      'rgba(255, 99, 132, 0.8)', 'rgba(54, 162, 235, 0.8)', 'rgba(255, 206, 86, 0.8)',
      'rgba(75, 192, 192, 0.8)', 'rgba(153, 102, 255, 0.8)'
    ];
  
    return {
      labels: Object.keys(buildingCounts),
      datasets: [
        {
          label: 'Number of Visits',
          data: Object.values(buildingCounts),
          backgroundColor: colors.slice(0, Object.keys(buildingCounts).length), // Assign unique colors
          borderColor: borderColors.slice(0, Object.keys(buildingCounts).length), // Assign unique border colors
          borderWidth: 2,
        },
      ],
    };
  };
  

  getMonthData = () => {
    const { filteredData, filterMonth } = this.state;

    if (filterMonth === "all") {
      const monthCounts = filteredData.reduce((acc, item) => {
        if (!item.timeIn || typeof item.timeIn !== 'string') {
          return acc;
        }

        const parsedDate = parse(item.timeIn, 'hh:mm a dd/MM/yyyy', new Date());
        const month = parsedDate.getMonth() + 1; // Get month number (1-12)
        const monthKey = String(month).padStart(2, '0'); // Format as '01', '02', etc.

        acc[monthKey] = (acc[monthKey] || 0) + 1; // Increment the count for the month
        return acc;
      }, {});

      return {
        labels: [
          'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
          'September', 'October', 'November', 'December'
        ],
        datasets: [
          {
            label: 'Monthly Visit Statistics',
            data: Array.from({ length: 12 }, (_, i) => monthCounts[String(i + 1).padStart(2, '0')] || 0), // Get count for each month
            backgroundColor: 'rgba(153,102,255,0.2)',
            borderColor: 'rgba(153,102,255,1)',
            borderWidth: 2,
          },
        ],
      };
    }

    // Existing logic for filtering by a single month
    const buildingCounts = filteredData.reduce((acc, item) => {
      acc[item.buildingToVisit] = (acc[item.buildingToVisit] || 0) + 1;
      return acc;
    }, {});

    return {
      labels: Object.keys(buildingCounts),
      datasets: [
        {
          label: `Number of Visits in the Month`,
          data: Object.values(buildingCounts),
          backgroundColor: 'rgba(153,102,255,0.2)',
          borderColor: 'rgba(153,102,255,1)',
          borderWidth: 2,
        },
      ],
    };
  };

  formatDateRange = () => {
    const { fromDate, toDate } = this.state;
    if (!fromDate || !toDate) return '';
    const from = format(fromDate, 'dd/MM/yyyy');
    const to = format(toDate, 'dd/MM/yyyy');
    return `Dates From: ${from} To: ${to}`;
  };

  exportPDF = () => {
    const input = document.getElementById('chart-content');

    html2canvas(input, {
      scale: 5, // Increase the scale to capture better resolution
      scrollY: 0,
      useCORS: true,
    })
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');

        const imgWidth = 210;
        const pageHeight = 295;
        let imgHeight = (canvas.height * imgWidth) / canvas.width;

        let heightLeft = imgHeight;
        let position = 0;

        // Add the first part of the image to the PDF
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        // Add more pages if content overflows
        while (heightLeft > 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        // Save the generated PDF
        pdf.save('AdminStatisticsCharts.pdf');
      })
      .catch((err) => {
        console.error('Error exporting to PDF:', err);
      });
  };

  render() {
    const { filterBuilding, filterMonth, fromDate, toDate } = this.state;
    const chartData = this.getBuildingData();
    const monthChartData = this.getMonthData();

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
      <div style={{ backgroundColor: '#FFF9EB', minHeight: '500vh' }}>
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
                Admin Statistics
              </span>
            </li>
          </ul>

          <Button
            variant="contained"
            startIcon={<ChevronLeftIcon />}
            onClick={() => window.location.href = '/admin/adminpage'} // Navigates to home page
            style={{
              position: 'absolute',
              top: '36px',
              right: '95px',
              backgroundColor: 'white',
              color: 'maroon',
            }}
          >
            Return
          </Button>

          <Dropdown align="end">
            <Dropdown.Toggle variant="secondary" id="dropdown-basic" style={{ backgroundColor: 'transparent', border: 'none' }}>
              <SettingsIcon style={{ color: 'white', fontSize: '40px' }} />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={this.exportPDF}>Export Data</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={this.handleLogout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
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
                  <option value="all">All Months</option>
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

                <div id="chart-content">
                <Container style={{ height: '500px', marginBottom: '20px', display: 'flex' }}>
  <div style={{ flex: 1 }}>
    <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>
      {this.formatDateRange()}
    </h3>
    <Bar data={chartData} options={chartOptions} />
  </div>

  {/* Right-aligned custom legend with title and bold font */}
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginLeft: '20px' }}>
    <h4 style={{ fontWeight: 'bold', marginBottom: '10px' }}>Legend</h4>
    {chartData.labels.map((label, index) => (
      <div key={label} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
        <span
          style={{
            display: 'inline-block',
            width: '15px',
            height: '15px',
            backgroundColor: chartData.datasets[0].backgroundColor[index],
            marginRight: '8px',
            border: '1px solid black',
            verticalAlign: 'middle',
          }}
        ></span>
        <span style={{ fontWeight: 'bold', fontSize: '14px', lineHeight: '15px', verticalAlign: 'middle' }}>
          {label}
        </span>
      </div>
    ))}
  </div>
</Container>




          {filterMonth && (
            <Container style={{ height: '500px', marginBottom: '20px' }}>
              <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>
                {filterMonth === "all" ? "Monthly Visit Statistics" : 
                  `Number of Visits in the Month of ${new Date(0, parseInt(filterMonth) - 1).toLocaleString('default', { month: 'long' })}`}
              </h3>

              {filterMonth !== "all" && (
                <h4 style={{ textAlign: 'center', color: 'black' }}>
                  Total Visits = {this.getTotalVisits()}
                </h4>
              )}

              <Bar data={monthChartData} options={chartOptions} />
            </Container>
          )}
        </div>
      </div>
    );
  }
}

export default AdminStatistics;
