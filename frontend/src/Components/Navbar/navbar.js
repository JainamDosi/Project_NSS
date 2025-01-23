import React from "react";
import { Link,Navigate,useNavigate } from "react-router-dom";
import "./navbar.css";

const Home = () => {
  const handlelogout=()=>{
    localStorage.removeItem('token')
    Navigate('/')
  }
  return (
    <>
      <header className="navbar">
        <span id="one">JEE SERIES</span>
        <span id="two">NAME</span>
        <span id="three"><button onclick="handlelogout">LOG OUT</button></span>
      </header>
    </>
  );
};

export default Home;
