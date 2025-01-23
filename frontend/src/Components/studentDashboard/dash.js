import { React, useState, useEffect } from "react";
import "./dash.css";
import { Link } from "react-router-dom";
import TestCard from "../TestCard/testcard";
import Navbar from "../Navbar/navbar";
import axios from "axios";

const StudentDashboard = () => {
  const [tests, setTests] = useState([]);
  const [value, setValue] = useState(""); // State for dropdown value
  const options = [
    { label: "Completed Tests", value: 1 },
    { label: "Upcoming Tests", value: 2 },
    { label: "Ongoing Tests", value: 3 },
  ]; // Options array for dropdown

  // Fetch tests with authorization token
  useEffect(() => {
    const fetchTests = async () => {
      try {
        // Retrieve token from localStorage
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/tests", {
          headers: {
            Authorization: `${token}`, // Include token in Authorization header
          },
        });
        setTests(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("There was an error fetching the test data!", error);
      }
    };

    fetchTests();
  }, []);

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
        <select onChange={handleSelect} value={value} className="border-4">
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
          {tests.map((test) => (
            <TestCard key={test.id} test={test} role="student"/>
          ))}
        </div>
      </main>
    </>
  );
};

export default StudentDashboard;