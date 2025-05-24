import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faUser,
  faCartShopping,
  faStore,
  faTimes,
  faBagShopping,
  faCartPlus
} from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import logoImage from '../assets/Logo.png';
import '../style/Shop.css';
import '../style/Home.css';
import Profile from '../components/ProfileModal';

const Shop = () => {
  const [loggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn") === "true");
  const [isRegistered, setIsRegistered] = useState(localStorage.getItem("isRegistered") === "true");
  const [userRole, setUserRole] = useState(localStorage.getItem("userRole") || "guest");
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isProfileVisible, setIsProfileVisible] = useState(false);

  const sidebarRef = useRef(null);
  const profileRef = useRef(null);
  const navigate = useNavigate();

  const handleSubscribeClick = () => {
    window.location.href = "/subscribe";
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const toggleProfile = () => {
    setIsProfileVisible(!isProfileVisible);
  };

  const handleLogoutClick = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("isRegistered");
      localStorage.removeItem("userRole");

      setIsLoggedIn(false);
      setIsRegistered(false);
      setUserRole("guest");
      setIsProfileVisible(false);

      navigate("/about");
    }
  };


  
  const handleBackHome = () => {
    navigate("/home");
  };

  // Close sidebar on outside click
  useEffect(() => {
    const handleClickOutsideSidebar = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setSidebarOpen(false);
      }
    };

    if (isSidebarOpen) {
      document.addEventListener('mousedown', handleClickOutsideSidebar);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutsideSidebar);
    };
  }, [isSidebarOpen]);

  // Close profile modal on outside click
  useEffect(() => {
    const handleClickOutsideProfile = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileVisible(false);
      }
    };

    if (isProfileVisible) {
      document.addEventListener('mousedown', handleClickOutsideProfile);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutsideProfile);
    };
  }, [isProfileVisible]);

  const stores = [
    'Sissy Sheyy',
    'Store Name 1',
    'Store Name 2',
    'Store Name 3',
    'Store Name 4',
  ];

  return (
    <div className="shop-container">
      <div className="home-wrapper">
        <header className="header-cover">
          <div className="logoContainer">
            <img src={logoImage} alt="HelpingHand Logo" className="logoLarge" />
          </div>

          
     <div className="back-button-container">
                <button className="home-btn-cart" onClick={handleBackHome}>BACK TO HOME</button>
              </div>
       
        

       
        </header>

        <Profile
          loggedIn={loggedIn}
          isVisible={isProfileVisible}
          onClose={() => setIsProfileVisible(false)}
          handleLogoutClick={handleLogoutClick}
        />

       

        <div className="shop-rectangle98"></div>
        <div className="shop-shops">SHOPS</div>

        {stores.map((store, i) => (
          <div
            key={i}
            className={`shop-group${24 + i}`}
            onClick={() => navigate(`/store/${encodeURIComponent(store)}`)}
            style={{ cursor: 'pointer' }}
          >
            <div className="shop-rectangle100"></div>
            <div className="shop-image"></div>
            <div className="shop-storeName">{store}</div>
          </div>
        ))}

      
       
        

        <div className="shop-user">
          <div className="shop-icon"></div>
        </div>

       
      </div>
    </div>
  );
};

export default Shop;
