import React from "react";
import "./index.css";
import VerifyEmail from "./form";

const Register = () => {
  return (
    <main className="registerPageContainer">
      <div className="registration">
        <div className="title">REGISTRATION</div>
        <div className="subtitle">Campus Ambassador</div>
      </div>
      <div className="formContainer">
        <VerifyEmail />
      </div>
    </main>
  );
};

export default Register;
