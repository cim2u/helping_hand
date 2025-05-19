import React, { useRef, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping, faCartPlus, faCircleUser, faCamera } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import "../style/ProfileModal.css";

const ProfileModal = ({ isVisible, loggedIn, onClose }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(loggedIn);
  const profileRef = useRef(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'default');
  const [isEditing, setIsEditing] = useState(false);

  const [profileImage, setProfileImage] = useState(() => {
    return localStorage.getItem('profileImage') || null;
  });

  const [profileData, setProfileData] = useState({
    name: localStorage.getItem('profileName') || 'Sissy Shey',
    email: localStorage.getItem('profileEmail') || 'shelayamba@gmail.com',
    phone: localStorage.getItem('profilePhone') || '63+ 9771234545',
    address: localStorage.getItem('profileAddress') || 'Sto. Nino, Lapasan, CDO',
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
      localStorage.removeItem("profileName");
      localStorage.removeItem("profileEmail");
      localStorage.removeItem("profilePhone");
      localStorage.removeItem("profileAddress");
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    localStorage.setItem('profileName', profileData.name);
    localStorage.setItem('profileEmail', profileData.email);
    localStorage.setItem('profilePhone', profileData.phone);
    localStorage.setItem('profileAddress', profileData.address);
    setIsEditing(false);
  };

  const goToOrders = () => {
    navigate('/order');
  };

  const goToCart = () => {
    navigate('/cart');
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
              <FontAwesomeIcon icon={faCamera} className="cameraIcon" />
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
<div className="profileActions">
  <div className="Order" onClick={goToOrders}>
    <FontAwesomeIcon icon={faBagShopping} className="iconStyleOrder" /> Order
  </div>

  <div className="CartFont" onClick={goToCart}>
    <FontAwesomeIcon icon={faCartPlus} className="iconStyleCart" /> Cart
  </div>
</div>

          <div className="profileSellerLabel">Seller</div>
          <div className="profileAddressLabel">Sto. Nino, Lapasan, CDO</div>
          <div className="profileOrdersTitle">Orders & Purchases</div>
          <div className="profileInfoTitle">Personal Information</div>

          {isEditing ? (
            <>
              <input
                className="profileInputEdit"
                type="text"
                name="name"
                value={profileData.name}
                onChange={handleInputChange}
                placeholder="Name:"
              />
              <input
                className="profileInputEdit"
                type="email"
                name="email"
                value={profileData.email}
                onChange={handleInputChange}
                placeholder="Email"
              />
              <input
                className="profileInputEdit"
                type="text"
                name="phone"
                value={profileData.phone}
                onChange={handleInputChange}
                placeholder="Phone Number"
              />
              <input
                className="profileInputEdit"
                type="text"
                name="address"
                value={profileData.address}
                onChange={handleInputChange}
                placeholder="Address"
              />
              <button className="saveButton" onClick={handleSave}>Save</button>
            </>
          ) : (
            <>
              <div className="profileEmail">Name: {profileData.name}</div>
              <div className="profileEmail">Email: {profileData.email}</div>
              <div className="profilePhone">Phone Number: {profileData.phone}</div>
              <div className="profileAddress">Address: {profileData.address}</div>
              <div className="editProfileLink" onClick={() => setIsEditing(true)}>Edit</div>
            </>
          )}

          <div className="profileLogout1" onClick={handleLogoutClick}>Log out</div>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;