import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faUser, faCartShopping, faStore, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import logoImage from '../assets/Logo.png';
import '../style/Shop.css';

const Shop = () => {
  const [loggedIn] = useState(true);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isRegistered] = useState(true);
  const [userRole] = useState('student');
  const sidebarRef = useRef(null);
  const navigate = useNavigate();

  const handleSubscribeClick = () => {
    window.location.href = "/subscribe";
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const toggleProfile = () => {
    console.log("Profile toggled");
  };

  // 🔽 Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setSidebarOpen(false);
      }
    };

    if (isSidebarOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSidebarOpen]);

  const stores = [
    'Sissy Sheyy',
    'Store Name',
    'Store Name',
    'Store Name',
    'Store Name',
    'Store Name',
    'Store Name',
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
            {loggedIn && (
              <>
                <FontAwesomeIcon icon={faUser} className="icon" onClick={toggleProfile} />
                <FontAwesomeIcon icon={faCartShopping} className="icon" onClick={() => navigate('/cart')} />
                <FontAwesomeIcon icon={faStore} className="icon" onClick={() => navigate('/store')} />
              </>
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
                  {userRole === 'student' && <li onClick={() => navigate('/myshop')}>MYSHOP</li>}
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

        <div className="shop-button">
          <div className="shop-state-layer">
            <div className="shop-subscribe-button" onClick={handleSubscribeClick}>
              SUBSCRIBE
            </div>
          </div>
        </div>

        <div className="shop-primary"></div>
        <div className="shop-menu"></div>

        <div className="shop-user">
          <div className="shop-icon"></div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
