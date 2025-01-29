import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./Components/Registration/step1/personalDetails";
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
import QuestionForm from "./Components/questionForm/questionForm";
import LandingPage from "./Components/landingPage/landingPage";
import Random from "./Components/Test/testInterface/random";
import TestResponseDetails from './Components/Analysis/analysis';
// import TestQuestionForm from './Components/questionForm/TestQuestionbank';

import Adminviewtest from './Components/questionForm/Adminviewtest';
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
          <Route path="/signup" element={<SignUp />} />    
          {/* <Route path="/registrationComplete" element={<RegistrationCompleted/>} />     */}
          <Route path="/login" element={<Login />} />    
          <Route path="/studentDashboard" element={<StudentDashboard/>} />    
          <Route path="/adminDashboard" element={<AdminDashboard/>} />    
          <Route path="/testInstructions/:testId" element={<TestInstructions/>} />    
          <Route path="/testInterface/:testId" element={<TestInterface/>} />    
          <Route path="/formByAdmin" element={<FormByAdmin/>} />    
          <Route path="/questionForm/:testId" element={<QuestionForm/>} />    
          <Route path="/Adminviewtest/:testId" element={<Adminviewtest/>} />    
          <Route path="/random" element={<Random/>} />   
          <Route path="/analysis/:testId/:userId" element={<TestResponseDetails/>} />
        </Routes>          
      </Router>    
    </>
  );
}

export default App;
