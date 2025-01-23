import React from 'react';
import './landingPage.css';
import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <div className="landing-page">
      <header className="header">
        <div className="container">
          <h1 className="logo">JEE Mock Test</h1>
          <nav className="nav">
            <ul>
              <li><a href="#features">Features</a></li>
              <li><a href="#tests">Tests</a></li>
              <li><a href="#about">About</a></li>
              {/* <li><a href="#contact">Contact</a></li> */}
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/signUp">SignUp</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <section className="hero">
        <div className="container">
          <h2>Prepare for JEE with Confidence</h2>
          <p>Access high-quality mock tests designed by experts to help you succeed.</p>
          <Link to="studentDashboard" className="btn-primary">Get Started</Link>
        </div>
      </section>

      <section id="features" className="features">
        <div className="container">
          <h2>Why Choose Us?</h2>
          <div className="feature-list">
            <div className="feature-item">
              <h3>Real Exam Experience</h3>
              <p>Simulate the exact JEE environment to get exam-ready.</p>
            </div>
            <div className="feature-item">
              <h3>Detailed Analytics</h3>
              <p>Identify your strengths and weaknesses with in-depth reports.</p>
            </div>
            <div className="feature-item">
              <h3>Expert-Curated Questions</h3>
              <p>Practice with questions prepared by experienced educators.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="tests" className="tests">
        <div className="container">
          <h2>Available Tests</h2>
          <p>Choose from a variety of mock tests tailored to different levels of preparation.</p>
          <div className="test-list">
            <div className="test-item">
              <h3>Full-Length Mock Test</h3>
              <p>Simulate the complete JEE exam with this test.</p>
              <Link to="/studentDashboard" className="btn-secondary">Take Test</Link>
            </div>
            {/* <div className="test-item">
              <h3>Subject-Wise Test</h3>
              <p>Focus on individual subjects to strengthen your concepts.</p>
              <a href="#" className="btn-secondary">Take Test</a>
            </div> */}
            {/* <div className="test-item">
              <h3>Topic-Wise Test</h3>
              <p>Practice specific topics and improve step-by-step.</p>
              <a href="#" className="btn-secondary">Take Test</a>
            </div> */}
          </div>
        </div>
      </section>

      <section id="about" className="about">
        <div className="container">
          <h2>About Us</h2>
          <p>We are dedicated to providing students with the best resources to crack JEE and achieve their dreams. With a team of experienced educators, we aim to make exam preparation effective and efficient.</p>
        </div>
      </section>

      {/* <section id="contact" className="contact">
        <div className="container">
          <h2>Contact Us</h2>
          <p>Have any questions? Feel free to reach out to us!</p>
          <form className="contact-form">
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email" required />
            <textarea placeholder="Your Message" required></textarea>
            <button type="submit" className="btn-primary">Send Message</button>
          </form>
        </div>
      </section> */}

      <footer className="footer">
        <div className="container">
          <p>&copy; 2025 JEE Mock Test. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
