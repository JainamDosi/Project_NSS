import React, { useEffect } from "react";
import "./index.css";
import { useState } from "react";

// import Nav from "../../web/NewNavbar/Nav";
// import logbg1 from "../../../assets/WELCOME_BACK.svg";
// import logbg2 from "../../../assets/Campus_Ambassador.svg";
import { message } from "antd";
import OtpInput from "react-otp-input";
// import background from "../../../assets/registration.webp";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function VerifyEmail() {
  // const [otp, setotp] = useState(Array(4).fill(""));
  const [active, setActive] = useState(false);
  const [IsCorrectOtp, setIsCorrectOtp] = useState(true);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [user, setUser] = useState({
    otp: "",
    type: "ca",
    user_id: localStorage.getItem("user_id"),
  });
  const [code, setCode] = useState("");

  const handleChange = (code) => {
    setCode(code);
  };
  let navigate = useNavigate();

  const Verify = async (e) => {
    e.preventDefault();
    console.log(Number(code));
    setUser({ ...user, otp: Number(code) });

    setLoading(true);
    
    try {
      const response = await axios.post(`/apiV1/verifyOTP`, {
        ...user,
        otp: Number(code),
      });
      const { data } = response;
      if (response.status === 201) {
        setLoading(false);
      }
      setLoading(false);
      navigate("/emailverified");
    } catch (err) {
      message.error("Invalid OTP");
      setLoading(false);
      const { data } = err?.response;
      console.log("register Error:", data);
      var errorData = "";
      setErrorMsg(errorData);
      setError(true);
      setLoading(false);
    }
  };
  useEffect(() => {
    if (code.length === 4) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [code]);
  return (
    <div style={{ overflowY: "hidden" }}>
      {/* <Nav /> */}
      <div>
        {/* <img className="otpBack" src={background} alt="back" /> */}
      </div>
      <div id="log_bg2" className="otpBox">
        {/* <img src={logbg1} id ="wel_log_back" alt="" />
        <img src={logbg2}  id="campus_ambd" /> */}
        <div className="otpContainer">
          <div className="verifyEmailText">Verify your Email</div>
          <div className="otpSent">
            A mail has been sent to the submitted email address. Check your
            inbox to verify your email address.
          </div>
          <div className="inputBoxes">
            <OtpInput
              value={code}
              onChange={handleChange}
              numInputs={4}
              shouldAutoFocus={true}
              renderSeparator={<span style={{ width: "8px" }}></span>}
              inputType="text"
              renderInput={(props) => <input {...props} />}
              inputStyle={{
                border: "1px solid black",
                borderRadius: "8px",
                width: "54px",
                height: "54px",
                fontSize: "12px",
                color: "#000",
                fontWeight: "400",
                caretColor: "blue",
              }}
            />
          </div>
          {IsCorrectOtp === false && <div>Incorrect OTP</div>}
          {/* <Button variant="outlined" size="small" onClick={Verify}>
        verify
      </Button> */}
          <button
            className="verify_btn"
            onClick={Verify}
            disabled={!active}
            style={
              active===true
                ? { background: "#ff5c00" }
                : { background: "rgb(204, 204, 204)" }
            }
          >
            verify
          </button>
          {/* <div className="resendOtp">
        <div>Haven’t received OTP yet?</div>
        <button>resend otp</button>
      </div> */}
        </div>
      </div>
    </div>
  );
}
