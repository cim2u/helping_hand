import React, { useRef, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping, faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import "../style/ProfileModal.css";
import OrderModal from '../components/OrderModal';

const ProfileModal = ({ isVisible, loggedIn, onClose, setIsLoggedIn, setIsRegistered }) => {
  const profileRef = useRef(null);
  const navigate = useNavigate();
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'default');
  const [showOrderModal, setShowOrderModal] = useState(false);

  // Load theme on mount
  useEffect(() => {
    setTheme(localStorage.getItem('theme') || 'default');
  }, []);

  // Close modal on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  // Handle logout
  const handleLogoutClick = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("isRegistered");

      if (typeof setIsRegistered === "function") {
        setIsRegistered(false);
      }

      if (typeof setIsLoggedIn === "function") {
        setIsLoggedIn(false);
      }

      onClose(); // Close modal
      navigate("/login"); // Redirect to About page
    }
  };

  // Don't render if modal is hidden or user is not logged in
  if (!isVisible || !loggedIn) return null;

  return (
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
          <section className={`profileRec ${theme}-theme`} />

          {/* Icons */}
          <div>
            <span
              className="profileLinkOr"
              onClick={() => setShowOrderModal(true)}
              title="Go to Orders"
            >
              <FontAwesomeIcon icon={faBagShopping} className="iconStyleProfile" />
              <span className="iconLabel">Orders</span>
            </span>

            {showOrderModal && <OrderModal onClose={() => setShowOrderModal(false)} />}

            <span
              className="profileLinkCar"
              onClick={() => navigate('/cart')}
              title="Go to Cart"
            >
              <FontAwesomeIcon icon={faCartPlus} className="iconStyleProfile" />
              <span className="iconLabel">Cart</span>
            </span>
          </div>

          {/* Static Profile Info */}
          <div className="profileSellerLabel">Seller</div>
          <div className="profileAddressLabel">Sto. Nino, Lapasan, CDO</div>
          <div className="profileOrdersTitle">Orders & Purchases</div>
          <div className="profileInfoTitle">Personal Information</div>

          <div className="profileEmail">Name: Sissy Shey</div>
          <div className="profileEmail">Email: shelayamba@gmail.com</div>
          <div className="profilePhone">Phone Number: 63+ 9771234545</div>
          <div className="profileAddress">Address: Sto. Nino, Lapasan, CDO</div>

          <div className="profileLogout1" onClick={handleLogoutClick}>
            Log out
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
