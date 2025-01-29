import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Navbar/navbar"; // Adjust the path as necessary
import { useParams } from "react-router-dom";

const TestResponseDetails = () => {
  const { testId,userId } = useParams();
  const [testResponse, setTestResponse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalMarks, setTotalMarks] = useState(0);
  const [negativeMarks, setNegativeMarks] = useState(0);
  const [unansweredCount, setUnansweredCount] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [subjectWiseMarks, setSubjectWiseMarks] = useState({
    Physics: { correct: 0, incorrect: 0, total: 0, timeSpent: 0 },
    Chemistry: { correct: 0, incorrect: 0, total: 0, timeSpent: 0 },
    Mathematics: { correct: 0, incorrect: 0, total: 0, timeSpent: 0 },
  });

  useEffect(() => {
    const fetchTestResponse = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:5000/api/test_analyze/test-responses/${testId}/${userId}`
        );
        setTestResponse(response.data);
        console.log(response.data);
        calculateMarks(response.data.responses);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    };

    fetchTestResponse();
  }, [testId, userId]);

  const calculateMarks = (responses) => {
    let total = 0;
    let negative = 0;
    let unanswered = 0;
    let answered = 0;
    let totalQues = responses.length;
    
    let subjectScores = {
      Physics: { correct: 0, incorrect: 0, total: 0, timeSpent: 0 },
      Chemistry: { correct: 0, incorrect: 0, total: 0, timeSpent: 0 },
      Mathematics: { correct: 0, incorrect: 0, total: 0, timeSpent: 0 },
    };
  
    responses.forEach((response) => {
      const { subject, correctAnswer, options, type } = response.questionId;
      const { InputAnswer, timeSpent } = response;
      let score = 0;
      let isNumerical = type==="Numerical"; // Check if it's a numerical-type question
  
      if (InputAnswer === correctAnswer) {
        score = 4;
        answered++;
      } else if (InputAnswer) {
        score = isNumerical ? 0 : -1; // Numerical questions have no negative marking
        if (!isNumerical) negative++;
        answered++;
      } else {
        unanswered++;
      }
  
      total += score;
  
      if (subjectScores[subject]) {
        if (score === 4) subjectScores[subject].correct += 1;
        if (score === -1) subjectScores[subject].incorrect += 1;
        subjectScores[subject].total += score;
        subjectScores[subject].timeSpent += !isNaN(Number(timeSpent)) ? Number(timeSpent) : 0;
      }
    });
  
    let acc = answered > 0
      ? ((subjectScores.Physics.correct + subjectScores.Chemistry.correct + subjectScores.Mathematics.correct) / answered) * 100
      : 0;
  
    setTotalMarks(total);
    setNegativeMarks(negative);
    setUnansweredCount(unanswered);
    setTotalQuestions(totalQues);
    setAnsweredQuestions(answered);
    setAccuracy(acc.toFixed(2));
    setSubjectWiseMarks(subjectScores);
  };
  

 

  if (loading) return <p className="text-center text-lg">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <>
    <div>
        <Navbar />
      </div>

    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold text-center mb-6">Test Response Details</h1>

      {/* Overall Summary */}
      <div className="mb-6 p-4 bg-gray-100 rounded-md shadow-sm">
        <h2 className="text-xl font-semibold text-center">
          Total Marks: <span className="text-blue-600">{totalMarks}</span>
        </h2>
        <p>📉 Negative Marks: <span className="text-red-500">{negativeMarks}</span></p>
        <p>❓ Unanswered Questions: <span className="text-gray-500">{unansweredCount}</span></p>
        <p>✅ Answered Questions: <span className="text-green-600">{answeredQuestions}</span></p>
        <p>📊 Total Questions: <span className="text-blue-500">{totalQuestions}</span></p>
        <p>🎯 Accuracy: <span className="text-purple-600">{accuracy}%</span></p>
      </div>

      {/* Subject-wise Performance */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold">Subject-wise Performance:</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
          {Object.entries(subjectWiseMarks).map(([subject, data]) => (
            <div key={subject} className="p-4 bg-blue-100 rounded-md shadow-sm">
              <h3 className="text-lg font-bold">{subject}</h3>
              <p>✅ Correct: <span className="text-green-600">{data.correct}</span></p>
              <p>❌ Incorrect: <span className="text-red-600">{data.incorrect}</span></p>
              <p>📊 Total Marks: <span className="text-blue-600">{data.total}</span></p>
              <p>⏳ Time Taken: <span className="text-gray-600">{data.timeSpent.toFixed(2)} sec</span></p>
            </div>
          ))}
        </div>
      </div>

      {/* Question-wise Details */}
      {testResponse?.responses?.map((response, index) => (
  <div key={response.questionId._id} className="border p-4 mb-4 rounded-lg shadow-md">
    <h2 className="text-lg font-semibold mb-2">
      Q{index + 1}: {response.questionId.questionText}
    </h2>

    {/* Check if the question type is MCQ */}
    {response.questionId.type === "MCQ" ? (
      // Show options for MCQ questions
      <ul className="list-disc pl-5 mb-2">
        {response.questionId.options?.map((option, idx) => (
          <li
            key={idx}
            className={option === response.InputAnswer ? "text-blue-500 font-semibold" : ""}
          >
            {option}
          </li>
        ))}
      </ul>
    ) : (
      // For non-MCQ questions (e.g., numerical questions), directly compare InputAnswer and CorrectAnswer
      <p className="mb-2">
        <strong>Your Answer:</strong>
        <span
          className={response.InputAnswer === response.questionId.correctAnswer ? "text-green-600 font-semibold" : response.InputAnswer ? "text-red-500 font-semibold" : "text-gray-500"}
        >
          {response.InputAnswer || "Not answered"}
        </span>
      </p>
    )}

    {/* Marked answer only for MCQ questions */}
    {response.questionId.type === "MCQ" && (
      <p className="mb-1">
        <strong>Marked Answer:</strong>
        <span
          className={response.InputAnswer === response.questionId.correctAnswer ? "text-green-600 font-semibold" : response.InputAnswer ? "text-red-500 font-semibold" : "text-gray-500"}
        >
          {response.InputAnswer || "Not answered"}
        </span>
      </p>
    )}

    {/* Correct answer */}
    <p>
      <strong>Correct Answer:</strong>
      <span className="text-green-600 font-semibold">{response.questionId.correctAnswer}</span>
    </p>

    {/* Time taken */}
    <p>⏳ Time Taken: <span className="text-gray-600">{response.timeSpent.toFixed(2)} sec</span></p>
  </div>
))}

    </div>
    </>
  );
};

export default TestResponseDetails;