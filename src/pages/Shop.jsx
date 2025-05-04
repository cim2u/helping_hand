import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faUser, faCartShopping, faShop } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import logoImage from '../assets/Logo.png'; // adjust this path as needed
import '../style/Shop.css';

const Shop = () => {
  const [loggedIn, setLoggedIn] = useState(true); // temp example
  const navigate = useNavigate();

  const handleSubscribeClick = () => {
    navigate('/subscribe');
  }; // ✅ this closing brace was missing

  const toggleSidebar = () => {
    console.log("Sidebar toggled");
  };

  const toggleProfile = () => {
    console.log("Profile toggled");
  };

  return (
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
              <FontAwesomeIcon icon={faShop} className="icon" onClick={() => navigate('/store')} />
            </>
          )}
        </div>
      </header>

      <div className="shop-shops">SHOPS</div>
      {['Sissy Sheyy', 'Store Name', 'Store Name', 'Store Name', 'Store Name', 'Store Name', 'Store Name'].map((store, i) => (
  <div
    key={i}
    className={`shop-group${24 + i}`}
    onClick={() => navigate(`/store/${encodeURIComponent(store)}`)}
    style={{ cursor: 'pointer' }} // optional: make it visually clickable
  >
    <div className="shop-rectangle100"></div>
    <div className="shop-image"></div>
    <div className="shop-storeName">{store}</div>
  </div>
))}


      <div className="shop-primary"></div>
      <div className="shop-menu"></div>

      <div className="shop-user">
        <div className="shop-icon"></div>
      </div>

      <div className="shop-button">
        <div className="shop-state-layer">
          <div className="shop-subscribe" onClick={handleSubscribeClick}>
            SUBSCRIBE
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
