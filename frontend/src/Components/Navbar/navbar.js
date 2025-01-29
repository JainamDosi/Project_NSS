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
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  return (
    <>
      <header className="navbar">
        <span id="one">NSS-JEE SERIES</span>
        {userInfo?.user?.role === "Admin" ? <Link to='/adminDashboard'>ADMIN D</Link> :  <Link to='/studentDashboard'>STUDENT</Link>}

       
        <button onClick={handlelogout}>LOG OUT</button>


      </header>
    </>
  )
};

export default Home;
