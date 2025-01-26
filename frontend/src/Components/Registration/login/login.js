import React, { useState,useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './login.css';


const Login = (props) => {
  let history = useNavigate();
  let navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token') || !localStorage.getItem('token') === undefined) {
      navigate('/studentDashboard');
    }
  }, [navigate]);

  const Host = "http://localhost:5000";
  const [cradensital, setcradensital] = useState({ email: "", password: "" });

  const handlesumit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${Host}/api/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: cradensital.email, password: cradensital.password }),
    });

    const json = await response.json();

    if (json.success) {
      localStorage.setItem('token', json.authtoken);
      localStorage.setItem("userInfo", JSON.stringify(json.data));

      // Check the user's role and redirect accordingly
      const User = JSON.parse(localStorage.getItem("userInfo"));
      if (User.user.role === 'Admin') {
        history("/adminDashboard");
      } else {
        history("/studentDashboard");
      }

      setTimeout(() => {
        window.location.reload();
      }, 500);
    } else {
      alert("Invalid credentials", "danger");
      history("/login");
    }
  };

  const onChange = (e) => {
    setcradensital({ ...cradensital, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handlesumit}>
      <div className='items-center justify-center'>
        <h1 className='text-4xl font-extralight text-center text-blue-400 mb-10 '>Login</h1>
        <div className='flex flex-col rounded-md gap-4 border-2 border-sky-300 rounded-x1 w-[600px] p-4 mx-auto loginbox'>
          <div className='my-0 rounded-md'>
            <label className='text-xl mr-10 my-2 text-gray-400'>Gmail</label>
            <input type='text' value={cradensital.email} onChange={onChange} id="email" name="email" className='border-2 rounded-md border-blue-400 px-4 py-2 w-full' />
          </div>
          <div className='my-0'>
            <label className='text-xl mr-10 my-2 rounded-md text-gray-400'>Password</label>
            <input type='password' value={cradensital.password} onChange={onChange} name='password' id="exampleInputPassword1" className='border-2 rounded-md border-blue-400 px-4 py-2 w-full' />
          </div>
          <div className="loginSignin">
            <button type="submit" className="btn btn-primary signInofLogin">Sign in</button>
            <Link to="/signUp" className="btn btn-primary signInofLogin">
              <button>Sign up</button>
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Login;
