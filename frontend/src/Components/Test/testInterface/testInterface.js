import React, { useState, useEffect,useRef } from "react";
import "./testInterface.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function TestInterface() {
  const { testId } = useParams();
  const navigate = useNavigate();
  const userId=JSON.parse(localStorage.getItem("userInfo")).user.id;


  // Redirect to login if token is missing
  useEffect(() => {
    if (
      !localStorage.getItem("token") ||
      localStorage.getItem("token") === undefined
    ) {
      navigate("/login");
    }
  }, [navigate]);
  const [finalAnswers, setFinalAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [timerExpired, setTimerExpired] = useState(false);
  // Fetch questions
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
  
      // Separate and order questions by subject
      const physicsQuestions = response.data.questions.filter(q => q.subject === "Physics");
      const chemistryQuestions = response.data.questions.filter(q => q.subject === "Chemistry");
      const mathsQuestions = response.data.questions.filter(q => q.subject === "Math");
  
      // Concatenate in order: Physics -> Chemistry -> Maths
      const orderedQuestions = [...physicsQuestions, ...chemistryQuestions, ...mathsQuestions];
      
      setQuestions(orderedQuestions);
  
      // Initialize question statuses
      const initialStatus = orderedQuestions.map((_, index) =>
        index === 0 ? "Not Answered" : "Not Visited"
      );
      setQuestionStatus(initialStatus);
      setTimeSpent(new Array(orderedQuestions.length).fill(0));
    } catch (error) {
      console.error(
        "Error fetching questions:",
        error.response?.data?.error || error.message
      );
    }
  };
  



  
  
  
  


  const answersRef = useRef(finalAnswers);

  // Update the answersRef when answers state changes
  useEffect(() => {
    answersRef.current = finalAnswers;
  }, [finalAnswers]);

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
          clearInterval(timer); // Clear the interval
          setShowPopup(true);
          setTimerExpired(true); // Set timerExpired to true when time hits 0
          return 0;
        }
      });
    }, 1000);
  
    return () => clearInterval(timer);
  }, [submitted]); // Ensure submitted is in the dependencies

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const [answers, setAnswers] = useState({});
  
  const [questionStatus, setQuestionStatus] = useState([]);

  const [timeSpent, setTimeSpent] = useState([]); // Array to track time spent on each question
  const [startTime, setStartTime] = useState(Date.now()); // Start time for the current question

  const updateStatus = (index, status) => {
    setQuestionStatus((prevStatus) => {
      const updatedStatus = [...prevStatus];
      updatedStatus[index] = status;
      return updatedStatus;
    });
  };

  const updateTimeSpent = () => {
  const currentTime = Date.now();
  const timeDiff = (currentTime - startTime) / 1000; // Time spent on the current question in seconds

  setTimeSpent((prevTimeSpent) => {
    const updatedTimeSpent = [...prevTimeSpent];
    updatedTimeSpent[currentQuestionIndex] += timeDiff; // Accumulate time spent on the question
    return updatedTimeSpent;
  });

  setStartTime(currentTime); // Reset the start time for the next question
};

  const handleOptionChange = (e) => {
    setAnswers({
      ...answers,
      [currentQuestionIndex]: e.target.value,
    });
    console.log(timeSpent);
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
    console.log(timeSpent);

  };

  const handleBack = () => {
    console.log(questions);
    if (currentQuestionIndex > 0) {
      updateTimeSpent();
      console.log(timeSpent);
      const previousIndex = currentQuestionIndex - 1;

      // Update status if the previous question is "Not Visited"
      if (questionStatus[previousIndex] === "Not Visited") {
        updateStatus(previousIndex, "Not Answered");
      }

      setCurrentQuestionIndex(previousIndex);
    }
    console.log(timeSpent);
  };

  const handleNext = () => {
    const nextIndex = currentQuestionIndex + 1;

  if (nextIndex < questions.length) {
    // Move to the next question only
    if (questionStatus[nextIndex] === "Not Visited") {
      updateStatus(nextIndex, "Not Answered");
    }
    setCurrentQuestionIndex(nextIndex);
    updateTimeSpent();
    console.log(timeSpent);
  }
  console.log(timeSpent);
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
    updateTimeSpent();
    setFinalAnswers((prevFinalAnswers) => ({
      ...prevFinalAnswers,
      [currentQuestionIndex]: answers[currentQuestionIndex],
    }));
    updateStatus(currentQuestionIndex, "Answered");
  
    // Move to the next question
    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < questions.length) {
      // Mark the next question as "Not Answered" if it's "Not Visited"
      if (questionStatus[nextIndex] === "Not Visited") {
        updateStatus(nextIndex, "Not Answered");
      }
      setCurrentQuestionIndex(nextIndex);
    }

    console.log(timeSpent);
    // Set the next question as the current question

    // handleNext_Save();
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
    updateTimeSpent();
    setFinalAnswers((prevFinalAnswers) => ({
      ...prevFinalAnswers,
      [currentQuestionIndex]: answers[currentQuestionIndex],
    }));
    updateStatus(currentQuestionIndex, "Answered and Marked for Review");
  
    // Move to the next question
    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < questions.length) {
      if (questionStatus[nextIndex] === "Not Visited") {
        updateStatus(nextIndex, "Not Answered");
      }
      setCurrentQuestionIndex(nextIndex);
    }
    console.log(timeSpent);
  };

  const handleReview_Next = () => {
    // Mark the current question as "Marked for Review"
    updateStatus(currentQuestionIndex, "Marked for Review");
    updateTimeSpent();
    // Move to the next question
    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < questions.length) {
      if (questionStatus[nextIndex] === "Not Visited") {
        updateStatus(nextIndex, "Not Answered");
      }
      setCurrentQuestionIndex(nextIndex);
    }
    console.log(timeSpent);
  };

  const handleClear = () => {
    const updatedAnswers = { ...answers };
    delete updatedAnswers[currentQuestionIndex];
    setAnswers(updatedAnswers);
    updateStatus(currentQuestionIndex, "Not Answered");
  };

  const handleSubmitClick = () => {
    setShowPopup(true);
    setTimerExpired(false);
  };

  const handleYes = () => {
    if (!submitted) {
      setSubmitted(true); // Ensure it's only submitted once
      updateTimeSpent();
      // console.log(finalAnswers);
      SubmitResponse();
      // Simulate automatic form submission
      // Replace this with your actual submission logic if needed
      setShowPopup(false);
      navigate("/studentDashboard"); // Redirect to a "submission successful" page
    }
    const final = answersRef.current;
    console.log(final);
    console.log(timeSpent);
  };

  const handleNo = () => {
    setShowPopup(false);
  };

  const SubmitResponse = async () => {
    const final=answersRef.current;
    // Ensure all questions are included in the payload, even if no response is provided
    const mergedResponses = questions.map((question, index) => ({
      questionId: question._id, // Use questionId from the fetched questions
      InputAnswer: final[index] || null, // Use the saved answers or null if not answered
      status: questionStatus[index] || "Not Attempted", // Default to "Not Attempted" if status is missing
      timeSpent: timeSpent[index] || 0,
      correctAnswer:question.correctAnswer // Use recorded time or default to 0
    }));
  
    // Prepare the payload
    const payload = {
      userId: userId, // User ID from localStorage
      testId: testId, // Test ID from route params
      responses: mergedResponses, // Responses array
      totalTimeSpent: timeSpent.reduce((acc, curr) => acc + curr, 0), // Total time spent across all questions
    };
  
    try {
      // Send POST request to the backend
      const response = await axios.post(
        `http://localhost:5000/api/test_analyze/test_responses`, // Backend endpoint
        payload, // Payload data
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`, // Authorization token
            "Content-Type": "application/json", // Set content type
          },
        }
      );
  
      console.log("Success:", response.data); // Log backend response
    } catch (error) {
      console.error("Error submitting responses:", error.response?.data || error.message);
    }
  };

  // const handleButtonClick = (index) => {
  //   setCurrentQuestionIndex(index);
  //   if (questionStatus[index] === "Not Visited") {
  //     updateStatus(index, "Not Answered");
  //   }
  // };
  const handleButtonClick = (index) => {
    updateTimeSpent();
    setCurrentQuestionIndex(index);
    // Update the question status when visiting for the first time
    if (questionStatus[index] === "Not Visited") {
      updateStatus(index, "Not Answered");
    }
  };

  const countStatus = (status) =>
    questionStatus.filter((s) => s === status).length;

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
              {questions[currentQuestionIndex].image && (
                <img src={questions[currentQuestionIndex].image} alt="question" />
              )}

              {questions[currentQuestionIndex].type === "MCQ" ? (
                <div className="optionsMCQ">
                  {questions[currentQuestionIndex].options.map(
                    (option, optionIndex) => (
                      <div key={optionIndex}>
                        <input
                          type="radio"
                          id={`option-${optionIndex}`}
                          name={`question-${currentQuestionIndex}`}
                          value={option}
                          checked={answers[currentQuestionIndex] === option}
                          onChange={handleOptionChange}
                        />
                        <label htmlFor={`option-${optionIndex}`}>
                          {option}
                        </label>
                      </div>
                    )
                  )}
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
            <button
              onClick={handleBack}
              className="btnNavigate"
              disabled={currentQuestionIndex === 0}
            >
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
            <p>
              Answered and Marked for Review:{" "}
              {countStatus("Answered and Marked for Review")}
            </p>
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
                className={`btn75 ${getStatusClass(i)} ${
                  i === currentQuestionIndex ? "active" : ""
                }`}
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
                  <button className="no-button" onClick={handleNo} disabled={timerExpired}>
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
