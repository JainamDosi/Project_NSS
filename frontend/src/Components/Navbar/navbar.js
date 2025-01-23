import React from "react";
import { Link,useNavigate } from "react-router-dom";
import "./navbar.css";

const Home = () => {
  const handlelogout=()=>{
    localStorage.removeItem('token')
    localStorage.removeItem('userInfo')
    navigate('/login')
  }
  const navigate = useNavigate();
  return (
    <>
      <header className="navbar">
        <span id="one">JEE SERIES</span>
        <span id="two">NAME</span>
        <button onClick={handlelogout}>LOG OUT</button>


      </header>
    </>
  )
};

export default Home;
