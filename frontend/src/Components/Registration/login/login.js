import React, { useState,useEffect } from "react";
import "./login.css";
import "./mobile_login.css";
// import Nav from "../../web/NewNavbar/Nav";
// import MobNavbar from "../../mobile/Navbar/MobNavbar";
// import logbg1 from "../../../assets/WELCOME_BACK.svg";
// import logbg2 from "../../../assets/Campus_Ambassador.svg";
// import welcomebckbg from "../../../assets/welcomebckbg.webp";
import { Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import SimpleReactValidator from "simple-react-validator";
// import { login, fetchEvents, fetchUser } from "../../User/UserActions";
import { connect } from "react-redux";
import axios from "axios";
// import Loader from "../../Loader/Loader";
// import setAuthToken from "../../User/setAuthToken";

const Login = (props) => {
  // const passwordInputStyle = {
  //   outline: "none",
  //   border: "none",
  //   background: "transparent",
  //   borderBottom: "1px solid white",
  //   padding: "10px 12px",
  //   color: "white",
  //   marginTop: "20px",
  // };

  let navigate = useNavigate();

  const validator = new SimpleReactValidator();

  const [user, setUser] = useState({
    email: "",
    password: "",
    type: "ca",
  });

  const [active, setActive] = useState(false);
  const [error, setError] = useState(false);
  const [verifiederror, setVerifiederror] = useState(false);
  const [notFoundError, setNotFoundError] = useState(false);
  const [loading, setLoading] = useState(false);

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (validator.allValid()) {
      setLoading(true);
      await axios
        .post("/api-token-auth/", user)
        .then((res) => {
          if (res.status === 200) {
            if (res.data.status === "not_verified") {
              setLoading(false);
              setVerifiederror(true);
              setNotFoundError(false);
              
            } else if (res.data.error === "CA not found") {
              setNotFoundError(true);
              setVerifiederror(false);
              setLoading(false);
            } else {
              // props.login(res.data);
              props.login(res.data);
              props.fetchUser(res.data);
              // props.fetchEvents();
              // localStorage.setItem("token", res.data?.access);
              // setAuthToken(localStorage.getItem("token"));
              navigate(`/newprofile`);
              // console.log(res);
            }
            setLoading(false);
          } else if (res.status === 400) {
            setError(true);
            // console.log(res);
            setLoading(false);
          }
        })
        .catch((err) => {
          setLoading(false);
          setError(true);
        });
    } else {
      validator.showMessages();
    }
  };

  useEffect(() => {
    if(user.email && user.password && /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(user.email) ){
      setActive(true)
    }else{
      setActive(false);
    }
  }, [user])

  return (
    <>
      {/* {loading && <Loader />} */}
      {/* <MobNavbar id="nav1bar" /> */}
      {/* <Nav /> */}
      {/* <img src={welcomebckbg} id="welcomebckbg" alt="" /> */}
      <div id="bg">
        <div id="log_bg1">
          {/* <img src={logbg1} id="wel_log_back" alt="" />
          <img src={logbg2} id="campus_ambd" /> */}
          <div id="box">
            <div id="center">
              <div id="login">Log In</div>
              <form  id="form" onSubmit={(e) => onSubmit(e)}>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Id *"
                  id="email1"
                  value={user.email}
                  required
                  onChange={(e) => onInputChange(e)}
                />
                {validator.message("email", user.email, "required|email", {
                  className: "text-danger",
                })}
                <input
                  type="password"
                  name="password"
                  placeholder="Password *"
                  id="password1"
                  value={user.password}
                  required
                  onChange={(e) => onInputChange(e)}
                />
              {/* <div id="forget"> */}
              <Link to="/forgotpassword" id="forget">
                Forgot Password?
              </Link>
              {/* </div> */}

              <button type="submit" id="log" disabled={!active} style={active == true ? {background: "#ff5c00"} : {background: "rgb(204, 204, 204)"}}>
                Log In
              </button>
              </form>
              {error && (
                <div className="text-danger">Email/Password is Incorrect</div>
              )}
              {verifiederror && (
                <div className="text-danger">
                  User is not verified. Please check registered mail.
                </div>
              )}
              {notFoundError && (
                <div className="text-danger">
                  <div className="text-info">
                    You are not registered as a CA.
                  </div>
                </div>
              )}
              <div id="niche">
                <div id="bottom">Don't have an account?</div>
                <Link to="/registration">
                  <div id="register"> Register Now!</div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    // login: (id) => dispatch(login(id)),
    // login: (id) => dispatch(login(id)),
    // fetchUser: (id) => dispatch(fetchUser(id)),
    // fetchEvents: (id) => dispatch(fetchEvents()),
  };
};

export default connect(null, mapDispatchToProps)(Login);
// export default Login;
