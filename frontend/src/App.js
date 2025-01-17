import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./Components/landingPage/Home";
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
          <Route path="/studentDashboard" element={<StudentDashboard/>} />    
          <Route path="/adminDashboard" element={<AdminDashboard/>} />    
        </Routes>          
      </Router>    
    </>
  );
}

export default App;
