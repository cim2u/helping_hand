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

        <div className="profile-form-accountinfo">
      {/* Background */}
      <div className="background-accountinfo" />

      {/* Group 13 */}
      <div className="group-13-accountinfo" />

      {/* Account Info */}
      <div className="account-info-accountinfo">
        <div className="section-title-accountinfo">MY ACCOUNT</div>
        <div className="menu-item-accountinfo">Account Info</div>
      </div>

      {/* Personal Information */}
      <div className="personal-info-accountinfo">
        <div className="label-accountinfo">First Name</div>
        <div className="input-frame-accountinfo" />
        <div className="label-accountinfo">Last Name</div>
        <div className="input-frame-accountinfo" />
        <div className="label-accountinfo">Email</div>
        <div className="input-frame-accountinfo" />
        <div className="label-accountinfo">Username</div>
        <div className="input-frame-accountinfo" />
        <div className="label-accountinfo">Password</div>
        <div className="input-frame-accountinfo" />
      </div>

      {/* Business Information */}
      <div className="business-info-accountinfo">
        <div className="section-title-accountinfo">BUSINESS INFORMATION</div>
        <div className="label-accountinfo">Store Name</div>
        <div className="input-frame-accountinfo" />
        <div className="label-accountinfo">Store Address</div>
        <div className="input-frame-accountinfo" />
        <div className="label-accountinfo">Gmail Account</div>
        <div className="input-frame-accountinfo" />
      </div>
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
