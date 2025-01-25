import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function QuestionForm() {
  let navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token") || localStorage.getItem("token") === undefined) {
      navigate("/login");
    }
  }, [navigate]);

  const [numberOfQuestions, setNumberOfQuestions] = useState(75); // Default to 75
  const [questions, setQuestions] = useState([]);

  // Initialize questions array when the number of questions changes
  useEffect(() => {
    setQuestions(
      Array.from({ length: numberOfQuestions }, () => ({
        text: "",
        image: null,
        type: "Numerical", // or "mcq"
        difficulty: "easy", // easy, medium, hard
        subject: "Physics", // Physics, Chemistry, Math
        options: [
          { type: "text", value: "" },
          { type: "text", value: "" },
          { type: "text", value: "" },
          { type: "text", value: "" },
        ],
        correctAnswer: "",
      }))
    );
  }, [numberOfQuestions]);

  const handleInputChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  const handleImageUpload = (index, file) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].image = file;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (questionIndex, optionIndex, type, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex] = { type, value };
    setQuestions(updatedQuestions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const token = localStorage.getItem("token");
    const apiUrl = "http://localhost:5000/api/tests/67929e790e6073a3cf71f9c0/questions";
  
    if (!token) {
      alert("Authorization token is missing.");
      return;
    }
  
    try {
      for (const question of questions) {
        const payload = {
          questionText: question.text,
          options: question.options.map((opt) => opt.value),
          correctAnswer: question.correctAnswer,
          image: "zzzzzzzzzzzzzzz", 
          subject: question.subject,
          type: question.type,
        };
        console.log(JSON.stringify(payload));
  
       
        // Send the question payload
        const response = await fetch("http://localhost:5000/api/tests/67929e790e6073a3cf71f9c0/questions", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`,
          },
          body: JSON.stringify(payload),
        });
  
        if (!response.ok) {
          throw new Error("Failed to save question.");
        }
      }
  
      alert("Questions saved successfully!");
    } catch (error) {
      console.error("Error saving questions:", error);
      alert("Failed to save questions. Please try again.");
    }
  };
  
  return (
    <div className="form-container">
      <h2>Questionnaire Form</h2>
      <label>
        Number of Questions:
        <input
          type="number"
          value={numberOfQuestions}
          onChange={(e) => setNumberOfQuestions(Number(e.target.value))}
          min="1"
          required
        />
      </label>
      <form onSubmit={handleSubmit}>
        {questions.map((question, index) => (
          <div key={index} className="question-block">
            <h4>Question {index + 1}</h4>

            <label>Question Text:</label>
            <textarea
              value={question.text}
              onChange={(e) => handleInputChange(index, "text", e.target.value)}
              placeholder="Enter question text"
              required
            ></textarea>

            <label>Upload Image (optional):</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(index, e.target.files[0])}
            />

            <label>Question Type:</label>
            <select
              value={question.type}
              onChange={(e) => handleInputChange(index, "type", e.target.value)}
            >
              <option value="numerical">Numerical</option>
              <option value="mcq">MCQ</option>
            </select>

            <label>Difficulty:</label>
            <select
              value={question.difficulty}
              onChange={(e) => handleInputChange(index, "difficulty", e.target.value)}
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>

            <label>Subject:</label>
            <select
              value={question.subject}
              onChange={(e) => handleInputChange(index, "subject", e.target.value)}
            >
              <option value="Physics">Physics</option>
              <option value="Chemistry">Chemistry</option>
              <option value="Math">Math</option>
            </select>

            {question.type === "mcq" && (
              <div className="mcq-options">
                <label>Options:</label>
                {question.options.map((option, optIndex) => (
                  <div key={optIndex} className="mcq-option">
                    <select
                      value={option.type}
                      onChange={(e) =>
                        handleOptionChange(index, optIndex, e.target.value, "")
                      }
                    >
                      <option value="text">Text</option>
                      <option value="image">Image</option>
                    </select>

                    {option.type === "text" ? (
                      <input
                        type="text"
                        value={option.value}
                        onChange={(e) =>
                          handleOptionChange(index, optIndex, "text", e.target.value)
                        }
                        placeholder={`Option ${optIndex + 1}`}
                        required
                      />
                    ) : (
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          handleOptionChange(index, optIndex, "image", e.target.files[0])
                        }
                        required
                      />
                    )}
                  </div>
                ))}
              </div>
            )}

            <label>Correct Answer:</label>
            <input
              type="text"
              value={question.correctAnswer}
              onChange={(e) => handleInputChange(index, "correctAnswer", e.target.value)}
              placeholder="Enter the correct answer"
              required
            />
          </div>
        ))}
        <button type="submit" className="submit-button">
          Save Questions
        </button>
      </form>
    </div>
  );
}

export default QuestionForm;
