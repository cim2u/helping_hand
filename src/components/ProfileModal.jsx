import React, { useRef, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping, faCartPlus, faCircleUser, faCamera } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import "../style/ProfileModal.css";

const ProfileModal = ({ isVisible, loggedIn, onClose }) => {
  const profileRef = useRef(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  // Load user role and theme from localStorage or set default values
  const [userRole, setUserRole] = useState(localStorage.getItem("userRole") || "");
  const [theme, setTheme] = useState(localStorage.getItem("theme") || 'default');

  // Editing state
  const [isEditing, setIsEditing] = useState(false);

  // Profile picture state, load from localStorage
  const [profileImage, setProfileImage] = useState(localStorage.getItem("profileImage") || null);

  // Profile data state loaded from localStorage or fallback defaults
  const [profileData, setProfileData] = useState({
     name: localStorage.getItem('profileName') || '', // this will load correctly
      email: localStorage.getItem('profileEmail') || '',
    phone: localStorage.getItem('profilePhone') || '63+',
    address: localStorage.getItem('profileAddress') || '',
  });



  // Close modal if clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  // Trigger file input click for profile pic change
  const handleProfileClick = () => {
    fileInputRef.current.click();
  };

  // Handle new profile image upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
      localStorage.setItem("profileImage", imageUrl);
    }
  };

  // Update profileData state on input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Save profileData back to localStorage
  const handleSave = () => {
    Object.entries(profileData).forEach(([key, value]) => {
      localStorage.setItem(`profile${key.charAt(0).toUpperCase() + key.slice(1)}`, value);
    });
    setIsEditing(false);
  };

  // Logout clears all relevant keys from localStorage and navigates to login
  const handleLogoutClick = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      [
        "authToken", "isLoggedIn", "isRegistered", "profileImage",
        "profileName", "profileEmail", "profilePhone", "profileAddress", "userRole",
        "username"
      ].forEach(key => localStorage.removeItem(key));
      navigate("/login");
    }
  };

  // Navigation helpers
  const goToOrders = () => navigate('/order');
  const goToCart = () => navigate('/cart');

  // Hide modal if not visible or user not logged in
  if (!isVisible || !loggedIn) return null;

  return (
    <div className="profileWrapper" ref={profileRef}>
      <div className="profileCard">
        <div className="profileBackground">

          {/* Profile picture section */}
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

          {/* Hidden file input for profile image */}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />

          {/* Display user name */}
          <div className="profileLabel">{profileData.name}</div>

          {/* Status circle, banners, and theming */}
          <div className="profileCircle">
            <div className="statusPrimary">
              <div className="checkPrimary" />
            </div>
          </div>
          <div className="profileBanner" />
          <div className="profileBanner_1" />
          <section className={`profileRec ${theme}-theme`} />

          {/* Orders and Cart shortcuts */}
          <div className="profileActions">
            <div className="Order" onClick={goToOrders}>
              <FontAwesomeIcon icon={faBagShopping} className="iconStyleOrder" /> Order
            </div>
            <div className="CartFont" onClick={goToCart}>
              <FontAwesomeIcon icon={faCartPlus} className="iconStyleCart" /> Cart
            </div>
          </div>

       <div className="profileSellerLabel">
            {userRole === "seller" ? "Seller" : userRole === "buyer" ? "Buyer" : ""}
          </div>
 <div className="profileAddressLabel">
      {profileData.address || (userRole === "buyer" ? "No address yet." : "")}
    </div>
        
          {/* Titles */}
          <div className="profileOrdersTitle">Orders & Purchases</div>
          <div className="profileInfoTitle">Personal Information</div>

          {/* Editable profile fields or display */}
          {isEditing ? (
            <>
                <input
                  className="profileInputEdit"
                  type="text"
                  name="name"
                  value={profileData.name}
                  onChange={handleInputChange}
                  placeholder="Username"
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
                placeholder="Phone"
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
              {userRole === "buyer" && !profileData.address ? (
                <div className="profileAddress">
                  <em>No address yet.</em> <span onClick={() => setIsEditing(true)} className="editProfileLink">Add Address</span>
                </div>
              ) : (
                <div className="profileAddress">Address: {profileData.address}</div>
              )}
              <div className="editProfileLink" onClick={() => setIsEditing(true)}>Edit</div>
            </>
          )}

          {/* Logout */}
          <div className="profileLogout1" onClick={handleLogoutClick}>Log out</div>

        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
