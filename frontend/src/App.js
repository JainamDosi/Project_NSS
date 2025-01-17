import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./Components/landingPage/Home";
import StudentDashboard from "./Components/studentDashboard/dash";
function App() {
  return (
    <>
    {/* Hello */}
      <Router>
        <Routes>
        <Route path="/" element={<LandingPage />} />
          <Route path="/landingPage" element={<LandingPage />} />    
          <Route path="/studentDashboard" element={<StudentDashboard/>} />    
        </Routes>          
      </Router>    
    </>
  );
}

export default App;
