import React from "react";
import "./testcard.css";

const TestCard = ({ test, role }) => {
  // Function to determine the test status (Upcoming, Ongoing, Completed)
  const getTestStatus = () => {
    console.log(test.name);
    const currentDate = new Date();
    
  
    // Adjust testDate by subtracting 5 hours and 30 minutes
    const testDate = new Date(test.testDate);
    testDate.setHours(testDate.getHours() - 5); // Subtract 5 hours
    testDate.setMinutes(testDate.getMinutes() - 30); // Subtract 30 minutes
     // Log adjusted testDate
  
    // Adjust testEndTime by subtracting 5 hours and 30 minutes
    const testEndTime = new Date(test.testDate);
    testEndTime.setMinutes(testEndTime.getMinutes() + test.duration);
    testEndTime.setHours(testEndTime.getHours() - 5); // Subtract 5 hours
    testEndTime.setMinutes(testEndTime.getMinutes() - 30); // Subtract 30 minutes
      // Log adjusted testEndTime
  
    if (currentDate < testDate) {
      return "Upcoming";
    } else if (currentDate >= testDate && currentDate <= testEndTime) {
      return "Ongoing";
    } else {
      return "Completed";
    }
  };
  

  const testStatus = getTestStatus();

  // Function to format the date and time
  const formatDateAndTime = (dateString) => {
    const date = new Date(dateString);
  
    // Subtract 5.5 hours to convert to IST (Indian Standard Time)
    date.setHours(date.getHours() - 5); // Subtract 5 hours
    date.setMinutes(date.getMinutes() - 30); // Subtract 30 minutes
  
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const timeOptions = { hour: '2-digit', minute: '2-digit', hour12: true };
    
    const formattedDate = date.toLocaleDateString(undefined, options);
    const formattedTime = date.toLocaleTimeString(undefined, timeOptions);
  
    return { formattedDate, formattedTime };
  };
  

  const { formattedDate, formattedTime } = formatDateAndTime(test.testDate);

  return (
    <>
      <div className="card">
        <div className="card-header">{test.name}</div>
        <div className="card-body">
          <p className="text-base">{test.description}</p>
          <p className="card-text">Test Date: {formattedDate}</p>
          <p className="card-text">Test Time: {formattedTime}</p>
          <p className="card-text">Total Time of Test: {test.duration} minutes</p>
          <div className="status-tag-container">
            <span
              className={`status-tag ${
                testStatus === "Upcoming" ? "bg-green-500" : testStatus === "Ongoing" ? "bg-yellow-500" : "bg-red-500"
              } rounded-lg p-1`}
            >
              {testStatus}
            </span>
          </div>
          {role === "student" && testStatus === "Ongoing" ? (
            <button className="btn bg-slate-500 rounded-md">Attempt Test</button>
          ) : role === "admin" ? (
            <button className="btn bg-blue-500 rounded-md">Edit Test</button>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default TestCard;
