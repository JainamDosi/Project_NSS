import {React, useState,useEffect } from "react";
import "./adminDash.css";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/navbar";
import TestCard from "../TestCard/testcard";
import axios from "axios";


const AdminDashboard = () => {
  const [tests, setTests] = useState([]);
  const [value, setValue] = useState(""); // State for dropdown value
  const options = [
    { label: "Completed Tests", value: 1 },
    { label: "Upcoming Tests", value: 2 },
    { label: "Ongoing Tests", value: 3 },
  ]; // Options array for dropdown

  const handleSelect = (event) => {
    setValue(event.target.value); // Update state with selected value
  };

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
  },[]);





  return (
    <>
      {/* Navbar ko stick krna hai top pr */}
      <div>
        <Navbar />
      </div>
      <div id="btnsInDashBoard">
        {/* <select
          onChange={handleSelect}
          value={value}
          className="whichTestsYouWant"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select> */}
        <Link to="/formByAdmin">
          <button className="Analysis">Create Test</button>
        </Link>
      </div>
      <main className="mainStudentDashboard">
        <div>
        {tests.map((test) => (
            <TestCard key={test.id} test={test} role="admin" />
          ))}
          
        </div>
      </main>
    </>
  );
};

export default AdminDashboard;
