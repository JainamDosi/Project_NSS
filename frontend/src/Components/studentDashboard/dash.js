import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TestCard from "../TestCard/testcard";
import Navbar from "../Navbar/navbar";
import axios from "axios";

const StudentDashboard = () => {
  const [tests, setTests] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State for search input

  let navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token") || localStorage.getItem("token") === undefined) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/tests", {
          headers: {
            Authorization: `${token}`,
          },
        });
        setTests(response.data);
      } catch (error) {
        console.error("There was an error fetching the test data!", error);
      }
    };

    fetchTests();
  }, []);

  const adjustForIST = (date) => {
    const adjustedDate = new Date(date);
    adjustedDate.setHours(adjustedDate.getHours() - 5);
    adjustedDate.setMinutes(adjustedDate.getMinutes() - 30);
    return adjustedDate;
  };

  const currentDate = new Date();

  // Filter tests based on search query
  const filteredTests = tests.filter((test) =>
    test.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const ongoingTests = filteredTests.filter((test) => {
    const testStartTime = adjustForIST(test.testDate);
    const testEndTime = new Date(testStartTime.getTime() + test.duration * 60 * 1000);
    return currentDate >= testStartTime && currentDate <= testEndTime;
  });

  const upcomingTests = filteredTests.filter((test) => adjustForIST(test.testDate) > currentDate);

  const completedTests = filteredTests.filter((test) => {
    const testStartTime = adjustForIST(test.testDate);
    const testEndTime = new Date(testStartTime.getTime() + test.duration * 60 * 1000);
    return currentDate > testEndTime;
  });

  return (
    <>
      <Navbar />

      <div className="flex w-full justify-center my-4">
        <input
          type="text"
          placeholder="Search for a test..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-1/2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <section className="container mx-auto px-4">
        <h1 className="text-2xl font-semibold text-gray-800 my-4">Ongoing Tests</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ongoingTests.length > 0 ? (
            ongoingTests.map((test) => <TestCard key={test.id} test={test} role="student" />)
          ) : (
            <p className="text-gray-500">No ongoing tests available.</p>
          )}
        </div>

        <h1 className="text-2xl font-semibold text-gray-800 my-4">Upcoming Tests</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {upcomingTests.length > 0 ? (
            upcomingTests.map((test) => <TestCard key={test.id} test={test} role="student" />)
          ) : (
            <p className="text-gray-500">No upcoming tests available.</p>
          )}
        </div>

        <h1 className="text-2xl font-semibold text-gray-800 my-4">Completed Tests</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {completedTests.length > 0 ? (
            completedTests.map((test) => <TestCard key={test.id} test={test} role="student" />)
          ) : (
            <p className="text-gray-500">No completed tests available.</p>
          )}
        </div>
      </section>
    </>
  );
};

export default StudentDashboard;
