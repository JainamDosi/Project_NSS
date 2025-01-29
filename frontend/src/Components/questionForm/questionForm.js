import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
const cloudinary = require("cloudinary").v2;


// Configure Cloudinary
cloudinary.config({
  cloud_name: "djpd2fkjn", // Replace with your Cloudinary cloud name
  api_key: "767891938697554", // Replace with your Cloudinary API key
  api_secret: "YQhtQKx_9n6UZ-VoTd2k9cTDgDc", // Replace with your Cloudinary API secret
});



function QuestionForm() {
  let navigate = useNavigate();
  // const testId =useParams();
  const [previesquestions, setpreviesQuestions] = useState([]);

  const { testId } = useParams();
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

  // Handle input changes for question text, type, difficulty, etc.
  const handleInputChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  // Handle image upload for question images
  const handleImageUpload = async (index, file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "swapbook"); // Replace with your Cloudinary upload preset
      formData.append("cloud_name", "djpd2fkjn");
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/djpd2fkjn/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
  
      if (!response.ok) {
        throw new Error('Error uploading image to Cloudinary');
      }
  
      const data = await response.json();
      console.log(data);
      const imageUrl = data.secure_url;
  
      const updatedQuestions = [...questions];
      updatedQuestions[index].image = imageUrl;
      setQuestions(updatedQuestions);
    } catch (error) {
      console.error("Error uploading image to Cloudinary:", error);
    }
  };
  

  // Handle changes for MCQ options (text or image)
  const handleOptionChange = async (questionIndex, optionIndex, type, value) => {
    const updatedQuestions = [...questions];
  
    if (type === "image") {
      try {
        const formData = new FormData();
        formData.append("file",value);
        formData.append("upload_preset", "swapbook"); // Replace with your Cloudinary upload preset
        formData.append("cloud_name", "djpd2fkjn");
  console.log("bbbbbbbbbbbbbbbbbbbbbbb");
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/djpd2fkjn/image/upload`,
          {
            method: "POST",
            body: formData
          }
        );
  
        if (!response.ok) {
          throw new Error('Error uploading image to Cloudinary');
        }
  
        const data = await response.json();
        const imageUrl = data.secure_url;
        updatedQuestions[questionIndex].options[optionIndex] = { type, value: imageUrl };
      } catch (error) {
        console.log(error.message);
        console.error("Error uploading image to Cloudinary:", error);
      }
    } else {
      updatedQuestions[questionIndex].options[optionIndex] = { type, value };
    }
  
    setQuestions(updatedQuestions);
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const apiUrl = `http://localhost:5000/api/tests/${testId}/questions`;
    if (!token) {
      alert("Authorization token is missing.");
      return;
    }
    
    try {
      for (const question of questions) {
        console.log("aaaaaaaaaaaaaaaaaaa");
        const payload = {
          questionText: question.text,
          options: question.options.map((opt) => opt.value),
          correctAnswer: question.correctAnswer,
          image: question.image || "", // Include the image URL if it exists
          subject: question.subject,
          type: question.type,
        };
        console.log(JSON.stringify(payload));

        // Send the question payload
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
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

  // Redirect if user is not logged in or testId is missing
  useEffect(() => {
    if (!localStorage.getItem("token") || localStorage.getItem("token") === undefined) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    if (!testId) {
      navigate("/AdminDashboard");
    }
  }, [navigate]);

  return (
    <div className="form-container max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md space-y-6">
    <h2 className="text-2xl font-bold text-gray-800 mb-4">Questionnaire Form</h2>
    <label className="block text-gray-700 font-medium mb-2">
      Number of Questions:
      <input
        type="number"
        value={numberOfQuestions}
        onChange={(e) => setNumberOfQuestions(Number(e.target.value))}
        min="1"
        required
        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      />
    </label>
    <form onSubmit={handleSubmit} className="space-y-6">
      {questions.map((question, index) => (
        <div
          key={index}
          className="question-block p-4 bg-gray-50 rounded-lg border border-gray-200 space-y-4"
        >
          <h4 className="text-lg font-semibold text-gray-800">
            Question {index + 1}
          </h4>

          <label className="block text-gray-700 font-medium">
            Question Text:
            <textarea
              value={question.text}
              onChange={(e) => handleInputChange(index, "text", e.target.value)}
              placeholder="Enter question text"
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            ></textarea>
          </label>

          <label className="block text-gray-700 font-medium">
            Upload Image (optional):
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(index, e.target.files[0])}
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </label>

          <label className="block text-gray-700 font-medium">
            Question Type:
            <select
              value={question.type}
              onChange={(e) => handleInputChange(index, "type", e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="numerical">Numerical</option>
              <option value="MCQ">MCQ</option>
            </select>
          </label>

          <label className="block text-gray-700 font-medium">
            Difficulty:
            <select
              value={question.difficulty}
              onChange={(e) => handleInputChange(index, "difficulty", e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </label>

          <label className="block text-gray-700 font-medium">
            Subject:
            <select
              value={question.subject}
              onChange={(e) => handleInputChange(index, "subject", e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="Physics">Physics</option>
              <option value="Chemistry">Chemistry</option>
              <option value="Math">Math</option>
            </select>
          </label>

          {question.type === "MCQ" && (
            <div className="mcq-options space-y-2">
              <label className="block text-gray-700 font-medium">Options:</label>
              {question.options.map((option, optIndex) => (
                <div
                  key={optIndex}
                  className="mcq-option flex items-center space-x-4"
                >
                  <select
                    value={option.type}
                    onChange={(e) =>
                      handleOptionChange(index, optIndex, e.target.value, "")
                    }
                    className="mt-1 block w-1/4 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
                      className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  ) : (
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        handleOptionChange(index, optIndex, "image", e.target.files[0])
                      }
                      required
                      className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                  )}
                </div>
              ))}
            </div>
          )}

          <label className="block text-gray-700 font-medium">
            Correct Answer:
            <input
              type="text"
              value={question.correctAnswer}
              onChange={(e) => handleInputChange(index, "correctAnswer", e.target.value)}
              placeholder="Enter the correct answer"
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </label>
        </div>
      ))}
      <button
        type="submit"
        className="w-full py-3 px-6 bg-blue-600 text-white font-bold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Save Questions
      </button>
    </form>
  </div>
  );
}

export default QuestionForm;