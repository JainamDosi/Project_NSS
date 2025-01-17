import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div id="main">
        <div className="box">
          <div className="pallete">
            <span className="text">WHO ARE YOU?</span>
            <span className="options">
              <button className="btn admin"><Link to="/adminDashboard">ADMIN</Link></button>
              <button className="btn student"><Link to="/studentDashboard">STUDENT</Link></button>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
