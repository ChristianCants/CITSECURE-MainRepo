import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import "./BuildingSearchbar.css";
 
// Define a functional component named BuildingSearchBar
function BuildingSearchBar() {
  // State variables to hold the data and filtered building information
  const [data, setData] = useState([]);
  const [building, setBuilding] = useState(data);
 
  // useEffect hook to fetch data from the server
  useEffect(() => {
    //GET request to fetch building data from the specified endpoint
    axios.get("http://localhost:8080/building/getAllBuilding")
      .then(res => {
        // Update both data and building state variables with the fetched data
        setData(res.data);
        setBuilding(res.data);
      })
      .catch(err => console.log(err));
  }, []);
 
  // Event handler function to filter buildings based on user input
  const Filter = (event) => {
    // Update the building state based on the user's input
    setBuilding(data.filter(f => f.buildingname && f.buildingname.toLowerCase().includes(event.target.value)))
  }
 
  // Render the component
  return (
    <div>
      <div className="input">
        {/* Input field for searching buildings with an onChange event that triggers the Filter function */}
        <input type="text" className="Search" onChange={Filter} placeholder="Search Building" />
        {/* Table to display building information */}
        <table className="table">
          <thead>
            <tr>
              {/* Table header columns */}
              <th>Building Name</th>
              <th>Department Name1</th>
              <th>Department Name2</th>
            </tr>
          </thead>
          <tbody>
            {/* Map over the filtered building data and render table rows */}
            {building.map((d, i) => (
              <tr key={i}>
                <td>{d.buildingname}</td>
                <td>{d.departmentname1}</td>
                <td>{d.departmentname2}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
 
export default BuildingSearchBar;