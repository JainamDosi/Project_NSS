import React from "react";
import "./testcard.css";

const TestCard = ({ test, role }) => {
  // Function to format the date and time
  const formatDateTime = (isoString) => {
    const testDate = new Date(isoString);

    // Format date to dd.mm.yyyy
    const day = String(testDate.getUTCDate()).padStart(2, "0");
    const month = String(testDate.getUTCMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const year = testDate.getUTCFullYear();
    const formattedDate = `${day}.${month}.${year}`;

    // Format time to hh:mm am/pm
    let hours = testDate.getUTCHours();
    const minutes = String(testDate.getUTCMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // Convert 0 or 12 to 12
    const formattedTime = `${hours}:${minutes} ${ampm}`;

    return { formattedDate, formattedTime };
  };

  // Check test status
  const getTestStatus = (isoString) => {
    const now = new Date();
    const testDate = new Date(isoString);

    if (testDate > now) return "Upcoming";
    if (testDate <= now) return "Expired";
    return null;
  };

  const { formattedDate, formattedTime } = formatDateTime(test.testDate);
  const testStatus = getTestStatus(test.testDate);

  return (
    <>
      <div className="card">
        <div className="card-header">{test.name}</div>
        <div className="card-body">
          <p className="text-base">{test.description}</p>
          <p className="card-text">Test Date: {formattedDate}</p>
          <p className="card-text">Total Time of Test: {test.duration} minutes</p>
          <p className="card-text">Test Time: {formattedTime}</p>
          <div className="status-tag-container">
            <span
              className={`status-tag ${
                testStatus === "Upcoming" ? "bg-green-500" : "bg-red-500"
              } rounded-lg p-1`}
            >
              {testStatus}
            </span>
          </div>
          {role === "student" && testStatus === "Upcoming" ? (
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
