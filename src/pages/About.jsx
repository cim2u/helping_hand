import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../style/About.css";
import "../style/Logo.module.css";
import logo from "../assets/Logo.png";
import helpinghand from "../assets/HELPINGHand.png";

function About() {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isFirstVisit, setIsFirstVisit] = useState(true); // default to true on first mount
  const [isRegistered, setIsRegistered] = useState(localStorage.getItem("isRegistered") === "true"); // Check if user is registered

  // Check login status and update visit state
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsLoggedIn(true);
      setIsFirstVisit(false); // user already visited/logged in before
    } else {
      setIsLoggedIn(false);
      setIsFirstVisit(true); // first-time or not logged in
    }

    const hasVisited = localStorage.getItem("isRegistered");
    if (!hasVisited) {
      setIsFirstVisit(true);
      localStorage.setItem("isRegistered", "true"); // First time visit, set as registered
    }
  }, []);

  const handleNavigation = (page) => {
    navigate(`/${page}`);
  };

  return (
    <div className="account-info-wrapper">
      <div className="about-container">
        {/* Header */}
        <div className="about-header">
          <div className="about-header-1"></div>
          <div className="logo-container">
            <img src={logo} alt="HelpingHand Logo" className="logo" />
          </div>
        </div>

        {/* Navigation Links */}
        <div className="nav-container">
          <nav className="nav-links-h">
            <a href="#" onClick={() => handleNavigation("about")}>About</a>
            <a href="#" onClick={() => handleNavigation("support")}>Support</a>
            <a href="#" onClick={() => handleNavigation("home")}>Home</a>
          </nav>
        </div>

        {/* Main Content */}
        <div className="about-content">
          <div className="text-section">
            <h1 className="welcome-text">Welcome to</h1>
            <img src={helpinghand} alt="HelpingHand!" className="helping-hand-icon" />

            <p>
              The ultimate student-powered marketplace where dreams meet deals!
              Designed exclusively for CDO students to sell their unique creations, pre-loved items, and innovative services,
              HelpingHand is your go-to platform for affordable, one-of-a-kind finds.
              Whether you're hunting for textbooks, handmade crafts, tech gadgets, or even tutoring sessions,
              our community connects you directly to talented students from CDO offering quality products at budget-friendly prices.
              For students, it’s the perfect space to turn your skills and unused items into cash while building entrepreneurial experience.
              Join HelpingHand today, where students thrive, and everyone scores amazing deals!
            </p>

            {/* Show GET STARTED only on first visit and if not logged in */}
            {isFirstVisit && !isLoggedIn && !isRegistered && (
              <button className="about-signup-btn" onClick={() => navigate("/signup")}>
                GET STARTED
              </button>
            )}
          </div>

          {/* Images */}
          <div className="image-section">
            <img
              src="https://i.imgur.com/IQ0pcft.png"
              alt="Helping Hand"
              className="about-image"
            />
          </div>

          <div className="image-section-1">
            <img
              src="https://i.imgur.com/H5a9ITt.png"
              alt="Helping Hand"
              className="about-image-1"
            />
          </div>

          <div className="image-section-2">
            <img
              src="https://i.imgur.com/GT5CDSQ.png"
              alt="Helping Hand"
              className="about-image-2"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
