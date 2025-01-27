import React, { useState, useEffect } from "react";
import "./testInterface.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function TestInterface() {
  const { testId } = useParams();
  const navigate = useNavigate();

  // Redirect to login if token is missing
  useEffect(() => {
    if (!localStorage.getItem("token") || localStorage.getItem("token") === undefined) {
      navigate("/login");
    }
  }, [navigate]);

  // Fetch questions
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
  
      // Initialize question statuses
      const initialStatus = response.data.questions.map((_, index) =>
        index === 0 ? "Not Answered" : "Not Visited"
      );
      setQuestionStatus(initialStatus);
    } catch (error) {
      console.error("Error fetching questions:", error.response?.data?.error || error.message);
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
    const value = e.target.value;
  
    // Allow only numbers, decimal points, and negative signs
    if (/^-?\d*\.?\d*$/.test(value)) {
      setAnswers({
        ...answers,
        [currentQuestionIndex]: value,
      });
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      const previousIndex = currentQuestionIndex - 1;
  
      // Update status if the previous question is "Not Visited"
      if (questionStatus[previousIndex] === "Not Visited") {
        updateStatus(previousIndex, "Not Answered");
      }
  
      setCurrentQuestionIndex(previousIndex);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      const nextIndex = currentQuestionIndex + 1;
  
      // Update status if the next question is "Not Visited"
      if (questionStatus[nextIndex] === "Not Visited") {
        updateStatus(nextIndex, "Not Answered");
      }
  
      setCurrentQuestionIndex(nextIndex);
    }
  };
  const handleNext_Save = () => {
    if (currentQuestionIndex < questions.length - 1) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
    }
  };

  const handleSaveNext = () => {
    if (!answers[currentQuestionIndex]) {
      alert("Please select an option ");
      return;
    }
    if (answers[currentQuestionIndex]) {
      // If an answer is selected, mark as answered
      finalAnswers[currentQuestionIndex] = answers[currentQuestionIndex];
      setFinalAnswers({ ...finalAnswers });
      updateStatus(currentQuestionIndex, "Answered");
    } 
    // else {
    //   // If no answer is selected, mark as not answered
    //   updateStatus(currentQuestionIndex, "Not Answered");
    // }
    

    handleNext_Save();
  };
  // const handleSaveNext = () => {
  //   if (!answers[currentQuestionIndex]) {
  //     alert("Please select an option");
  //     return;
  //   }
  
  //   // Update the current question's status to "Answered"
  //   finalAnswers[currentQuestionIndex] = answers[currentQuestionIndex];
  //   setFinalAnswers({ ...finalAnswers });
  //   updateStatus(currentQuestionIndex, "Answered");
  
  //   // Move to the next question index
  //   const nextQuestionIndex = currentQuestionIndex + 1;
  
  //   // Check if the next question has been visited or not
  //   if (!finalAnswers[nextQuestionIndex]) {
  //     // If not visited, mark the next question's status as "Not Answered"
  //     updateStatus(nextQuestionIndex, "Not Answered");
  //   }
  
  //   // Proceed to the next question
  //   handleNext_Save();
  // };
  

  const handleSave_Mark = () => {
    if (!answers[currentQuestionIndex]) {
      alert("Please select an option ");
      return;
    }
    finalAnswers[currentQuestionIndex] = answers[currentQuestionIndex];
    setFinalAnswers({ ...finalAnswers });
    updateStatus(currentQuestionIndex, "Answered and Marked for Review");
    handleNext_Save();
  };
  
  const handleReview_Next = () => {
    updateStatus(currentQuestionIndex, "Marked for Review");
    handleNext_Save();
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

  // const handleButtonClick = (index) => {
  //   setCurrentQuestionIndex(index);
  //   if (questionStatus[index] === "Not Visited") {
  //     updateStatus(index, "Not Answered");
  //   }
  // };
  const handleButtonClick = (index) => {
    setCurrentQuestionIndex(index);
    // Update the question status when visiting for the first time
    if (questionStatus[index] === "Not Visited") {
      updateStatus(index, "Not Answered");
    }
  };

  const countStatus = (status) => questionStatus.filter((s) => s === status).length;

  const getStatusClass = (index) => {
    switch (questionStatus[index]) {
      case "Answered":
        return "status-green";
      case "Not Answered":
        return "status-red";
      case "Not Visited":
        return "status-grey";
      case "Marked for Review":
        return "status-orange";
      case "Answered and Marked for Review":
        return "status-purple";
      default:
        return "";
    }
  };

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
      className={`btn75 ${getStatusClass(i)} ${i === currentQuestionIndex ? "active" : ""}`}
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
