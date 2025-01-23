import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./personalDetails.css";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Input } from "antd";

const PersonalDetails = () => {
  const [formDetails, setFormDetails] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    confirmPasswordError: false,
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormDetails((prevDetails) => ({ ...prevDetails, [name]: value }));

    // Check password match for confirmPassword
    if (name === "confirmPassword") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPasswordError: value !== formDetails.password,
      }));
    }
  };

  const clearInput = () => {
    setFormDetails({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setErrors({ confirmPasswordError: false });
  };

  const isFormValid =
    formDetails.name &&
    formDetails.email &&
    formDetails.password &&
    formDetails.confirmPassword &&
    !errors.confirmPasswordError;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`http://localhost:5000/api/users/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formDetails.name,
        email: formDetails.email,
        password: formDetails.password,
      }),
    });

    const json = await response.json();
    if (json.success) {
      localStorage.setItem("token", json.authtoken);
      navigate("/studentDashboard");
    } else {
      alert("Sign-up failed. Please check your details and try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="personal">
        <div className="personal-steps">
          <div className="personal-step1">
            <div className="personal-step1-description">
              <div className="personal-step1-description-content-para2">
                Personal Details
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="personal-inputs">
            {/* Name Input */}
            <div className="personal-input1">
              <input
                className="input-field"
                type="text"
                placeholder="Name *"
                name="name"
                value={formDetails.name}
                required
                onChange={handleInputChange}
              />

              {/* Email Input */}
              <input
                className="input-field"
                type="email"
                placeholder="Email ID *"
                name="email"
                value={formDetails.email}
                required
                onChange={handleInputChange}
              />
            </div>

            {/* Password Input */}
            <div className="personal-input3">
              <Input.Password
                className="input-field"
                placeholder="Create Password *"
                name="password"
                value={formDetails.password}
                required
                onChange={handleInputChange}
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
              <Input.Password
                className="input-field"
                placeholder="Confirm Password *"
                name="confirmPassword"
                value={formDetails.confirmPassword}
                required
                onChange={handleInputChange}
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
              {errors.confirmPasswordError && (
                <div className="text-danger">Passwords do not match</div>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="personal-buttons">
            <button
              type="submit"
              className="personal-button-submit"
              disabled={!isFormValid}
              style={{
                backgroundColor: isFormValid ? "#ff5c00" : "rgb(204, 204, 204)",
                cursor: isFormValid ? "pointer" : "not-allowed",
              }}
            >
              Sign Up
            </button>
            <button
              type="button"
              className="personal-button-clear"
              onClick={clearInput}
            >
              Clear
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PersonalDetails;
