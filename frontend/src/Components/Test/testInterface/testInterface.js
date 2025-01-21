import React, { useState } from "react";
import "./testInterface.css";
import { useNavigate } from "react-router-dom";

function TestInterface() {
  //Submit Utility
  const [showPopup, setShowPopup] = useState(false);

    const handleSubmitClick = () => {
        setShowPopup(true); // Show the popup when the "Submit" button is clicked
    };

    const handleYes = () => {
        setShowPopup(false); // Close the popup
        alert("Form submitted!"); // Simulate form submission
    };

    const handleNo = () => {
        setShowPopup(false); // Close the popup
    };
  // Navigation
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1); // Navigate to the previous page
  };

  const handleNext = () => {
    navigate(1); // Navigate to the next page (if possible)
  };
  // Decimal Answers
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    const inputValue = e.target.value;

    // Allow only numbers, decimal points, and a single period
    if (/^\d*\.?\d*$/.test(inputValue)) {
      setValue(inputValue);
    }
  };
  // Single Option
  const [selectedOption, setSelectedOption] = useState(null);

  const handleCheckboxChange1 = (e) => {
    const { name } = e.target;
    setSelectedOption(name); // Set the selected option
  };
  // Multiple Option
  const [checkboxes, setCheckboxes] = useState({
    option1: false,
    option2: false,
    option3: false,
    option4: false,
  });

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setCheckboxes({ ...checkboxes, [name]: checked });
  };
  return (
    <>
      <div id="mainTestInterface">
        <div id="leftMainTestInterface">
          <h4>Question 1:</h4>
          <br />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero
            asperiores assumenda aliquid. Deleniti suscipit minima, sunt fuga
            atque veniam facilis quos eligendi odio sit non pariatur unde ea
            repellat nostrum sapiente praesentium optio possimus, vitae, quaerat
            doloremque fugit placeat. Ex.
          </p>
          <br />
          <ol type="1">
            <li>ANSWER1</li>
            <li>ANSWER2</li>
            <li>ANSWER3</li>
            <li>ANSWER4</li>
          </ol>
          {/* Multiple Correct Answers */}
          <div class="optionsMultipleCorrect">
            <form id>
              <label>
                <input
                  type="checkbox"
                  name="option1"
                  checked={checkboxes.option1}
                  onChange={handleCheckboxChange}
                />
                1
              </label>
              <br />
              <label>
                <input
                  type="checkbox"
                  name="option2"
                  checked={checkboxes.option2}
                  onChange={handleCheckboxChange}
                />
                2
              </label>
              <br />
              <label>
                <input
                  type="checkbox"
                  name="option3"
                  checked={checkboxes.option3}
                  onChange={handleCheckboxChange}
                />
                3
              </label>
              <br />
              <label>
                <input
                  type="checkbox"
                  name="option4"
                  checked={checkboxes.option4}
                  onChange={handleCheckboxChange}
                />
                4
              </label>
            </form>
          </div>
          <div class="optionsSingleCorrect">
            <form>
              <label>
                <input
                  type="checkbox"
                  name="option1"
                  checked={selectedOption === "option1"}
                  onChange={handleCheckboxChange1}
                />
                1
              </label>
              <br />
              <label>
                <input
                  type="checkbox"
                  name="option2"
                  checked={selectedOption === "option2"}
                  onChange={handleCheckboxChange1}
                />
                2
              </label>
              <br />
              <label>
                <input
                  type="checkbox"
                  name="option3"
                  checked={selectedOption === "option3"}
                  onChange={handleCheckboxChange1}
                />
                3
              </label>
              <br />
              <label>
                <input
                  type="checkbox"
                  name="option4"
                  checked={selectedOption === "option4"}
                  onChange={handleCheckboxChange1}
                />
                4
              </label>
            </form>
          </div>
          <div class="optionsDecimalType">
            <input type="text" value={value} onChange={handleChange} />
          </div>
          <div className="btnDiv">
          <button onClick={handleBack} className="btnNavigate">
            Back
          </button>
          <button onClick={handleNext} className="btnNavigate">
            Next
          </button>
          </div>
        </div>

        <div id="rightMainTestInterface">
          <h4>Time Remaining: </h4>
          <div className="actionButtons">
          <div><button className="btnAnswers greenbtn">SAVE & NEXT</button></div>
          <div><button className="btnAnswers">CLEAR</button></div>
          <div><button className="btnAnswers orangebtn">SAVE & MARK FOR REVIEW</button></div>
          <div><button className="btnAnswers bluebtn">MARK FOR REVIEW & NEXT</button></div>
          </div>
          <div class="responses"></div>
          <button className="btnSubmit btnAnswers" onClick={handleSubmitClick}>SUBMIT</button>
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
