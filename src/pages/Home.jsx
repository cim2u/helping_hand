import React, { useState, useEffect } from 'react';
import '../style/Home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCartShopping, faUser, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useLocation } from 'react-router-dom';
import logoImage from "../assets/Logo.png";

const Home = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [userRole, setUserRole] = useState(null); // Store user role
  const navigate = useNavigate();
  const location = useLocation(); // Get current route

  useEffect(() => {
    const registeredStatus = localStorage.getItem('isRegistered') === 'true';
    const subscribedStatus = localStorage.getItem('isSubscribed') === 'true';
    const loggedInStatus = localStorage.getItem('loggedIn') === 'true';
    let role = localStorage.getItem('userRole'); // Get role from localStorage

    // Debugging role check
    console.log("User Role:", role); // Add this line to see the role in console

    if (location.pathname === '/myshop') {
      if (role !== 'student') {
        alert('You must be a student to access this page!');
        navigate('/home');  // Redirect if not student
        return;
      }
      // If user is not logged in, redirect them to login page
      if (!loggedInStatus) {
        alert('Please log in first!');
        navigate('/login');
        return;
      }
    }

    setIsRegistered(registeredStatus);
    setIsSubscribed(subscribedStatus);
    setLoggedIn(loggedInStatus);
    setUserRole(role); // Store the role in state

    if (loggedInStatus) {
      navigate('/home');
    }

    // Fetch products if needed
  }, [navigate, location.pathname]);

  const handleLoginClick = () => navigate('/login');
  const handleSignUpClick = () => navigate('/signup');

  const handleSubscribeClick = () => {
    localStorage.setItem('isSubscribed', 'true');
    setIsSubscribed(true);
    alert("You have successfully subscribed!");
  };

  const handleLogoutClick = () => {
    localStorage.clear();
    setIsRegistered(false);
    setIsSubscribed(false);
    setLoggedIn(false);
    alert("You have logged out.");
    navigate('/about');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="home-wrapper">
      <header className="header-cover">
        <div className="logoContainer">
          <img src={logoImage} alt="HelpingHand Logo" className="logoLarge" />
        </div>

        <div className="icon-container">
          <FontAwesomeIcon icon={faBars} className="icon" onClick={toggleSidebar} />
          <FontAwesomeIcon icon={faUser} className="icon" />
          <FontAwesomeIcon icon={faCartShopping} className="icon" />
        </div>

        <div className="buttons-container">
          {!isRegistered ? (
            <>
              <button className="login-button" onClick={handleLoginClick}>LOGIN</button>
              <button className="signup-button" onClick={handleSignUpClick}>SIGN UP</button>
            </>
          ) : !isSubscribed ? (
            <button className="h-subscribe-button" onClick={handleSubscribeClick}>SUBSCRIBE</button>
          ) : (
            <span className="h-subscribed-message">✅ Subscribed</span>
          )}
        </div>
      </header>

      {isSidebarOpen && (
        <aside className="sidebar">
          <div className="sidebar-header">
            <FontAwesomeIcon icon={faTimes} className="close-icon" onClick={toggleSidebar} />
          </div>
          <ul className="sidebar-menu">
            <li onClick={() => navigate('/home')}>HOME</li>
            <li onClick={() => navigate('/about')}>ABOUT</li>
            <li onClick={() => navigate('/support')}>SUPPORT</li>

            {isRegistered && (
              <>
                <li onClick={() => navigate('/shop')}>SHOPS</li>

                {/* Show MYSHOP only if the user is a student */}
                {userRole === 'student' && (
                  <li onClick={() => navigate('/myshop')}>MYSHOP</li>
                )}

                <li onClick={() => navigate('/settings')}>SETTINGS</li>
                <li onClick={handleLogoutClick}>LOGOUT</li>
              </>
            )}
          </ul>
        </aside>
      )}

      <section className="white-section">
        <div className="banner">
          {isRegistered && <h1 className="banner-text">WELCOME TO HELPING HAND!</h1>}
        </div>
      </section>

      <section className="products-section">
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
      </section>
    </div>
  );
};

export default Home;
