import React, { useState, useEffect, useRef } from "react";
import "./testInterface.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function TestInterface() {
  const { testId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token") || localStorage.getItem("token") === undefined) {
      navigate("/login");
    }
  }, [navigate]);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/tests/678b73f0c374a35e3f653162/getQuestions`,
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      );

      setQuestions(response.data.questions);
      setQuestionStatus(new Array(response.data.questions.length).fill("Not Visited")); // Initialize status
    } catch (error) {
      console.error(
        "Error fetching questions:",
        error.response?.data?.error || error.message
      );
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [testId]);

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Timer
  const [time, setTime] = useState(100);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime > 0) {
          return prevTime - 1;
        } else {
          clearInterval(timer);
          handleYes();
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const [answers, setAnswers] = useState({});
  const [finalAnswers, setFinalAnswers] = useState({});
  const [questionStatus, setQuestionStatus] = useState([]);

  const updateStatus = (index, status) => {
    const updatedStatus = [...questionStatus];
    updatedStatus[index] = status;
    setQuestionStatus(updatedStatus);
  };

  const handleOptionChange = (e) => {
    setAnswers({
      ...answers,
      [currentQuestionIndex]: e.target.value,
    });
  };

  const handleNumericalChange = (e) => {
    setAnswers({
      ...answers,
      [currentQuestionIndex]: e.target.value,
    });
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleSaveNext = () => {
    finalAnswers[currentQuestionIndex] = answers[currentQuestionIndex];
    setFinalAnswers(finalAnswers);
    updateStatus(currentQuestionIndex, "Answered");
    handleNext();
  };

  const handleSave_Mark = () => {
    if (!answers[currentQuestionIndex]) {
      alert("Please select an option ");
      return;
    }
    finalAnswers[currentQuestionIndex] = answers[currentQuestionIndex];
    setFinalAnswers(finalAnswers);
    updateStatus(currentQuestionIndex, "Answered and Marked for Review");
    handleNext();
  };

  const handleReview_Next = () => {
    updateStatus(currentQuestionIndex, "Marked for Review");
    handleNext();
  };

  const handleClear = () => {
    const updatedAnswers = { ...answers };
    delete updatedAnswers[currentQuestionIndex];
    setAnswers(updatedAnswers);
    updateStatus(currentQuestionIndex, "Not Answered");
  };

  const handleSubmitClick = () => {
    setShowPopup(true);
  };

  const handleYes = () => {
    console.log(finalAnswers);
    alert("Form submitted!");
    setShowPopup(false);
  };

  const handleNo = () => {
    setShowPopup(false);
  };

  const handleButtonClick = (index) => {
    setCurrentQuestionIndex(index);
    if (questionStatus[index] === "Not Visited") {
      updateStatus(index, "Not Answered");
    }
  };

  // Calculate counts for the status box
  const countStatus = (status) => questionStatus.filter((s) => s === status).length;

  return (
    <>
      <div id="mainTestInterface">
        <div id="leftMainTestInterface">
          {questions.length > 0 && (
            <div>
              <h4>{`Question ${currentQuestionIndex + 1}:`}</h4>
              <p>{questions[currentQuestionIndex].questionText}</p>

              {questions[currentQuestionIndex].type === "MCQ" ? (
                <div className="optionsMCQ">
                  {questions[currentQuestionIndex].options.map((option, optionIndex) => (
                    <div key={optionIndex}>
                      <input
                        type="radio"
                        id={`option-${optionIndex}`}
                        name={`question-${currentQuestionIndex}`}
                        value={option}
                        checked={answers[currentQuestionIndex] === option}
                        onChange={handleOptionChange}
                      />
                      <label htmlFor={`option-${optionIndex}`}>{option}</label>
                    </div>
                  ))}
                </div>
              ) : questions[currentQuestionIndex].type === "Numerical" ? (
                <div className="optionsNumerical">
                  <input
                    type="text"
                    value={answers[currentQuestionIndex] || ""}
                    onChange={handleNumericalChange}
                    placeholder="Enter your answer"
                  />
                </div>
              ) : null}
            </div>
          )}

          <div className="btnDiv">
            <button onClick={handleBack} className="btnNavigate" disabled={currentQuestionIndex === 0}>
              Back
            </button>
            <button onClick={handleNext} className="btnNavigate">
              Next
            </button>
          </div>
        </div>

        <div id="rightMainTestInterface">
          <h4>Time Remaining: {formatTime(time)}</h4>

          <div className="statusBox">
            <h4>Question Status</h4>
            <p>Not Visited: {countStatus("Not Visited")}</p>
            <p>Not Answered: {countStatus("Not Answered")}</p>
            <p>Answered: {countStatus("Answered")}</p>
            <p>Marked for Review: {countStatus("Marked for Review")}</p>
            <p>Answered and Marked for Review: {countStatus("Answered and Marked for Review")}</p>
          </div>

          <div className="actionButtons">
            <button className="btnAnswers greenbtn" onClick={handleSaveNext}>
              SAVE & NEXT
            </button>
            <button className="btnAnswers" onClick={handleClear}>
              CLEAR
            </button>
            <button className="btnAnswers orangebtn" onClick={handleSave_Mark}>
              SAVE & MARK FOR REVIEW
            </button>
            <button className="btnAnswers bluebtn" onClick={handleReview_Next}>
              MARK FOR REVIEW & NEXT
            </button>
          </div>

          <div className="grid-container">
            {Array.from({ length: questions.length }, (_, i) => (
              <button
                key={i}
                className={`btn75 ${i === currentQuestionIndex ? "active" : ""}`}
                onClick={() => handleButtonClick(i)}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button className="btnSubmit btnAnswers" onClick={handleSubmitClick}>
            SUBMIT
          </button>

          {showPopup && (
            <div className="popup-overlay">
              <div className="popup-box">
                <h3>Are you sure you want to submit?</h3>
                <div className="finalSubmit">
                  <button className="yes-button" onClick={handleYes}>
                    YES
                  </button>
                  <button className="no-button" onClick={handleNo}>
                    NO
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default TestInterface;