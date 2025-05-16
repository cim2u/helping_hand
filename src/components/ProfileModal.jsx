import React, { useRef, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping, faCartPlus, faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import "../style/ProfileModal.css";

const ProfileModal = ({ isVisible, loggedIn, onClose }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(loggedIn);
  const profileRef = useRef(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'default');

  // Retrieve saved image from localStorage on load
  const [profileImage, setProfileImage] = useState(() => {
    return localStorage.getItem('profileImage') || null;
  });

  useEffect(() => {
    setTheme(localStorage.getItem('theme') || 'default');
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const handleLogoutClick = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("isRegistered");
      localStorage.removeItem("profileImage");
      navigate("/login");
    }
  };

  const handleProfileClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
      localStorage.setItem("profileImage", imageUrl);
    }
  };

  if (!isVisible || !loggedIn) return null;

  return (
    <div className="profileWrapper" ref={profileRef}>
      <div className="profileCard">
        <div className="profileBackground">

          <div className="profilePicture" onClick={handleProfileClick} title="Click to change profile picture">
  {profileImage ? (
    <img src={profileImage} alt="Profile" className="profileImage" />
  ) : (
    <>
      <FontAwesomeIcon icon={faCircleUser} className="defaultProfileIcon" />
      <span className="uploadText">Upload Profile</span>
    </>
  )}
  <div className="cameraOverlay">
    <FontAwesomeIcon icon="fa-solid fa-camera" className="cameraIcon" />
  </div>
</div>


          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />

          <div className="profileLabel">Profile</div>
          <div className="profileCircle">
            <div className="statusPrimary">
              <div className="checkPrimary" />
            </div>
          </div>
          <div className="profileBanner" />
          <div className="profileBanner_1" />
          <section className={`profileRec ${theme}-theme`} />

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
  );
};

export default ProfileModal;
