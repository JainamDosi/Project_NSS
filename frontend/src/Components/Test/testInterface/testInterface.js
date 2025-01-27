import React, { useState, useEffect, useRef } from "react";
import "./testInterface.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function TestInterface() {
  const { testId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('token') || localStorage.getItem('token') === undefined) {
      navigate('/login');
    }
  }, [navigate]);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/tests/${testId}/getQuestions`,
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      );

      setQuestions(response.data.questions);
      console.log(questions)
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

  // Store answers and status for each question
  const [answers, setAnswers] = useState({});
  const [finalAnswers, setFinalAnswers] = useState({}); 
  
  
  // Use ref to hold the answers when the timer hits 0 to prevent state reset
  const answersRef = useRef(finalAnswers);

  // Update the answersRef when answers state changes
  useEffect(() => {
    answersRef.current = finalAnswers;
  }, [finalAnswers]);

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

  const handleSubmitClick = () => {
    setShowPopup(true);
  };

  const handleYes = () => {
    // Use answersRef to access the answers when the timer finishes
    const final = answersRef.current;
    console.log(final);
    alert("Form submitted!");
    setShowPopup(false);
  };

  const handleNo = () => {
    setShowPopup(false);
  };

  const handleButtonClick = (index) => {
    setCurrentQuestionIndex(index);
  };

  const handleSaveNext = () => {
    finalAnswers[currentQuestionIndex] = answers[currentQuestionIndex];
    setFinalAnswers(finalAnswers);
    console.log("SAVED AND MARKED")
    console.log(finalAnswers);
    console.log("Ticked")
    console.log(answers);

    handleNext();
  };

  const handleSave_Mark = () => {
    if (!answers[currentQuestionIndex]) {
      alert("Please select an option ");
      return;
    }
    finalAnswers[currentQuestionIndex] = answers[currentQuestionIndex];
    setFinalAnswers(finalAnswers);
    console.log("SAVED AND MARKED")
    console.log(finalAnswers);
    console.log("Ticked")
    console.log(answers);
    handleNext();
  };

  const handleReview_Next = () => {
    handleNext();
  };

  const handleClear = () => {
    const updateFinal= { ...finalAnswers };
    delete updateFinal[currentQuestionIndex];
    setFinalAnswers(updateFinal);
    const updatedAnswers = { ...answers };
    delete updatedAnswers[currentQuestionIndex];
    setAnswers(updatedAnswers);
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
