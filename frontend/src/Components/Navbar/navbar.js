import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

const Home = () => {
  return (
    <>
      <header className="navbar">
        <span id="one">JEE SERIES</span>
        <span id="two">NAME</span>
        <span id="three"><Link to="/">LOG OUT</Link></span>
      </header>
    </>
  );
};

export default Home;
