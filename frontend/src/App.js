import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./Components/Registration/step1/personalDetails";
import Login from "./Components/Registration/login/login";
import ForgotPassword from "./Components/Registration/ForgotPassword/ForgotPassword";
import EmailVerify from "./Components/Registration/EmailVerify/EmailVerify";
import RegistrationCompleted from "./Components/Registration/RegCompletedMsg/RegCompleted";
import VerifyEmail from "./Components/Registration/register/form";
import StudentDashboard from "./Components/studentDashboard/dash";
import AdminDashboard from "./Components/AdminDashBoard/adminDash";
function App() {
  return (
    <>
    {/* Hello */}
      <Router>
        <Routes>
        <Route path="/" element={<LandingPage />} />
          <Route path="/landingPage" element={<LandingPage />} />    
          <Route path="/verifyEmail" element={<VerifyEmail />} />    
          <Route path="/forgotPassword" element={<ForgotPassword/>} />    
          <Route path="/registrationComplete" element={<RegistrationCompleted/>} />    
          <Route path="/login" element={<Login />} />    
          <Route path="/emailVerify" element={<EmailVerify/>} />    
          <Route path="/studentDashboard" element={<StudentDashboard/>} />    
          <Route path="/adminDashboard" element={<AdminDashboard/>} />    
        </Routes>          
      </Router>    
    </>
  );
}

export default App;
