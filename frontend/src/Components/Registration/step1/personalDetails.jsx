import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
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
  //Select whether Student or Admin 
  const [selectedRole, setSelectedRole] = useState(""); // State to track the selected role
  const Host = "http://localhost:5000/";

    const handleCheckboxChange = (role) => {
        setSelectedRole(role); // Update the state to the selected role
    };

  let navigate = useNavigate();
  const [active, setActive] = useState(false);
  const [confirm_err, setConfirm_err] = useState(false);
  const [mobile_check, setMobile_check] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [cradensital, setcradensital] = useState({
    email: "",
    password: "",
    cpassword: "",
    name: ""
  });

  const onInputChange = (e) => {
    setcradensital({ ...cradensital, [e.target.name]: e.target.value });
  };

  const confirm = (confirm) => {
    if (confirm === cradensital.password) {
      setConfirm_err(false);
    } else {
      setConfirm_err(true);
    }
  };

  const clearInput = () => {
    setcradensital({
      name: "",
      email: "",
      // contact: "",
      // gender: "",
      password: "",
      confirmpassword: "",
    });
  };
  useEffect(() => {
    if (localStorage.getItem('token') || !localStorage.getItem('token') === undefined) {
      navigate('/studentDashboard');
    }
  }, [navigate]);

  // const handleChange3 = (gender) => {
  //   setcradensital({ ...cradensital, gender: gender?.value });
  // };

  // const validateMobileNumber = (e) => {
  //   if (e.target.value.length <= 10) {
  //     setMobile_check(true);
  //     setcradensital({ ...cradensital, [e.target.name]: e.target.value });
  //     let mnumber = e.target.value;
  //     if (mnumber.length === 10) {
  //       setMobile_check(false);
  //     }
  //   }
  // };

  // useEffect(() => {
  //   if (
  //     cradensital.name &&
  //     cradensital.email &&
  //     cradensital.gender &&
  //     cradensital.contact &&
  //     cradensital.password &&
  //     cradensital.confirmpassword &&
  //     cradensital.password === cradensital.confirmpassword &&
  //     cradensital.contact.length === 10 &&
  //     /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(cradensital.email)
  //   ) {
  //     setActive(true);
  //   } else {
  //     setActive(false);
  //   }
  // }, [cradensital]);

  const nextpage = () => {
    if (cradensital.password !== cradensital.confirmpassword) return;
    else {
      alert("Proceeding to the next step");
    }
  };
  const handlesumit = async (e) => {
    e.preventDefault();
    console.log("handle sumit call");
    const response = await fetch(`${Host}api/users/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: cradensital.name,
        email: cradensital.email,
        password: cradensital.password
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      localStorage.setItem('token', json.token);
      // history("/home");
    } else {
      // history("/signup");
    }
  };


  return (
    <>
    <form onSubmit={handlesumit}>

      <div className="personal">
        <div className="personal-steps">
          <div className="personal-step1">
            {/* <div className="personal-step1-number">
              <div className="personal-step1-number-content">1</div>
              </div> */}
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
                  value={cradensital.name}
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
                  value={cradensital.email}
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
                  value={cradensital.contact}
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
                  value={cradensital.password}
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
                  value={cradensital.confirmpassword}
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
          {/* Student or Admin  */}
          {/* <div className="Role">
            <label>
                <input
                    type="checkbox"
                    name="role"
                    checked={selectedRole === "Student"}
                    onChange={() => handleCheckboxChange("Student")}
                />
                Student
            </label>
            <br />
            <label>
            <input
            type="checkbox"
                    name="role"
                    checked={selectedRole === "Admin"}
                    onChange={() => handleCheckboxChange("Admin")}
                />
                Admin
            </label>
        </div> */}
        


          <div className="personal-buttons">
            <button
            type="submit"
            // onClick={nextpage}
            className="personal-button-submit"
            disabled={active}
            
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

          
            <Link className="personal-button-clear" to="/login">
  Login
</Link>
            
           
            
          </div>
          
        </div>
      </div>
      </form>
    </>
  );
};

export default PersonalDetails;