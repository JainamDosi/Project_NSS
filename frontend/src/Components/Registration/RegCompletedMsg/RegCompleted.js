import React from "react";
import "../EmailVerify/EmailVerify.css";
// import Nav from "../../web/NewNavbar/Nav"
// import logbg1 from "../../../assets/WELCOME_BACK.svg"
// import logbg2 from "../../../assets/Campus_Ambassador.svg"
// import welcomebckbg from "../../../assets/welcome.webp";
import { Link } from "react-router-dom";

const RegisComp = () => {
  return (
    <>
      {/* <Nav /> */}
      {/* <img
        src={welcomebckbg}
        className="regcompleteback"
        id="welcomebckbg"
        alt=""
      /> */}
      <div id="log_bg1">
        <div className="Box">
          <div className="Box2">
            <h2>
              <strong>Registration Completed!</strong>
            </h2>
            <br />
            <br />
            <p>
              Voila! Your Registration for Campus Ambassador Program is
              successfully completed.
            </p>
            <button className="submit">
              <Link to="/login" className="reg-btn1">
                Go to Profile
              </Link>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisComp;
