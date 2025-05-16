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

          <div className="icon-container">
            <FontAwesomeIcon icon={faBars} className="icon" onClick={toggleSidebar} />
            <FontAwesomeIcon icon={faUser} className="icon" onClick={toggleProfile} />
            <Link to="/cart">
              <FontAwesomeIcon icon={faCartShopping} className="icon" />
            </Link>
            {userRole !== "buyer" && (
              <Link to="/store">
                <FontAwesomeIcon icon={faStore} className="icon" />
              </Link>
            )}
          </div>
        </header>

        <Profile
          loggedIn={loggedIn}
          isVisible={isProfileVisible}
          onClose={() => setIsProfileVisible(false)}
          handleLogoutClick={handleLogoutClick}
        />

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
                  <li onClick={() => navigate('/settings')}>SETTINGS</li>
                </>
              )}
            </ul>
          </aside>
        )}

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

      
            <div className="h-subscribe-button" onClick={handleSubscribeClick}>
              SUBSCRIBE
            </div>
       
        

        <div className="shop-user">
          <div className="shop-icon"></div>
        </div>

        {isProfileVisible && (
          <div className="profileWrapper" ref={profileRef}>
            <div className="profileCard">
              <div className="profileBackground">
                <div className="profilePicture" />
                <div className="profileLabel">Profile</div>
                <div className="profileCircle">
                  <div className="statusPrimary">
                    <div className="checkPrimary" />
                  </div>
                </div>
                <div className="profileBanner" />
                <div className="profileBanner_1" />
                <div className="profileRec" />

                <div className="profileLinkOr" onClick={() => navigate('/order')}>
                  <FontAwesomeIcon icon={faBagShopping} className="iconStyleProfile" /> Order
                </div>

                <div className="profileLinkCar" onClick={() => navigate('/cart')}>
                  <FontAwesomeIcon icon={faCartPlus} className="iconStyleProfile" /> Cart
                </div>

                <div className="profileSellerLabel">Seller</div>
                <div className="profileAddressLabel">Sto. Nino, Lapasan, CDO</div>
                <div className="profileOrdersTitle">Orders & Purchases</div>
                <div className="profileInfoTitle">Personal Information</div>

                <div className="profileEmail">Name: Sissy Shey</div>
                <div className="profileEmail">Email: shelayamba@gmail.com</div>
                <div className="profilePhone">Phone Number: 63+ 9771234545</div>
                <div className="profileAddress">Address: Sto. Nino, Lapasan, CDO</div>

                <div className="profileLogout1" onClick={handleLogoutClick}>Log out</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
