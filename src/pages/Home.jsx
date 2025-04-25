import React, { useState, useEffect, useRef } from 'react';
import '../style/Home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCartShopping, faUser, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useLocation } from 'react-router-dom';
import logoImage from "../assets/Logo.png";
import ProductGrid from '../components/ProductGrid.jsx'; // Import ProductGrid component

const Home = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileVisible, setIsProfileVisible] = useState(false);  // State for profile visibility
  const [products, setProducts] = useState([]);  // Placeholder for products
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const sidebarRef = useRef(null);
  const profileRef = useRef(null);  // Reference for the profile modal

  useEffect(() => {
    const registeredStatus = localStorage.getItem('isRegistered') === 'true';
    const subscribedStatus = localStorage.getItem('isSubscribed') === 'true';
    const loggedInStatus = localStorage.getItem('loggedIn') === 'true';
    let role = localStorage.getItem('userRole');

    if (location.pathname === '/myshop') {
      if (role !== 'student') {
        alert('You must be a student to access this page!');
        navigate('/home');
        return;
      }
      if (!loggedInStatus) {
        alert('Please log in first!');
        navigate('/login');
        return;
      }
    }

    setIsRegistered(registeredStatus);
    setIsSubscribed(subscribedStatus);
    setLoggedIn(loggedInStatus);
    setUserRole(role);

    if (loggedInStatus) {
      navigate('/home');
    }

    // Fetch products if needed
    fetchProducts();
  }, [navigate, location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileVisible(false);  // Close profile when clicking outside
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const fetchProducts = async () => {
    try {
      // Replace this URL with your actual API endpoint
      const response = await fetch('https://your-api.com/products');
      const data = await response.json();
      setProducts(data);  // Set the fetched products
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };

  const handleLoginClick = () => navigate('/login');
  const handleSignUpClick = () => navigate('/signup');

  const handleSubscribeClick = () => {
    if (!isSubscribed) {
      navigate('/subscribe');  // Navigate to the Subscribe page
    }
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

  // Function to toggle profile visibility
  const toggleProfile = () => {
    setIsProfileVisible(!isProfileVisible);
  };

  return (
    <div className="home-wrapper">
      <header className="header-cover">
        <div className="logoContainer">
          <img src={logoImage} alt="HelpingHand Logo" className="logoLarge" />
        </div>

        <div className="icon-container">
          <FontAwesomeIcon icon={faBars} className="icon" onClick={toggleSidebar} />
          {/* Click the user icon to toggle profile card visibility */}
          <FontAwesomeIcon icon={faUser} className="icon" onClick={toggleProfile} />
          <FontAwesomeIcon icon={faCartShopping} className="icon" />
        </div>

        <div className="buttons-container">
          {!isRegistered && (
            <>
              <button className="login-button" onClick={handleLoginClick}>LOGIN</button>
              <button className="signup-button" onClick={handleSignUpClick}>SIGN UP</button>
            </>
          )}

          {isRegistered && !isSubscribed && (
            <button className="h-subscribe-button" onClick={handleSubscribeClick}>SUBSCRIBE</button>
          )}
        </div>
      </header>

      {isSidebarOpen && (
        <aside className="sidebar" ref={sidebarRef}>
          <div className="sidebar-header">
            <FontAwesomeIcon icon={faTimes} className="close-icon" onClick={toggleSidebar} />
          </div>
          <ul className="sidebar-menu">
            <li onClick={() => navigate('/about')}>ABOUT</li>
            <li onClick={() => navigate('/home')}>HOME</li>
            <li onClick={() => navigate('/support')}>SUPPORT</li>

            {isRegistered && (
              <>
                <li onClick={() => navigate('/shop')}>SHOPS</li>
                {userRole === 'student' && (
                  <li onClick={() => navigate('/myshop')}>MYSHOP</li>
                )}
                <li onClick={() => navigate('/settings')}>SETTINGS</li>
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

     {/* Profile Card (Visible when logged in and toggled via the user icon) */}
{loggedIn && isProfileVisible && (
  <div className="profile-wrapper" ref={profileRef}>
    <div className="profile-card rectangle-profile">
      <div className="profile-card-background">
        <div className="profile-picture"></div>
        <div className="label">Profile</div>
        <div className="circle">
          <div className="status-primary">
            <div className="check-primary"></div>
          </div>
        </div>
        <div className="address-label">Sto. Nino, Lapasan, CDO</div>
        <div className="orders-purchases-title">Orders & Purchases</div>
        <div className="personal-info-title">Personal Information</div>
        <div className="cart-order-link">Order</div>
        <div className="cart-order-link">Cart</div>
        <div className="email-name">Name: Sissy Shey</div>
        <div className="email-name">Email: shelayamba@gmail.com</div>
        <div className="phone-number">Phone Number: 63+ 9771234545</div>
        <div className="address">Address: Sto. Nino, Lapasan, CDO</div>
        <div className="logout-container" onClick={handleLogoutClick}>Log out</div>
      </div>
    </div>
  </div>
)}


      <ProductGrid products={products} className="product-grid-container" />
    </div>
  );
};

export default Home;
