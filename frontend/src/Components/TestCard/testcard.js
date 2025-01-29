import React from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./testcard.css";
// import { AiOutlineEdit } from 'react-icons/ai'

const TestCard = ({ test, role }) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [updatedTest, setUpdatedTest] = React.useState(test);

  const navigate = useNavigate(); // Initialize navigate

  const getTestStatus = () => {
    const currentDate = new Date();

    const testDate = new Date(test.testDate);
    testDate.setHours(testDate.getHours() - 5);
    testDate.setMinutes(testDate.getMinutes() - 30);

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

  const handleDeleteTest = async (testId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this test?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `http://localhost:5000/api/tests/delete/${testId}`,
        {
          headers: {
            Authorization: `${token}`,
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

  const handleAttemptTest = () => {
    navigate(`/testInstructions/${test._id}`);
  };

  return (
    <div className="card max-w-sm w-full bg-white shadow-xl rounded-lg p-6 mb-6 hover:shadow-2xl transition-all">
      <div className="card-header text-2xl font-semibold text-gray-800 mb-3">{test.name}</div>
      <div className="card-body">
        <p className="text-base text-gray-600 mb-2">{test.description}</p>
        <p className="text-sm text-gray-500">Test Date: {formattedDate}</p>
        <p className="text-sm text-gray-500">Test Time: {formattedTime}</p>
        <p className="text-sm text-gray-500">Total Time of Test: {test.duration} minutes</p>

        <Link to={`/random`} className="inline-block mt-4 text-white bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg shadow-md">
          Analysis
        </Link>

        <div className="status-tag-container mt-3">
          <span
            className={`status-tag ${
              testStatus === "Upcoming"
                ? "bg-green-500"
                : testStatus === "Ongoing"
                ? "bg-yellow-500"
                : "bg-red-500"
            } text-white rounded-lg px-3 py-1 text-xs`}
          >
            {testStatus}
          </span>
        </div>

        {isEditing ? (
          <div className="edit-form mt-4 space-y-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Test Name:
              <input
                type="text"
                value={updatedTest.name}
                onChange={(e) => setUpdatedTest({ ...updatedTest, name: e.target.value })}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </label>

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description:
              <textarea
                value={updatedTest.description}
                onChange={(e) => setUpdatedTest({ ...updatedTest, description: e.target.value })}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </label>

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Duration:
              <input
                type="number"
                value={updatedTest.duration}
                onChange={(e) => setUpdatedTest({ ...updatedTest, duration: e.target.value })}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </label>

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Test Date:
              <input
                type="datetime-local"
                value={new Date(updatedTest.testDate).toISOString().slice(0, 16)}
                onChange={(e) => {
                  const newDate = new Date(e.target.value);
                  newDate.setHours(newDate.getHours() + 5);
                  newDate.setMinutes(newDate.getMinutes() + 30);
                  setUpdatedTest({ ...updatedTest, testDate: newDate.toISOString() });
                }}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </label>

            <button
              className="btn bg-blue-500 w-full py-2 text-white rounded-md mt-4 hover:bg-blue-600"
              onClick={handleTestUpdate}
            >
              Save Changes
            </button>
            <button
              className="btn bg-gray-500 w-full py-2 text-white rounded-md mt-2 hover:bg-gray-600"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </div>
        ) : (
          <>
            {role === "student" && testStatus === "Ongoing" ? (
              <button
                className="btn bg-blue-600 w-full py-2 text-white rounded-md mt-4 hover:bg-blue-700"
                onClick={handleAttemptTest}
              >
                Attempt Test
              </button>
            ) : role === "admin" ? (
              <div className="admin-btn-group mt-4 space-y-4">
                <button
                  className="btn bg-yellow-500 w-full py-2 text-white rounded-md hover:bg-yellow-600"
                  onClick={() => setIsEditing(true)}
                >
                  Edit Test
                </button>
                <button
                  className="btn bg-red-500 w-full py-2 text-white rounded-md hover:bg-red-600"
                  onClick={() => handleDeleteTest(test._id)}
                >
                  Delete Test
                </button>
                <Link
                  to={`/questionForm/${test._id}`}
                  className="btn bg-green-500 w-full py-2 text-white rounded-md hover:bg-green-600"
                >
                  Add Questions
                </Link>
                <Link
                  to={`/Adminviewtest/${test._id}`}
                  className="btn bg-indigo-300 w-full py-2 text-white rounded-md hover:bg-indigo-600"
                >
                  View All Questions
                </Link>
              </div>
            ) : null}
          </>
        )}
      </div>
    </div>
  );
};

export default TestCard;
