import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/Support.css';
import logo from "../assets/Logo.png";


const Support = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isFirstVisit, setIsFirstVisit] = useState(false);
  const [message, setMessage] = useState('');
  const [showNotification, setShowNotification] = useState(false);

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

  const handleSendClick = () => {
    if (message.trim() === '') {
      alert('Please enter your issue before sending.');
      return;
    }

    // Simulate sending message to ADMINHELPCENTER
    console.log("Sending message to ADMINHELPCENTER:", message);

    // Show success notification
    setShowNotification(true);

    // Clear the message after sending
    setMessage('');

    // Hide notification after 3 seconds
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  return (
    <div className="account-info-wrapper">
      <div className="containerSupport">
        <div className="headerSupport"></div>
        <div className="headerImageSupport"></div>

        <div className="logoContainerSupport">
          <img
            src="https://i.imgur.com/GT5CDSQ.png"

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
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <button className="sendButtonSupport" onClick={handleSendClick}>Send</button>
        </div>

        {showNotification && (
          <div className="notificationSupport">Your message has been sent.</div>
        )}

        <div className="emailTextSupport">
          Email HelpingHand at <span className="underlineEmail">HelpingHandSupport@gmail.com</span>
        </div>
      </div>

    
    </div>
  );
};

export default Support;
