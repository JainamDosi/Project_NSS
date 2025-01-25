import { React, useState, useEffect } from "react";
import "./adminDash.css";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/navbar";
import TestCard from "../TestCard/testcard";
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import axios from "axios";

const AdminDashboard = () => {
  const [tests, setTests] = useState([]);

  const navigate = useNavigate(); // Initialize useNavigate
   
  
  useEffect(() => {
    const checkAuthentication = () => {
      const userInfo = localStorage.getItem("userInfo");

      if (!userInfo) {
        navigate("/login"); // Redirect to login if userInfo is not found
        return;
      }

      const User = JSON.parse(userInfo);
     
      // Check if the role is "Admin"
      if (User.user.role !== "Admin") {
        console.log("not admin") // Redirect to a 403 Forbidden page if not admin
      }
    };

    checkAuthentication();
  }, [navigate]);


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
      <div className="bg-gray-800">
        <Navbar />
      </div>
      <div id="btnsInDashBoard" className="flex justify-center mt-8">
        <Link to="/formByAdmin">
          <button className="Analysis bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-300">
            Create Test
          </button>
        </Link>
      </div>

      <h1 className="text-4xl text-center font-semibold my-8 text-gray-700">Ongoing Tests</h1>
      <main className="mainAdminDashboard container mx-auto flex flex-wrap justify-start gap-6">
        <div>
          {categorizedTests.ongoing.length > 0 ? (
            categorizedTests.ongoing.map((test) => (
              <TestCard key={test.id} test={test} role="admin" />
            ))
          ) : (
            <p className="text-center text-gray-500">No ongoing tests available.</p>
          )}
        </div>
      </main>

      <h1 className="text-4xl text-center font-semibold my-8 text-gray-700">Upcoming Tests</h1>
      <main className="mainAdminDashboard container mx-auto flex flex-wrap justify-start gap-6">
        <div>
          {categorizedTests.upcoming.length > 0 ? (
            categorizedTests.upcoming.map((test) => (
              <TestCard key={test.id} test={test} role="admin" />
            ))
          ) : (
            <p className="text-center text-gray-500">No upcoming tests available.</p>
          )}
        </div>
      </main>

      <h1 className="text-4xl text-center font-semibold my-8 text-gray-700">Completed Tests</h1>
      <main className="mainAdminDashboard container mx-auto flex flex-wrap justify-start gap-6">
        <div>
          {categorizedTests.completed.length > 0 ? (
            categorizedTests.completed.map((test) => (
              <TestCard key={test.id} test={test} role="admin" />
            ))
          ) : (
            <p className="text-center text-gray-500">No completed tests available.</p>
          )}
        </div>
      </main>
    </>
  );
};

export default AdminDashboard;
