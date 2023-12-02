import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import "./SearchBar.css";

function BuildingSearchBar() {
  const [data, setData] = useState([]);
  const [building, setBuilding] = useState(data);

  useEffect(() => {
    axios.get("http://localhost:8080/building/getAllBuilding")
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  }, []);

  const Filter = (event) => {
    const inputValue = event.target.value.toLowerCase();
  
    setBuilding(data.filter(f =>
      f.buildingname && f.buildingname.toLowerCase().includes(inputValue)
    ));
  }

  return (
      <div className="bg-maroon shadow border">
        <input type="text" className="form-control" onChange={Filter} />
        <table className="table">
          <thead>
            <tr>
              <th>Building name</th>
              <th>Department name1</th>
              <th>Department name2</th>
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
  )
}

export default BuildingSearchBar;
