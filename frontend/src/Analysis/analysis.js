import React, { useEffect, useState } from "react";
import axios from "axios";

const TestResponseDetails = ({ testID, userID }) => {
  const [testResponse, setTestResponse] = useState(null); // State to store test response
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    // Function to fetch test response
    const fetchTestResponse = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:5000/api/test_analyze/test-responses/678b73f0c374a35e3f653162/678a91be5ebfabc8cc08ccd4`
        ); // Call the backend API
        setTestResponse(response.data);
        console.log(response.data); // Set the response data
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    };

    fetchTestResponse();
  }, [testID, userID]);

  if (loading) return <p>Loading...</p>; // Show loading spinner or message
  if (error) return <p>Error: {error}</p>; // Show error message

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Test Response Details</h1>
      {testResponse?.responses?.map((response, index) => (
        <div
          key={response.questionId._id}
          className="border p-4 mb-4 rounded-lg shadow-sm"
        >
          <h2 className="text-lg font-semibold mb-2">
            Question {index + 1}: {response.questionId.questionText}
          </h2>
          <ul className="list-disc pl-5 mb-2">
            {response.questionId.options.map((option, idx) => (
              <li
                key={idx}
                className={`${
                  option === response.InputAnswer
                    ? "text-blue-500 font-semibold"
                    : ""
                }`}
              >
                {option}
              </li>
            ))}
          </ul>
          <p className="mb-1">
            <strong>Marked Answer:</strong> {response.InputAnswer || "Not answered"}
          </p>
          <p>
            <strong>Correct Answer:</strong> {response.questionId.correctAnswer}
          </p>
        </div>
      ))}
    </div>
  );
};

export default TestResponseDetails;
