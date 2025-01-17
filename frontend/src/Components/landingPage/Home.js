import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <>
      <div id="main">
        <div class="box">
          <div class="pallete">
            <span class="text">WHO ARE YOU?</span>
            <span class="options">
              <button class="btn admin">ADMIN</button>
              <button class="btn student">STUDENT</button>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
