import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Adminviewtest = () => {
  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState("All");

  const { testId } = useParams();

  useEffect(() => {
    const fetchQuestions = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Authorization token not found.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:5000/api/tests/${testId}/getQuestions`,
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );

        setQuestions(response.data.questions || []);
        setFilteredQuestions(response.data.questions || []);
      } catch (err) {
        setError("Failed to fetch questions.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  useEffect(() => {
    if (selectedSubject === "All") {
      setFilteredQuestions(questions);
    } else {
      setFilteredQuestions(
        questions.filter((q) => q.subject.toLowerCase() === selectedSubject.toLowerCase())
      );
    }
  }, [selectedSubject, questions]);

  const handleDelete = async (questionId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Authorization token not found.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/tests/${testId}/questions/${questionId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to delete question.');
      }

      setQuestions(questions.filter(q => q._id !== questionId));
    } catch (err) {
      console.log(err.message);
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 p-6">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">📖 Test Questions</h2>

      {loading && <p className="text-blue-500 text-center text-lg">Loading...</p>}
      {error && <p className="text-red-500 text-center text-lg">{error}</p>}

      {!loading && !error && (
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-center mb-8">
            <select
              className="px-4 py-2 text-lg font-medium border border-gray-300 rounded-md bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
            >
              <option value="All">📚 All Subjects</option>
              <option value="Physics">⚛ Physics</option>
              <option value="Chemistry">🧪 Chemistry</option>
              <option value="Math">📐 Math</option>
            </select>
          </div>

          <div className="space-y-6">
            {filteredQuestions.length > 0 ? (
              filteredQuestions.map((question, index) => (
                <div
                  key={index}
                  className="p-6 border border-gray-200 rounded-xl shadow-lg bg-white transition-transform transform hover:scale-105 hover:shadow-2xl duration-300 relative w-full flex flex-col"
                >
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 pr-12">
                    {index + 1}. {question.questionText}
                  </h3>

                  {question.image && question.image.trim() !== "" && (
                    <img
                      src={question.image}
                      alt="Question"
                      className="w-full h-60 object-cover rounded-md mb-4"
                    />
                  )}

                  {question.type !== "Numerical" && question.options && question.options.length > 0 && (
                    <ul className="space-y-2">
                      {question.options.map((option, i) => (
                        <li
                          key={i}
                          className={`p-2 rounded-md text-sm sm:text-base font-medium border transition ${
                            option === question.correctAnswer
                              ? "bg-green-100 border-green-500 text-green-700 shadow-sm"
                              : "bg-gray-100 border-gray-300"
                          }`}
                        >
                          {option}
                        </li>
                      ))}
                    </ul>
                  )}

                  {question.type === "Numerical" && question.correctAnswer && (
                    <p className="mt-4 text-lg font-medium text-green-700 bg-green-100 p-2 rounded-md">
                      ✅ Correct Answer: {question.correctAnswer}
                    </p>
                  )}

                  <div className="mt-4 flex flex-col sm:flex-row sm:justify-between text-sm text-gray-600">
                    <p>
                      <strong>📘 Subject:</strong> {question.subject}
                    </p>
                    <p>
                      <strong>📝 Type:</strong> {question.type}
                    </p>
                  </div>
                  
                  <button
                    onClick={() => handleDelete(question._id)}
                    className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded-full hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-600 text-lg">
                ❌ No questions found for <strong>{selectedSubject}</strong>.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Adminviewtest;
