import React from 'react'
import './Navbar.css'
import NavLogo from '../../../assets/navbarLeft.svg'
const Navbar = () => {
  return (
    <div className='navMain'>
       <div>
            <img src={NavLogo} alt="navbarLogo"/>
       </div>
       <div style={{display:"flex",height:"100%",justifyContent:"center",alignItems:"center",marginRight:"40px"}}>
       <button className="registerNow">LOG IN</button>

       </div>
    </div>
  )
}

export default Navbar