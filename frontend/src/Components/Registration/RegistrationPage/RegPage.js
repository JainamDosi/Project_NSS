import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RegPage.css";
import Navbar from "../Navbar/Navbar";
import Personal from "../step1/personalDetails";
import OTP from "../register/form";
import EmailVerifyMsg from "../EmailVerify/EmailVerify";
import CollegeDetails from "../CollegeDetailes/Collegedetailes";
import RegisComp from "../RegCompletedMsg/RegCompleted";
import Login from "../login/login";
import ForgotPassword from "../ForgotPassword/ForgotPassword";
// import NavLogo from '../../../assets/navbarLeft.svg'
import logtr from "../../../assets/logtr.png";
import logbg from "../../../assets/logbg.png";
import regr from "../../../assets/regr.png";
import camamb from "../../../assets/camamb.png";

const RegPage = () => {
  const [active, setActive] = useState("PersonalDetailsPage");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formValid, setFormValid] = useState(true);
  const [passwordsMatch, setPasswordsMatch] = useState(false);
  const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);

  const navigate = useNavigate();

  const [otp, setotp] = useState(Array(4).fill(""));
  const [IsCorrectOtp, setIsCorrectOtp] = useState(true);

  const HandleChange = (element, index) => {
    setotp([...otp.map((d, idx) => (idx === index ? element.value : d))]);
    if (element.value === "") {
      return element.focus();
    } else if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };
  const Verify = function () {
    const NewOtp = otp.join("");
    setIsCorrectOtp(false);
    // if (NewOtp === otpsent) {
    //   return
    // }
  };

  const handleChangeName = (event) => {
    setName(event.target.value);
  };

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleChangePhone = (event) => {
    setPhone(event.target.value);
  };

  const handleChangeGender = (event) => {
    setGender(event.target.value);
  };

  const handleChangePassword = (event) => {
    const newPassword = event.target.value;
    setPasswordTouched(true);
    setPassword(newPassword);
    validatePasswordMatch(newPassword, confirmPassword);
  };

  const handleChangeConfirmPassword = (event) => {
    const newConfirmPassword = event.target.value;
    setConfirmPasswordTouched(true);
    setConfirmPassword(newConfirmPassword);
    validatePasswordMatch(password, newConfirmPassword);
  };

  const validatePasswordMatch = (pwd, confirmPwd) => {
    setPasswordsMatch(pwd === confirmPwd);
  };

  const handleSubmitPersonalDetails = (e) => {
    e.preventDefault();

    if (
      name.trim() === "" ||
      email.trim() === "" ||
      gender === "" ||
      phone.trim() === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      setFormValid(false);
      return;
    }

    if (passwordsMatch == false) {
      setFormValid(false);
      return;
    }

    setFormValid(true);
    // setActive('VerifyEmail');
    setActiveVerifyEmail(formValid);
  };

  const setActiveVerifyEmail = (formValid) => {
    if (formValid) {
      setActive("VerifyEmail");
    }
  };

  const options = [
    { value: "Gender 1", label: "Gender 1" },
    { value: "Gender 2", label: "Gender 2" },
    { value: "Gender 3", label: "Gender 3" },
  ];

  const [selectedOption, setSelectedOption] = useState("");
  const [showOptions, setShowOptions] = useState(false);

  const handleSelect = (option) => {
    setSelectedOption(option);
    setShowOptions(false);
    setGender(option);
  };

  return (
    <>
      <div className="regpage">
        <>
          <div className="NavMain">
            <div>
              <img src={logtr} id="trl" alt="navbarLogo" />
              <img src={logbg} id="trb" alt="" />
            </div>
            <div
              style={{
                display: "flex",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
                marginRight: "40px",
              }}
            >
              <button
                onClick={() => setActive("LogIn")}
                className="registerNow"
                id="registerNow"
              >
                LOG IN
              </button>
            </div>
          </div>
        </>
        <div className="regpage-register">
          <div className="regpage-pages">
            {active === "PersonalDetailsPage" && (
              <>
                <div className="personal">
                  <div className="personal-steps">
                    <div className="personal-step1">
                      <div className="personal-step1-number">
                        <div className="personal-step1-number-content">1</div>
                      </div>
                      <div className="personal-step1-description">
                        <div className="personal-step1-description-content-para1">
                          Step 1/2
                        </div>
                        <div className="personal-step1-description-content-para2">
                          Personal Details
                        </div>
                      </div>
                    </div>
                    <div className="personal-step2">
                      <div className="personal-step2-number">
                        <div className="personal-step2-number-content">2</div>
                      </div>
                      <div className="personal-step2-description">
                        <div className="personal-step2-description-content-para1">
                          Step 2/2
                        </div>
                        <div className="personal-step2-description-content-para2">
                          College Details
                        </div>
                      </div>
                    </div>
                  </div>

                  <form onSubmit={handleSubmitPersonalDetails}>
                    <div className="personal-inputs">
                      <div className="personal-input1">
                        <div>
                          <input
                            className="input-field"
                            type="text"
                            placeholder="Name *"
                            required
                            value={name}
                            onChange={handleChangeName}
                          />
                        </div>
                        <div>
                          <input
                            className="input-field"
                            type="email"
                            placeholder="Email ID *"
                            required
                            value={email}
                            onChange={handleChangeEmail}
                          />
                        </div>
                      </div>
                      <div className="personal-input2">
                        {/*
              <select
              defaultValue={""}
              className="input-field select-field"
              required
              value={gender}
              onChange={handleChangeGender}
              >
                <option value="" disabled hidden>
                  Gender *
                </option>
                <option className="select-option" value="Gender 1">
                  Gender 1
                </option>
                <option className="select-option" value="Gender 2">
                  Gender 2
                </option>
                <option className="select-option" value="Gender 3">
                  Gender 3
                </option>
              </select>
             */}
                        <div
                          className="custom-select input-field ca-gender "
                          onClick={() => setShowOptions(!showOptions)}
                        >
                          <div className="selected-option">
                            {selectedOption || "Gender *"}
                            {/* <span className="dropdown-icon">&#9660;</span> */}
                          </div>

                          {showOptions && (
                            <ul className="options">
                              {options.map((option) => (
                                <li
                                  key={option.value}
                                  className="select-option"
                                  onClick={() => handleSelect(option.label)}
                                >
                                  {option.label}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>

                        <div>
                          <input
                            className="input-field"
                            name="phone"
                            placeholder="Phone Number *"
                            required
                            value={phone}
                            onChange={handleChangePhone}
                            pattern="[1-9]{1}[0-9]{9}"
                          />
                        </div>
                      </div>
                      <div className="personal-input3">
                        <div>
                          <input
                            className="input-field"
                            type="password"
                            placeholder="Create Password *"
                            required
                            value={password}
                            onChange={handleChangePassword}
                          />
                        </div>
                        <div>
                          <input
                            className="input-field"
                            type="password"
                            placeholder="Confirm Passpwrd *"
                            required
                            value={confirmPassword}
                            onChange={handleChangeConfirmPassword}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="personal-buttons">
                      <button type="submit" className="personal-button-submit">
                        Submit
                      </button>
                      <button type="button" className="personal-button-clear">
                        Clear
                      </button>
                    </div>
                  </form>
                  {confirmPasswordTouched &&
                    passwordTouched &&
                    !passwordsMatch && (
                      <span style={{ color: "red" }}>
                        Passwords do not match.
                      </span>
                    )}
                  {!formValid && (
                    <div className="error-message">
                      Please fill out all fields.
                    </div>
                  )}
                </div>
              </>
            )}
            {active === "VerifyEmail" && (
              <>
                <form onSubmit={() => setActive("EmailVerifiedMsg")}>
                  <div className="otpContainer">
                    <div className="verifyEmailText">Verify your Email</div>
                    <div className="otpSent">
                      A mail has been sent to the submitted email address. Check
                      your inbox to verify your email address.
                    </div>
                    <div className="inputBoxes">
                      {otp.map((data, index) => {
                        return (
                          <input
                            type="number"
                            onChange={(e) => HandleChange(e.target, index)}
                            key={index}
                            maxLength="1"
                            value={data}
                            onFocus={(e) => e.target.select()}
                            required
                          />
                        );
                      })}
                    </div>
                    {IsCorrectOtp === false && <div>Incorrect OTP</div>}
                    {/* <Button variant="outlined" size="small" onClick={Verify}>
        verify
      </Button> */}

                    {/* <button type="submit">verify</button> */}

                    <button
                      onClick={() => setActive("EmailVerifiedMsg")}
                      id="verify"
                    >
                      Verify
                    </button>

                    <div className="resendOtp">
                      <div>Haven’t received OTP yet?</div>
                      {/* <Button>Resend otp</Button> */}
                      <button id="otp">Resend</button>
                    </div>
                  </div>
                </form>
              </>
            )}
            {active === "EmailVerifiedMsg" && (
              <>
                <div className="Box">
                  <div className="Box2">
                    <h2>
                      <strong>Email Verified Successfully!</strong>
                    </h2>
                    <p>Voila! You have successfully verified your account.</p>

                    <button
                      onClick={() => setActive("CollegeDetailsPage")}
                      className="submit"
                    >
                      Continue Registration
                    </button>
                  </div>
                </div>
              </>
            )}
            {active === "CollegeDetailsPage" && (
              <>
                <div className="college">
                  <div className="college-steps">
                    <div className="college-step1">
                      <div className="college-step1-number">
                        <div className="college-step1-number-content">1</div>
                      </div>
                      <div className="college-step1-description">
                        <div className="college-step1-description-content-para1">
                          Step 1/2
                        </div>
                        <div className="college-step1-description-content-para2">
                          Personal Details
                        </div>
                      </div>
                    </div>
                    <div className="college-step2">
                      <div className="college-step2-number">
                        <div className="college-step2-number-content">2</div>
                      </div>
                      <div className="college-step2-description">
                        <div className="college-step2-description-content-para1">
                          Step 2/2
                        </div>
                        <div className="college-step2-description-content-para2">
                          College Details
                        </div>
                      </div>
                    </div>
                  </div>

                  <form onSubmit={() => setActive("RegistrationCompletedMsg")}>
                    <div className="college-inputs">
                      <div className="college-input1">
                        <div>
                          <select
                            defaultValue={""}
                            className="input-field select-field"
                            id="rgs-state-uks"
                            required
                          >
                            <option value="" disabled hidden>
                              State *
                            </option>
                            <option className="select-option" value="Gender 1">
                              Uttar Pradesh
                            </option>
                            <option className="select-option" value="Gender 2">
                              Delhi
                            </option>
                            <option className="select-option" value="Gender 3">
                              Gujrat
                            </option>
                          </select>
                        </div>
                        <div>
                          <select
                            defaultValue={""}
                            className="input-field select-field"
                            id="rgs-district-uks"
                            required
                          >
                            <option value="" disabled hidden>
                              District *
                            </option>
                            <option className="select-option" value="Gender 1">
                              Lucknow
                            </option>
                            <option className="select-option" value="Gender 2">
                              Gorakhpur
                            </option>
                            <option className="select-option" value="Gender 3">
                              Kanpur
                            </option>
                          </select>
                        </div>
                      </div>
                      <div className="college-input2">
                        <div id="reg-college-1">
                          <select
                            defaultValue={""}
                            className="input-field select-field"
                            id="reg-college-2"
                            required
                          >
                            <option value="" disabled hidden>
                              College Name *
                            </option>
                            <option className="select-option" value="Gender 1">
                              IIT K
                            </option>
                            <option className="select-option" value="Gender 2">
                              IIT D
                            </option>
                            <option className="select-option" value="Gender 3">
                              IIT M
                            </option>
                          </select>
                        </div>
                      </div>
                      <div className="college-input3">
                        <div>
                          <input
                            className="input-field"
                            type=""
                            placeholder="Branch *"
                            required
                          />
                        </div>
                        <div>
                          <input
                            className="input-field"
                            type=""
                            placeholder="Year *"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="college-buttons">
                      <button type="submit" className="college-button-submit">
                        Submit
                      </button>
                      <button type="button" className="college-button-clear">
                        Clear
                      </button>
                    </div>
                  </form>
                </div>
              </>
            )}
            {active === "RegistrationCompletedMsg" && (
              <>
                <div className="Box">
                  <div className="Box2">
                    <h2>
                      <strong>Registration Completed!</strong>
                    </h2>
                    <p>
                      Voila! Your Registration for Campus Ambassador Program is
                      successfully completed.
                    </p>

                    <button className="submit">Go to Leaderboard</button>
                  </div>
                </div>
              </>
            )}
            {active === "LogIn" && (
              <>
                <div id="bg">
                  <div id="box">
                    <div id="center">
                      <div id="login">Log In</div>
                      <form onSubmit={() => console.log("hehe")} id="form">
                        <input
                          type="email"
                          name="myEmail"
                          placeholder="Email Id *"
                          id="email1"
                          required
                        />

                        <input
                          type="password"
                          name="myEmail"
                          placeholder="Password *"
                          id="password1"
                          required
                        />

                        <div
                          onClick={() => setActive("ForgotPassword")}
                          id="forget"
                        >
                          Forgot Password?
                        </div>

                        <button type="submit" id="log">
                          Log In
                        </button>
                      </form>
                      <div id="niche">
                        <div id="bottom">Don't have an account?</div>
                        <div
                          onClick={() => setActive("PersonalDetailsPage")}
                          id="register"
                        >
                          {" "}
                          Register Now!
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
            {active === "ForgotPassword" && (
              <>
                <div className="forgot">
                  <h2>
                    <strong>Forgot Password</strong>
                  </h2>
                  <p>
                    Don't worry! It happens. Please enter the Email through
                    which you had registered.
                  </p>
                  <form>
                    <label>
                      <input
                        className="email"
                        placeholder="Email Id*"
                        type="text"
                      />
                    </label>
                    <button type="submit" className="send">
                      Send Email
                    </button>
                  </form>

                  <div className="message">
                    <p>
                      A mail has been sent to the submitted email address. Check
                      your inbox to reset your password.
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default RegPage;
