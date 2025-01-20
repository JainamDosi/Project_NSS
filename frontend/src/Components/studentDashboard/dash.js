import React, { useState } from "react";
import "./dash.css";
import { Link } from "react-router-dom";
import TestCard from "../TestCard/testcard";
import Navbar from "../Navbar/navbar";

const StudentDashboard = () => {
  const [value, setValue] = useState(""); // State for dropdown value
  const options = [
    { label: "Completed Tests", value: 1 },
    { label: "Upcoming Tests", value: 2 },
    { label: "Ongoing Tests", value: 3 },
  ]; // Options array for dropdown

  const handleSelect = (event) => {
    setValue(event.target.value); // Update state with selected value
  };

  return (
    <>
      {/* Navbar ko stick krna hai top pr */}
      <div>
        <Navbar />
      </div>
      <div id="btnsInDashBoard">
        <select
          onChange={handleSelect}
          value={value}
          className="whichTestsYouWant"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <Link to="">
          <button className="Analysis">Analysis</button>
        </Link>
      </div>
      <main className="mainStudentDashboard">
        <div>
          <TestCard />
          
        </div>
      </main>
    </>
  );
};

export default StudentDashboard;
