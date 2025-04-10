import React, { useState } from 'react';
import '../style/Home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { useNavigate } from 'react-router-dom';
import logoImage from "../assets/Logo.png";

// Let's assume products would be an array of product data.
const products = [];

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Assume the user is not logged in
  const [isSubscribed, setIsSubscribed] = useState(false); // Assume the user is not subscribed

  const navigate = useNavigate();

  const handleLoginClick = () => {
    setIsLoggedIn(true); // Simulating user login
    navigate('/login'); // Navigate to the login page
  };

  const handleSignUpClick = () => {
    setIsLoggedIn(true); // Simulating user registration
    navigate('/signup'); // Navigate to the signup page
  };

  return (
    <div className="home-wrapper">
      <div className="header-cover">
        <div className="logoContainer">
          <img src={logoImage} alt="Logo" className="logoLarge" />
        </div>

        <div className="icon-container">
          <FontAwesomeIcon icon={faBars} className="icon" />
          <FontAwesomeIcon icon={faUser} className="icon" />
          <FontAwesomeIcon icon={faCartShopping} className="icon" />
        </div>

        <div className="buttons-container">
          {!isLoggedIn && (
            <>
              <button className="login-button" onClick={handleLoginClick}>LOGIN</button>
              <button className="signup-button" onClick={handleSignUpClick}>SIGN UP</button>
            </>
          )}

          {/* Only show the SUBSCRIBE button if the user is logged in but not subscribed */}
          {isLoggedIn && !isSubscribed && (
            <button className="subscribe-button" onClick={() => navigate('/subscribe')}>
              SUBSCRIBE
            </button>
          )}

          {/* If user is logged in and already subscribed, no buttons should show */}
          {isLoggedIn && isSubscribed && null}
        </div>
      </div>

      <div className="white-section">
        <div className="banner">
          <h1 className="banner-text">WELCOME TO HELPING HAND!</h1>
        </div>
      </div>

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
