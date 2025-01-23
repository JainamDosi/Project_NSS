import { React, useState, useEffect } from "react";
import "./adminDash.css";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/navbar";
import TestCard from "../TestCard/testcard";
import axios from "axios";

const AdminDashboard = () => {
  const [tests, setTests] = useState([]);

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

  // Function to determine the test status (Upcoming, Ongoing, Completed)
  const getTestStatus = (testDate, duration) => {
    const currentDate = new Date();
    console.log(currentDate);
  
    // Adjust testStartTime by subtracting 5 hours and 30 minutes
    const testStartTime = new Date(testDate);
    testStartTime.setHours(testStartTime.getHours() - 5); // Subtract 5 hours
    testStartTime.setMinutes(testStartTime.getMinutes() - 30); // Subtract 30 minutes
    console.log(testStartTime);
  
    // Adjust testEndTime by subtracting 5 hours and 30 minutes
    const testEndTime = new Date(testDate);
    testEndTime.setMinutes(testEndTime.getMinutes() + duration);
    testEndTime.setHours(testEndTime.getHours() - 5); // Subtract 5 hours
    testEndTime.setMinutes(testEndTime.getMinutes() - 30);
    console.log(testEndTime); 
  
    if (currentDate < testStartTime) {
      return "Upcoming";
    } else if (currentDate >= testStartTime && currentDate <= testEndTime) {
      return "Ongoing";
    } else {
      return "Completed";
    }
  };
  

  const categorizedTests = tests.reduce(
    (acc, test) => {
      console.log(test.name);
      const status = getTestStatus(test.testDate, test.duration);
      if (status === "Upcoming") acc.upcoming.push(test);
      if (status === "Ongoing") acc.ongoing.push(test);
      if (status === "Completed") acc.completed.push(test);
      return acc;
    },
    { upcoming: [], ongoing: [], completed: [] }
  );

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div id="btnsInDashBoard">
        <Link to="/formByAdmin">
          <button className="Analysis">Create Test</button>
        </Link>
      </div>

      <h1>Ongoing Tests</h1>
      <main className="mainAdminDashboard">
        <div>
          {categorizedTests.ongoing.length > 0 ? (
            categorizedTests.ongoing.map((test) => <TestCard key={test.id} test={test} role="admin" />)
          ) : (
            <p>No ongoing tests available.</p>
          )}
        </div>
      </main>

      <h1>Upcoming Tests</h1>
      <main className="mainAdminDashboard">
        <div>
          {categorizedTests.upcoming.length > 0 ? (
            categorizedTests.upcoming.map((test) => <TestCard key={test.id} test={test} role="admin" />)
          ) : (
            <p>No upcoming tests available.</p>
          )}
        </div>
      </main>

      <h1>Completed Tests</h1>
      <main className="mainAdminDashboard">
        <div>
          {categorizedTests.completed.length > 0 ? (
            categorizedTests.completed.map((test) => <TestCard key={test.id} test={test} role="admin" />)
          ) : (
            <p>No completed tests available.</p>
          )}
        </div>
      </main>
    </>
  );
};

export default AdminDashboard;
