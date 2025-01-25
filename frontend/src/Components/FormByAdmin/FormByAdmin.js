import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import './FormByAdmin.css';

function FormByAdmin() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [testDate, setTestDate] = useState('');
  const [testTime, setTestTime] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate
   
  useEffect(() => {
    if (!localStorage.getItem('token') || localStorage.getItem('token') === undefined) {
      navigate('/login');
    }
  }, [navigate]);

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
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-3xl font-semibold text-center text-gray-700 mb-6">Test Details Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-lg font-medium text-gray-600">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter the test title"
            required
            className="mt-2 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-lg font-medium text-gray-600">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter the test description"
            required
            className="mt-2 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          ></textarea>
        </div>

        <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="testDate" className="block text-lg font-medium text-gray-600">Test Date:</label>
            <input
              type="date"
              id="testDate"
              value={testDate}
              onChange={(e) => setTestDate(e.target.value)}
              required
              className="mt-2 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="testTime" className="block text-lg font-medium text-gray-600">Test Timing:</label>
            <input
              type="time"
              id="testTime"
              value={testTime}
              onChange={(e) => setTestTime(e.target.value)}
              required
              className="mt-2 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          className={`w-full mt-6 py-3 px-4 text-white font-semibold rounded-lg shadow-md ${loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'}`}
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
}

export default FormByAdmin;
