import React from 'react';
import '../style/AccountInfo.css';
import { useNavigate } from "react-router-dom";

const AccountInfo = () => {
  const navigate = useNavigate();

  const handleBackHome = () => {
    navigate("/"); // this navigates to the homepage
  };

  return (
    <div className="settings-wrapper">
      <div className="background-overlay" />
      <div className="settings-background" />
      <div className="settings-panel">
        <h1 className="settings-title">Settings</h1>
        <div className="section-title">MY ACCOUNT</div>
        <div className="menu-item" onClick={() => navigate("/account-info")}>ACCOUNT INFO</div>
        <div className="menu-item" onClick={() => navigate("/my-purchases")}>MY PURCHASES</div>

        <div className="section-title">PREMIUM</div>
        <div className="menu-item" onClick={() => navigate("/customize-themes")}>CUSTOMIZE THEMES</div>
        <div className="menu-item" onClick={() => navigate("/badges")}>BADGES</div>

        <div className="section-title">SUPPORT</div>
        <div className="menu-item" onClick={() => navigate("/help-center")}>HELP CENTER</div>
        <div className="menu-item" onClick={() => navigate("/about")}>ABOUT</div>

        <div className="section-title">USER</div>
        <div className="menu-item" onClick={() => navigate("/logout")}>LOG OUT</div>

        {/* Account Info Form */}
        <div className="account-info-title">Account Info</div>

        <div className="input-section first-name-section">
          <label className="label">First Name</label>
          <input type="text" className="input-box" />
        </div>

        <div className="input-section last-name-section">
          <label className="label">Last Name</label>
          <input type="text" className="input-box" />
        </div>

        <div className="input-section email-section">
          <label className="label">Email</label>
          <input type="email" className="input-box" />
        </div>

        <div className="input-section username-section">
          <label className="label">Username</label>
          <input type="text" className="input-box" />
        </div>

        <div className="input-section password-section">
          <label className="label">Password</label>
          <input type="password" className="input-box" />
        </div>

        <div className="business-info-title">Business Information</div>

        <div className="input-section store-name-section">
          <label className="label">Store Name</label>
          <input type="text" className="input-box" />
        </div>

        <div className="input-section store-address-section">
          <label className="label">Store Address</label>
          <input type="text" className="input-box" />
        </div>

        <div className="input-section gmail-account-section">
          <label className="label">Gmail Account</label>
          <input type="email" className="input-box" />
        </div>
        
      </div>
      <button className="backhome-button" onClick={handleBackHome}>Back Home</button>

      <div className="state-layer">
        <span>BACK HOME</span>
      </div>
    </div>
  );
};

export default AccountInfo;
