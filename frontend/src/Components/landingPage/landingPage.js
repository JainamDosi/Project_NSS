import React from "react";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="landing-page bg-gray-50 min-h-screen text-gray-800">
      <header className="header bg-blue-600 text-white py-4">
        <div className="container mx-auto flex justify-between items-center px-4 md:px-8">
          <h1 className="text-2xl font-bold">JEE Mock Test</h1>
          <nav className="nav">
            <ul className="flex gap-4 text-sm md:text-base">
              <li>
                <a href="#features" className="hover:text-blue-300">
                  Features
                </a>
              </li>
              <li>
                <a href="#tests" className="hover:text-blue-300">
                  Tests
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-blue-300">
                  About
                </a>
              </li>
              <li>
                <Link to="/login" className="hover:text-blue-300">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/signUp" className="hover:text-blue-300">
                  SignUp
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <section className="hero bg-blue-100 py-12">
        <div className="container mx-auto text-center px-4 md:px-8">
          <h2 className="text-3xl font-bold mb-4">Prepare for JEE with Confidence</h2>
          <p className="text-lg mb-6">
            Access high-quality mock tests designed by experts to help you succeed.
          </p>
          <Link to="/studentDashboard" className="btn-primary inline-block bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-500">
            Get Started
          </Link>
        </div>
      </section>

      <section id="features" className="features py-12">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="text-2xl font-bold text-center mb-8">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="feature-item bg-white shadow-md p-6 rounded-lg text-center">
              <h3 className="text-xl font-bold mb-4">Real Exam Experience</h3>
              <p>Simulate the exact JEE environment to get exam-ready.</p>
            </div>
            <div className="feature-item bg-white shadow-md p-6 rounded-lg text-center">
              <h3 className="text-xl font-bold mb-4">Detailed Analytics</h3>
              <p>Identify your strengths and weaknesses with in-depth reports.</p>
            </div>
            <div className="feature-item bg-white shadow-md p-6 rounded-lg text-center">
              <h3 className="text-xl font-bold mb-4">Expert-Curated Questions</h3>
              <p>Practice with questions prepared by experienced educators.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="tests" className="tests py-12 bg-blue-50">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="text-2xl font-bold text-center mb-8">Available Tests</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="test-item bg-white shadow-md p-6 rounded-lg text-center">
              <h3 className="text-xl font-bold mb-4">Full-Length Mock Test</h3>
              <p>Simulate the complete JEE exam with this test.</p>
              <Link to="/studentDashboard" className="btn-secondary inline-block bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-500">
                Take Test
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="about py-12">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="text-2xl font-bold text-center mb-8">About Us</h2>
          <p className="text-center">
            We are dedicated to providing students with the best resources to crack JEE and achieve their dreams. With a team of experienced educators, we aim to make exam preparation effective and efficient.
          </p>
        </div>
      </section>

      <footer className="footer bg-blue-600 text-white py-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2025 JEE Mock Test. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
