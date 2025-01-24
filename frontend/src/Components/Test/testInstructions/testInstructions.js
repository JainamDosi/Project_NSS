import React, { useState } from "react";
import "./testInstructions.css";
import { Link,useNavigate } from "react-router-dom";
import { useEffect } from "react";
// import Navbar from "../Navbar/navbar";

const TestInstructions = () => {
  const [isChecked, setIsChecked] = useState(false);
  let navigate = useNavigate();
   
  useEffect(() => {
    if (!localStorage.getItem('token') || localStorage.getItem('token') === undefined) {
      navigate('/login');
    }
  }, [navigate]);

  // Function to handle checkbox change
  const handleCheckboxChange = (event) => {
    setIsChecked(!isChecked);
  };
  const handleButtonClick = () => {
    if (isChecked) {
      window.location.href = "https://www.google.com";
    }
  };
  return (
    <>
      {/* Navbar ko stick krna hai top pr */}
      <div id="instructionMain">
        <h1>Please read the instructions carefully</h1>
        <h4>General Instructions:</h4>
        <br />
        <p>1. Total duration of the test is 180 min.</p>
        <p>
          2. The clock will be set at the server. The countdown timer in the top
          right corner of screen will display the remaining time available for
          you to complete the examination. When the timer reaches zero, the
          examination will end by itself. You will not be required to end or
          submit your examination.
        </p>
        <p>
          3. The Questions Palette displayed on the right side of screen will
          show the status of each question using one of the following symbols:
        </p>
        {/* Yha abhi 5 points aayenge wo baad me daalenge */}
        <ul class="legend">
          <li class="legend-item">
            <div class="symbol not-visited"></div>
            <p>You have not visited the question yet.</p>
          </li>
          <li class="legend-item">
            <div class="symbol not-answered"></div>
            <p>You have not answered the question.</p>
          </li>
          <li class="legend-item">
            <div class="symbol answered"></div>
            <p>You have answered the question.</p>
          </li>
          <li class="legend-item">
            <div class="symbol marked-for-review"></div>
            <p>
              You have NOT answered the question, but have marked the question
              for review.
            </p>
          </li>
          <li class="legend-item">
            <div class="symbol answered-and-marked"></div>
            <p>
              The question(s) "Answered and Marked for Review" will be
              considered for evaluation.
            </p>
          </li>
        </ul>
        <br />
        <h4>Navigating to a Question:</h4>
        <br />
        <p>4. To answer a question, do the following:</p>
        <ol type="a">
          <li>
            Click on the question number in the Question Palette at the right of
            your screen to go to that numbered question directly. Note that
            using this option does NOT save your answer to the current question.
          </li>
          <li>
            Click on Save & Next to save your answer for the current question
            and then go to the next question.
          </li>
          <li>
            Click on Mark for Review & Next to save your answer for the current
            question, mark it for review, and then go to the next question.
          </li>
        </ol>
        <br />
        <h4>Answering a Question:</h4>
        <br />
        <p>5. Procedure for answering a multiple choice type question:</p>
        <ol type="a">
          <li>
            To select you answer, click on the button of one of the options.
          </li>
          <li>
            To deselect your chosen answer, click on the button of the chosen
            option again or click on the Clear Response button
          </li>
          <li>
            To change your chosen answer, click on the button of another option
          </li>
          <li>
            To save your answer, you MUST click on the Save & Next button.
          </li>
          <li>
            To mark the question for review, click on the Mark for Review & Next
            button.
          </li>
        </ol>
        <p>
          6. To change your answer to a question that has already been answered,
          first select that question for answering and then follow the procedure
          for answering that type of question.
        </p>
        <br />
        <h4>Navigating through sections:</h4>
        <br />
        <p>
          7. Sections in this question paper are displayed on the top bar of the
          screen. Questions in a section can be viewed by click on the section
          name. The section you are currently viewing is highlighted.
        </p>
        <p>
          8. After click the Save & Next button on the last question for a
          section, you will automatically be taken to the first question of the
          next section.
        </p>
        <p>
          9. You can shuffle between sections and questions anything during the
          examination as per your convenience only during the time stipulated.
        </p>
        <p>
          10. Candidate can view the corresponding section summery as part of
          the legend that appears in every section above the question palette.
        </p>
        <br />
      </div>
      <div id="instructionMain">
        <label>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          &nbsp; I have read and understood the instructions. All computer
          hardware allotted to me are in proper working condition. I declare
          that I am not in possession of / not wearing / not carrying any
          prohibited gadget like mobile phone, bluetooth devices etc. /any
          prohibited material with me into the Examination Hall.I agree that in
          case of not adhering to the instructions, I shall be liable to be
          debarred from this Test and/or to disciplinary action, which may
          include ban from future Tests / Examinations
        </label>
      </div>
      <div id="instructionMain" className="btnCenter">
        <button
          onClick={handleButtonClick}
          disabled={!isChecked}
          style={{
            backgroundColor: isChecked ? "green" : "gray",
            cursor: isChecked ? "pointer" : "not-allowed",
          }}
        >
          PROCEED
        </button>
      </div>
    </>
  );
};

export default TestInstructions;
