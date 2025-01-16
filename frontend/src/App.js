import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./Components/landingPage/Home";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/landingPage" element={<LandingPage />} />    
        </Routes>          
      </Router>    
    </>
  );
}

export default App;
