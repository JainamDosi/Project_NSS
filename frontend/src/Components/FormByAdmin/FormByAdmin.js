import React, { useState } from 'react';
import "./FormByAdmin.css"; 

function FormByAdmin() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [testDate, setTestDate] = useState("");
  const [testTime, setTestTime] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Combine test date and time into a single Date object
    const selectedDateTime = new Date(`${testDate}T${testTime}`);
    const currentDateTime = new Date();

    if (selectedDateTime > currentDateTime) {
      // Handle form submission logic
      const formData = {
        title,
        description,
        testDate,
        testTime,
      };
      console.log("Form submitted:", formData);
      alert("Form submitted successfully!");

      // Clear the form
      setTitle("");
      setDescription("");
      setTestDate("");
      setTestTime("");
    } else {
      alert("Please select a date and time in the future.");
    }
  };

  return (
    <>
      <div className="form-container">
        <h2>Test Details Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter the test title"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter the test description"
              required
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="testDate">Test Date:</label>
            <input
              type="date"
              id="testDate"
              value={testDate}
              onChange={(e) => setTestDate(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="testTime">Test Timing:</label>
            <input
              type="time"
              id="testTime"
              value={testTime}
              onChange={(e) => setTestTime(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="submit-button">Submit</button>
        </form>
      </div>
    </>
  );
}

export default FormByAdmin;
