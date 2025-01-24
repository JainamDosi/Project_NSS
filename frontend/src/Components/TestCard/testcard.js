import React from "react";
import axios from "axios";
import "./testcard.css";

const TestCard = ({ test, role }) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [updatedTest, setUpdatedTest] = React.useState(test);

  // Function to determine the test status (Upcoming, Ongoing, Completed)
  const getTestStatus = () => {
    const currentDate = new Date();

    // Adjust testDate by subtracting 5 hours and 30 minutes
    const testDate = new Date(test.testDate);
    testDate.setHours(testDate.getHours() - 5);
    testDate.setMinutes(testDate.getMinutes() - 30);

    // Adjust testEndTime by subtracting 5 hours and 30 minutes
    const testEndTime = new Date(test.testDate);
    testEndTime.setMinutes(testEndTime.getMinutes() + test.duration);
    testEndTime.setHours(testEndTime.getHours() - 5);
    testEndTime.setMinutes(testEndTime.getMinutes() - 30);

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
    date.setHours(date.getHours() - 5);
    date.setMinutes(date.getMinutes() - 30);

    const options = { year: "numeric", month: "long", day: "numeric" };
    const timeOptions = { hour: "2-digit", minute: "2-digit", hour12: true };

    const formattedDate = date.toLocaleDateString(undefined, options);
    const formattedTime = date.toLocaleTimeString(undefined, timeOptions);

    return { formattedDate, formattedTime };
  };

  const { formattedDate, formattedTime } = formatDateAndTime(test.testDate);

  // Function to handle test deletion
  const handleDeleteTest = async (testId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this test?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `http://localhost:5000/api/tests/delete/${testId}`,
        {
          headers: {
            Authorization: `${token}`, // Include token in Authorization header
          },
        }
      );

      if (response.status === 200) {
        alert("Test deleted successfully!");
        window.location.reload();
      } else {
        alert(`Error deleting test: ${response.data.message}`);
      }
    } catch (error) {
      console.error("Error deleting test:", error);
      alert("An error occurred while deleting the test.");
    }
  };

  // Handle "Edit Test" click
  const handleEditClick = () => {
    setIsEditing(true);
  };

  // Handle the test update
  const handleTestUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.patch(
        `http://localhost:5000/api/tests/${test._id}/edit`,
        updatedTest,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      if (response.status === 200) {
        alert("Test updated successfully!");
        setIsEditing(false);
        window.location.reload();
      } else {
        alert(`Error updating test: ${response.data.message}`);
      }
    } catch (error) {
      console.error("Error updating test:", error);
      alert("An error occurred while updating the test.");
    }
  };

  return (
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
              testStatus === "Upcoming"
                ? "bg-green-500"
                : testStatus === "Ongoing"
                ? "bg-yellow-500"
                : "bg-red-500"
            } rounded-lg p-1`}
          >
            {testStatus}
          </span>
        </div>

        {isEditing ? (
          <div className="edit-form">
            <label>
              Test Name:
              <input
                type="text"
                value={updatedTest.name}
                onChange={(e) => setUpdatedTest({ ...updatedTest, name: e.target.value })}
              />
            </label>
            <label>
              Description:
              <textarea
                value={updatedTest.description}
                onChange={(e) => setUpdatedTest({ ...updatedTest, description: e.target.value })}
              />
            </label>
            <label>
              Duration:
              <input
                type="number"
                value={updatedTest.duration}
                onChange={(e) => setUpdatedTest({ ...updatedTest, duration: e.target.value })}
              />
            </label>
            <label>
              Test Date:
              <input
                type="datetime-local"
                value={new Date(updatedTest.testDate).toISOString().slice(0, 16)}
                onChange={(e) =>
                  setUpdatedTest({ ...updatedTest, testDate: new Date(e.target.value).toISOString() })
                }
              />
            </label>
            <button className="btn bg-blue-500" onClick={handleTestUpdate}>
              Save Changes
            </button>
            <button className="btn bg-gray-500" onClick={() => setIsEditing(false)}>
              Cancel
            </button>
          </div>
        ) : (
          <>
            {role === "student" && testStatus === "Ongoing" ? (
              <button className="btn bg-slate-500 rounded-md">Attempt Test</button>
            ) : role === "admin" ? (
              <div className="admin-btn-group">
                <button className="btn bg-blue-500 rounded-md" onClick={handleEditClick}>
                  Edit Test
                </button>
                <button
                  className="btn bg-red-500 rounded-md"
                  onClick={() => handleDeleteTest(test._id)}
                >
                  Delete Test
                </button>
                <button className="btn bg-green-500 rounded-md">
                  Add Questions
                </button>
              </div>
            ) : null}
          </>
        )}
      </div>
    </div>
  );
};

export default TestCard;
