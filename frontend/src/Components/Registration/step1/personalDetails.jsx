import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./personalDetails.css";
import Select from "react-select";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Input } from "antd";

const gender_choice = ["Male", "Female", "Others"].map((state) => ({
  value: state,
  label: state,
}));

const PersonalDetails = () => {
  let navigate = useNavigate();
  const [active, setActive] = useState(false);
  const [confirm_err, setConfirm_err] = useState(false);
  const [mobile_check, setMobile_check] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [user, setUser] = useState({
    name: "",
    email: "",
    contact: "",
    gender: "",
    password: "",
    confirmpassword: "",
  });

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const confirm = (confirm) => {
    if (confirm === user.password) {
      setConfirm_err(false);
    } else {
      setConfirm_err(true);
    }
  };

  const clearInput = () => {
    setUser({
      name: "",
      email: "",
      // contact: "",
      // gender: "",
      password: "",
      confirmpassword: "",
    });
  };

  // const handleChange3 = (gender) => {
  //   setUser({ ...user, gender: gender?.value });
  // };

  // const validateMobileNumber = (e) => {
  //   if (e.target.value.length <= 10) {
  //     setMobile_check(true);
  //     setUser({ ...user, [e.target.name]: e.target.value });
  //     let mnumber = e.target.value;
  //     if (mnumber.length === 10) {
  //       setMobile_check(false);
  //     }
  //   }
  // };

  useEffect(() => {
    if (
      user.name &&
      user.email &&
      user.gender &&
      user.contact &&
      user.password &&
      user.confirmpassword &&
      user.password === user.confirmpassword &&
      user.contact.length === 10 &&
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(user.email)
    ) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [user]);

  const nextpage = () => {
    if (user.password !== user.confirmpassword) return;
    else {
      alert("Proceeding to the next step");
    }
  };

  return (
    <>
      <div className="personal">
        <div className="personal-steps">
          <div className="personal-step1">
            <div className="personal-step1-number">
              <div className="personal-step1-number-content">1</div>
            </div>
            <div className="personal-step1-description">
              <div className="personal-step1-description-content-para1">
                {/* Step 1/2 */}
              </div>
              <div className="personal-step1-description-content-para2">
                Personal Details
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="personal-inputs">
            <div className="personal-input1">
              <div>
                <input
                  className="input-field"
                  type="text"
                  placeholder="Name *"
                  name="name"
                  value={user.name}
                  required
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <div>
                <input
                  className="input-field"
                  type="email"
                  placeholder="Email ID *"
                  name="email"
                  value={user.email}
                  required
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="personal-input2">
              {/* <div>
                <Select
                  className="select-option"
                  placeholder="Select Gender*"
                  required
                  onChange={handleChange3}
                  options={gender_choice}
                  isSearchable={false}
                />
              </div> */}
              {/* <div>
                <input
                  type="number"
                  className="input-field"
                  name="contact"
                  placeholder="Phone Number *"
                  value={user.contact}
                  pattern="/^[6-9]{1}+[0-9]{9}$/"
                  required
                  onChange={(e) => validateMobileNumber(e)}
                />
                {mobile_check && (
                  <div className="text-danger">
                    Please enter a valid Mobile Number
                  </div>
                )}
              </div> */}
            </div>
            <div className="personal-input3">
              <div>
                <Input.Password
                  className="input-field"
                  type="password"
                  iconRender={(visible) =>
                    visible ? (
                      <EyeTwoTone style={{ color: "black" }} />
                    ) : (
                      <EyeInvisibleOutlined style={{ color: "black" }} />
                    )
                  }
                  placeholder="Create Password *"
                  name="password"
                  value={user.password}
                  required
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <div>
                <Input.Password
                  className="input-field"
                  type="password"
                  iconRender={(visible) =>
                    visible ? (
                      <EyeTwoTone style={{ color: "black" }} />
                    ) : (
                      <EyeInvisibleOutlined style={{ color: "black" }} />
                    )
                  }
                  placeholder="Confirm Password *"
                  name="confirmpassword"
                  value={user.confirmpassword}
                  required
                  onChange={(e) => {
                    onInputChange(e);
                    confirm(e.target.value);
                  }}
                />
                {confirm_err && (
                  <div className="text-danger">Password didn't match</div>
                )}
              </div>
            </div>
            {error && (
              <div
                className="text-danger"
                style={{ marginTop: "-10px" }}
                dangerouslySetInnerHTML={{ __html: errorMsg }}
              ></div>
            )}
          </div>

          <div className="personal-buttons">
            <button
              onClick={nextpage}
              className="personal-button-submit"
              disabled={!active}
              style={
                active
                  ? { background: "#ff5c00" }
                  : { background: "rgb(204, 204, 204)" }
              }
            >
              Next
            </button>
            <button className="personal-button-clear" onClick={clearInput}>
              Clear
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PersonalDetails;
