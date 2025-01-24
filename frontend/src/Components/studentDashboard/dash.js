import { React, useState, useEffect } from "react";
import "./dash.css";
import { Link ,useNavigate} from "react-router-dom";
import TestCard from "../TestCard/testcard";
import Navbar from "../Navbar/navbar";
import axios from "axios";

const StudentDashboard = () => {
  const [tests, setTests] = useState([]);

  let navigate = useNavigate();
   
  useEffect(() => {
    if (!localStorage.getItem('token') || localStorage.getItem('token') === undefined) {
      navigate('/login');
    }
  }, [navigate]);


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

  // Adjust times for IST (subtract 5 hours 30 minutes)
  const adjustForIST = (date) => {
    const adjustedDate = new Date(date);
    adjustedDate.setHours(adjustedDate.getHours() - 5); // Subtract 5 hours
    adjustedDate.setMinutes(adjustedDate.getMinutes() - 30); // Subtract 30 minutes
    return adjustedDate;
  };

  // Categorize tests based on their test time and duration
  const currentDate = new Date();

  const ongoingTests = tests.filter((test) => {
    const testStartTime = adjustForIST(test.testDate);
    const testEndTime = new Date(testStartTime.getTime() + test.duration * 60 * 1000); // Adjust for duration
    return currentDate >= testStartTime && currentDate <= testEndTime;
  });

  const upcomingTests = tests.filter((test) => adjustForIST(test.testDate) > currentDate);
  const completedTests = tests.filter((test) => {
    const testStartTime = adjustForIST(test.testDate);
    const testEndTime = new Date(testStartTime.getTime() + test.duration * 60 * 1000); // Adjust for duration
    return currentDate > testEndTime;
  });

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div id="btnsInDashBoard">
        <Link to="">
          <button className="Analysis">Analysis</button>
        </Link>
      </div>

      <h1>Ongoing Tests</h1>
      <main className="mainStudentDashboard">
        <div>
          {ongoingTests.length > 0 ? (
            ongoingTests.map((test) => <TestCard key={test.id} test={test} role="student" />)
          ) : (
            <p>No ongoing tests available.</p>
          )}
        </div>
      </main>

      <h1>Upcoming Tests</h1>
      <main className="mainStudentDashboard">
        <div>
          {upcomingTests.length > 0 ? (
            upcomingTests.map((test) => <TestCard key={test.id} test={test} role="student" />)
          ) : (
            <p>No upcoming tests available.</p>
          )}
        </div>
      </main>

      <h1>Completed Tests</h1>
      <main className="mainStudentDashboard">
        <div>
          {completedTests.length > 0 ? (
            completedTests.map((test) => <TestCard key={test.id} test={test} role="student" />)
          ) : (
            <p>No completed tests available.</p>
          )}
        </div>
      </main>
    </>
  );
};

export default StudentDashboard;
