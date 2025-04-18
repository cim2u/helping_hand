import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../style/About.css";
import "../style/Logo.module.css";
import logo from "../assets/Logo.png";
import helpinghand from "../assets/HELPINGHand.png";

function About() {
  const navigate = useNavigate();
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    const registeredStatus = localStorage.getItem("isRegistered") === "true";
    setIsRegistered(registeredStatus);
  }, []);

  const handleNavigation = (page) => {
    navigate(`/${page}`);
  };

  return (
    <div className="a-container">
      <div className="about-container">
        {/* Header */}
        <div className="about-header">
          <div className="about-header-1"></div>

          <div className="logo-container">
            <img src={logo} alt="HelpingHand Logo" className="logo" />
          </div>
        </div>

        {/* Navigation Links (Separate from the Header) */}
        <div className="nav-container">
          <nav className="nav-links">
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
              Designed exclusively for CDO students to sell their unique creations, pre-loved items, and innovative services, HelpingHand is your go-to platform for affordable, one-of-a-kind finds.
              Whether you're hunting for textbooks, handmade crafts, tech gadgets, or even tutoring sessions, our community connects you directly to talented students from CDO offering quality products at budget-friendly prices.
              For students, it’s the perfect space to turn your skills and unused items into cash while building entrepreneurial experience.
              Join HelpingHand today, where students thrive, and everyone scores amazing deals!
            </p>

            {!isRegistered && (
              <button className="signup-btn" onClick={() => navigate("/signup")}>
                 GET STARTED
              </button>
            )}
          </div>

          <div className="image-section">
            <img
              src="https://s3-alpha-sig.figma.com/img/cddc/c69c/3f6f0a76202e9185950e2cc3030ddcf5?Expires=1745798400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=OSgpki4sDiZvJQaaVriuXYw824d-73NRdbbIvtE7QOxa0DEBTnaqr25l809G82VUYfdLi-qzcguGWZw113ZWHPkmCe39wejgx0mHBOZZ5OxXtrimYSAh37as31XlmaTMnXnIYhj-pVIVdnekxH1jYUYbF3lFRFLaOwi~-Op~ZqzpErl-9P6MmxTrDbm6bGuIKtH1xlZ3WPAepIf~Yb~2CYTyJgfjVg9T0mD7BSSVsLvnALAsBk0SPuH0Q~8rjRZmu-AMXGWT0hBvmxajESjf4suTA8ZvQwZGKVe~FZul1XSUnIqjrcerKK7FCVluiENEMOxr0cxaH-XUqwAbUyZCsw__"
              alt="Helping Hand"
              className="about-image"
            />
          </div>

          <div className="image-section-1">
            <img
              src="https://s3-alpha-sig.figma.com/img/cddc/c69c/3f6f0a76202e9185950e2cc3030ddcf5?Expires=1745798400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=OSgpki4sDiZvJQaaVriuXYw824d-73NRdbbIvtE7QOxa0DEBTnaqr25l809G82VUYfdLi-qzcguGWZw113ZWHPkmCe39wejgx0mHBOZZ5OxXtrimYSAh37as31XlmaTMnXnIYhj-pVIVdnekxH1jYUYbF3lFRFLaOwi~-Op~ZqzpErl-9P6MmxTrDbm6bGuIKtH1xlZ3WPAepIf~Yb~2CYTyJgfjVg9T0mD7BSSVsLvnALAsBk0SPuH0Q~8rjRZmu-AMXGWT0hBvmxajESjf4suTA8ZvQwZGKVe~FZul1XSUnIqjrcerKK7FCVluiENEMOxr0cxaH-XUqwAbUyZCsw__"
              alt="Helping Hand"
              className="about-image-1"
            />
          </div>

          <div className="image-section-2">
            <img
              src="https://s3-alpha-sig.figma.com/img/cddc/c69c/3f6f0a76202e9185950e2cc3030ddcf5?Expires=1745798400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=OSgpki4sDiZvJQaaVriuXYw824d-73NRdbbIvtE7QOxa0DEBTnaqr25l809G82VUYfdLi-qzcguGWZw113ZWHPkmCe39wejgx0mHBOZZ5OxXtrimYSAh37as31XlmaTMnXnIYhj-pVIVdnekxH1jYUYbF3lFRFLaOwi~-Op~ZqzpErl-9P6MmxTrDbm6bGuIKtH1xlZ3WPAepIf~Yb~2CYTyJgfjVg9T0mD7BSSVsLvnALAsBk0SPuH0Q~8rjRZmu-AMXGWT0hBvmxajESjf4suTA8ZvQwZGKVe~FZul1XSUnIqjrcerKK7FCVluiENEMOxr0cxaH-XUqwAbUyZCsw__"
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
