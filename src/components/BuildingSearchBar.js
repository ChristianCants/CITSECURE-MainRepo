import React, { useState, useEffect } from "react";
import axios from "axios";
import "./BuildingSearchbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
 // Import the CSS file with styles

function BuildingSearchBar() {
  const [data, setData] = useState([]);
  const [building, setBuilding] = useState(data);

  useEffect(() => {
    axios
      .get("http://localhost:8080/building/getAllBuilding")
      .then((res) => {
        setData(res.data);
        setBuilding(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const Filter = (event) => {
    setBuilding(
      data.filter(
        (f) =>
          f.buildingname &&
          f.buildingname.toLowerCase().includes(event.target.value)
      )
    );
  };

  return (
    <div>
      <div className="building-search-container input">
        <div className="input-wrapper">
          <input
            type="text"
            className="building-search-input Search"
            onChange={Filter}
            placeholder="Search Building"
          />
           <FontAwesomeIcon
            icon={faSearch}
            className="search-icon"
            style={{ color: "maroon", marginLeft: "5px" }}
          />
        </div>
      </div>
      <table className="building-table">
        <thead>
          <tr>
            <th>Building Name</th>
            <th>Department Name1</th>
            <th>Department Name2</th>
          </tr>
        </thead>
        <tbody>
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
  );
}

export default BuildingSearchBar;
