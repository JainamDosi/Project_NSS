import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import './FormByAdmin.css';

function FormByAdmin() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [testDate, setTestDate] = useState('');
  const [testTime, setTestTime] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedDateTime = new Date(`${testDate}T${testTime}`);
    const currentDateTime = new Date();

    if (selectedDateTime <= currentDateTime) {
      alert('Please select a date and time in the future.');
      return;
    }

    const formData = {
      title,
      description,
      testDate,
      testTime,
    };

    console.log('Form submitted:', formData);

    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/tests/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        alert('Form submitted successfully!');
        console.log('Response from backend:', result);

        // Redirect to AdminDashBoard
        navigate('/adminDashBoard');
      } else {
        const errorData = await response.json();
        alert(`Failed to submit form: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred while submitting the form. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
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

        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
}

export default FormByAdmin;
