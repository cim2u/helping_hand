import React from 'react';
import '../style/Profile.css'; // Make sure your organized CSS is here

const ProfileModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null; // Don't render anything if modal is closed

  return (
    <div className="modalOverlay">
      <div className="modalContent">
        <button className="closeButton" onClick={onClose}>×</button>

        {/* Your Profile JSX here */}
        <div className="profileContainer">
          {/* Background */}
          <div className="profileBackground" />

          {/* Main Card */}
          <div className="profileCard">
            {/* Rectangle Box */}
            <div className="profileRectangleBox" />

            {/* Profile Picture */}
            <div className="profileImageWrapper">
              <div className="profilePicture" />
            </div>

            {/* Profile Name */}
            <div className="profileNameLabel">Your Name</div>

            {/* Status */}
            <div className="profileStatusCircle">
              <div className="statusDot">
                <div className="statusCheck" />
              </div>
            </div>

            {/* Seller and Address */}
            <div className="profileSeller">Seller</div>
            <div className="profileAddress">Location, Country</div>

            {/* Section Titles */}
            <div className="ordersTitle">Orders</div>
            <div className="personalInfoTitle">Personal Info</div>

            {/* Orders Section */}
            <div className="ordersSection">
              <div className="profileCart">Cart</div>
              <div className="profileOrder">Orders</div>
              <div className="bagIcon">
                <div className="bagIconBackground" />
              </div>
            </div>

            {/* Personal Info Section */}
            <div className="personalInfoSection">
              <div className="profileName">Name: Your Name</div>
              <div className="profileEmail">Email: your.email@example.com</div>
              <div className="profilePhone">Phone: +123 456 7890</div>
              <div className="profileAddressInfo">Address: 123 Main Street</div>
            </div>

            {/* Logout */}
            <div className="profileLogout">Logout</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
