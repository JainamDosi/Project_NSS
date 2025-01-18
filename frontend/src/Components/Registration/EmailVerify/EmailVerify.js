import React from "react";
import "./EmailVerify.css";
// import Nav from "../../web/NewNavbar/Nav";
// import logbg1 from "../../../assets/welcome.webp";
// import logbg2 from "../../../assets/Campus_Ambassador.svg";
import { Link, useNavigate } from "react-router-dom";

const EmailVerify = () => {
  const navigate = useNavigate()
  return (
    <div id="emailroot">
      {/* <Nav id="navemailbar" /> */}
      <div id="log_bg12">
        {/* <img src={logbg1} className="emailVerifyBack" alt="" /> */}
        {/* <img src={logbg2} id="campus_ambd2" /> */}
        <div className="Box" id="box2_reg">
          <div className="Box2">
            <h2>
              <strong>Email Verified Successfully!</strong>
            </h2>
            <br />
            <br />
            <p>Voila! You have successfully verified your account.</p>

            {/* <Link to='/collegedetailes'> */}
            <button className="submit" onClick={()=>{navigate("/login")}}>
              <Link to="/login" className="reg-btn1">
                Login
              </Link>
            </button>
            {/* </Link> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerify;
