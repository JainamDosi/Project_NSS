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
import TestInstructions from "./Components/Test/testInstructions/testInstructions";
import TestInterface from "./Components/Test/testInterface/testInterface";
import FormByAdmin from "./Components/FormByAdmin/FormByAdmin";
function App() {
  return (
    <>
    {/* Hello */}
      <Router>
        <Routes>
          {/* <Route path="/verifyEmail" element={<VerifyEmail />} />     */}
          {/* <Route path="/forgotPassword" element={<ForgotPassword/>} />     */}
          {/* <Route path="/emailVerify" element={<EmailVerify/>} />     */}
        <Route path="/" element={<LandingPage />} />
          <Route path="/landingPage" element={<LandingPage />} />    
          <Route path="/registrationComplete" element={<RegistrationCompleted/>} />    
          <Route path="/login" element={<Login />} />    
          <Route path="/studentDashboard" element={<StudentDashboard/>} />    
          <Route path="/adminDashboard" element={<AdminDashboard/>} />    
          <Route path="/testInstructions" element={<TestInstructions/>} />    
          <Route path="/testInterface" element={<TestInterface/>} />    
          <Route path="/formByAdmin" element={<FormByAdmin/>} />    
        </Routes>          
      </Router>    
    </>
  );
}

export default App;
