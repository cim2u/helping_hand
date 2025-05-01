// ProfileModal.jsx
import React, { useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping, faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import "../style/ProfileModal.css";

const ProfileModal = ({ isVisible, loggedIn, onClose, handleLogoutClick }) => {
  const profileRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

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

          <div className="profileLogout" onClick={handleLogoutClick}>Log out</div>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
