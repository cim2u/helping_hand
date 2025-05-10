import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/Support.css';
import logo from "../assets/Logo.png";

const Support = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isFirstVisit, setIsFirstVisit] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token); // Sets isLoggedIn based on token presence
  }, []);

  useEffect(() => {
    const hasVisited = localStorage.getItem("isRegistered");
    if (!hasVisited) {
      setIsFirstVisit(true);
      localStorage.setItem("isRegistered", "true");
    }
  }, []);

  const handleNavigation = (page, e) => {
    if (e) e.preventDefault();  // Prevent default anchor behavior
    if (page === "home" && !isLoggedIn) {
      handleLogout(); // Logs out if user is not logged in
    } else {
      navigate(`/${page}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Logs out the user
    setIsLoggedIn(false);
    navigate("/home"); // Redirects to the home page after logout
  };

  return (
    <div className="account-info-wrapper">
      <div className="containerSupport">
        <div className="headerSupport"></div>
        <div className="headerImageSupport"></div>

        <div className="logoContainerSupport">
          <img
            src="https://s3-alpha-sig.figma.com/img/cddc/c69c/3f6f0a76202e9185950e2cc3030ddcf5?Expires=1745798400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=OSgpki4sDiZvJQaaVriuXYw824d-73NRdbbIvtE7QOxa0DEBTnaqr25l809G82VUYfdLi-qzcguGWZw113ZWHPkmCe39wejgx0mHBOZZ5OxXtrimYSAh37as31XlmaTMnXnIYhj-pVIVdnekxH1jYUYbF3lFRFLaOwi~-Op~ZqzpErl-9P6MmxTrDbm6bGuIKtH1xlZ3WPAepIf~Yb~2CYTyJgfjVg9T0mD7BSSVsLvnALAsBk0SPuH0Q~8rjRZmu-AMXGWT0hBvmxajESjf4suTA8ZvQwZGKVe~FZul1XSUnIqjrcerKK7FCVluiENEMOxr0cxaH-XUqwAbUyZCsw__"
            alt="logo"
            className="logoSupport"
          />
          <div className="logo-container">
            <img src={logo} alt="HelpingHand Logo" className="logo" />
          </div>
        </div>

        {/* Navigation Links */}
        <div className="nav-container">
          <nav className="nav-links-h">
            <a href="#" onClick={(e) => handleNavigation("about", e)}>About</a>
            <a href="#" onClick={(e) => handleNavigation("support", e)}>Support</a>
            <a href="#" onClick={(e) => {
              e.preventDefault(); // Prevent default behavior
              localStorage.removeItem("authToken"); // Logs out the user
              setIsLoggedIn(false); // Update the login status in state
              navigate("/home"); // Navigate to the home page
            }}>Home</a>
          </nav>
        </div>

        <div className="headingSupport">
          Need a hand? How can we help you?
        </div>

        <div className="formContainerSupport">
          <div className="inputContainerSupport">
            <textarea
              placeholder="Please discuss your issue..."
              className="inputFieldSupport"
              rows={4}
            />
          </div>
          <button className="sendButtonSupport">Send</button>
        </div>

        <div className="emailTextSupport">
          Email HelpingHand at <span className="underlineEmail">HelpingHandSupport@gmail.com</span>
        </div>
      </div>

      {/* Show GET STARTED only on first visit and if not logged in */}
      {isFirstVisit && !isLoggedIn && (
        <button className="about-signup-btn" onClick={() => navigate("/signup")}>
          GET STARTED
        </button>
      )}
    </div>
  );
};

export default Support;
