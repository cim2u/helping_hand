import React, { useState, useEffect } from 'react';
import '../style/Home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCartShopping, faUser, faTimes } from '@fortawesome/free-solid-svg-icons'; // Import the 'X' icon
import { useNavigate } from 'react-router-dom';
import logoImage from "../assets/Logo.png";

const products = []; // Example product list, update with actual product data

const Home = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const registeredStatus = localStorage.getItem('isRegistered') === 'true';
    const subscribedStatus = localStorage.getItem('isSubscribed') === 'true';
    const loggedInStatus = localStorage.getItem('loggedIn') === 'true';

    setIsRegistered(registeredStatus);
    setIsSubscribed(subscribedStatus);
    setLoggedIn(loggedInStatus);

    // If not logged in, allow user to see the homepage but not restrict it
    if (loggedInStatus) {
      navigate('/home');
    }
  }, [navigate]);

  const handleLoginClick = () => navigate('/login');
  const handleSignUpClick = () => navigate('/signup');

  const handleSubscribeClick = () => {
    localStorage.setItem('isSubscribed', 'true');
    setIsSubscribed(true);
    alert("You have successfully subscribed!");
  };

  // Modified Logout function
  const handleLogoutClick = () => {
    localStorage.clear(); // Clear all user data
    setIsRegistered(false);
    setIsSubscribed(false);
    setLoggedIn(false);
    alert("You have logged out.");
    navigate('/about'); // Redirect to About page after logout
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="home-wrapper">
      {/* Header Section */}
      <div className="header-cover">
        <div className="logoContainer">
          <img src={logoImage} alt="HelpingHand Logo" className="logoLarge" />
        </div>

        {/* Icons */}
        <div className="icon-container">
          <FontAwesomeIcon icon={faBars} className="icon" onClick={toggleSidebar} />
          <FontAwesomeIcon icon={faUser} className="icon" />
          <FontAwesomeIcon icon={faCartShopping} className="icon" />
        </div>

        {/* Buttons Section */}
        <div className="buttons-container">
          {!isRegistered ? (
            <>
              <button className="login-button" onClick={handleLoginClick}>LOGIN</button>
              <button className="signup-button" onClick={handleSignUpClick}>SIGN UP</button>
            </>
          ) : !isSubscribed ? (
            <button className="subscribe-button" onClick={handleSubscribeClick}>SUBSCRIBE</button>
          ) : (
            <span className="subscribed-message">✅ Subscribed</span>
          )}

          {/* No Logout button here */}
        </div>
      </div>

      {/* Sidebar */}
      {isSidebarOpen && (
        <div className="sidebar">
          <div className="sidebar-header">
            <FontAwesomeIcon icon={faTimes} className="close-icon" onClick={toggleSidebar} /> {/* X Icon */}
          </div>
          <ul className="sidebar-menu">
            <li onClick={() => navigate('/home')}>HOME</li>
            <li onClick={() => navigate('/about')}>ABOUT</li>
            <li onClick={() => navigate('/support')}>SUPPORT</li>
            {isRegistered && (
              <>
                <li onClick={() => navigate('/shop')}>SHOPS</li>
                <li onClick={() => navigate('/settings')}>SETTINGS</li>
                {/* Logout link inside Sidebar */}
                <li onClick={handleLogoutClick}>LOGOUT</li>
              </>
            )}
          </ul>
        </div>
      )}

      {/* White Section */}
      <div className="white-section">
        <div className="banner">
          {/* Conditionally Rendered Banner Text */}
          {isRegistered && (
            <h1 className="banner-text">WELCOME TO HELPING HAND!</h1>
          )}
        </div>
      </div>

      {/* Product Grid Section */}
      {products.length > 0 ? (
        <div className="products-grid">
          {products.map((product, index) => (
            <div className="product-card" key={index}>
              <div className="image-placeholder"></div>
              <p className="product-name">{product.name}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No products available. Check back later!</p>
      )}
    </div>
  );
};

export default Home;
