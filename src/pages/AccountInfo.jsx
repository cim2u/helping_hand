import React from 'react';
import '../style/AccountInfo.css';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const AccountInfo = () => {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    // 1. Clear authentication token or session data
    localStorage.removeItem("authToken"); // adjust key if different
    sessionStorage.clear(); // optional, if you store session data here
  
    // 2. Redirect to login page
    navigate("/login");
  };
  const handleBackHome = () => {
    navigate("/home"); // this navigates to the homepage
  };

  return (
    <div className="account-info-wrapper"> {/* New wrapper here */}
    <div className="a-settings-container">
      <div className="settings-background-overlay" />
      <div className="sidebar-bg" />
      <h1 className="settings-header">Settings</h1>
  
      <div className="menu-box">
        <h2 className="menu-title">MY ACCOUNT</h2>
        <Link to="/account-info" className="menu-item">ACCOUNT INFO</Link>
        <Link to="/my-purchases" className="menu-item">MY PURCHASES</Link>
        <div className="menu-title">PREMIUM</div>
        <Link to="/customize-themes" className="menu-item">CUSTOMIZE THEMES</Link>
  
        <h2 className="menu-title">SUPPORT</h2>
        <Link to="/support" className="menu-item">HELP CENTER</Link>
        <Link to="/about" className="menu-item">ABOUT</Link>
  
        <div className="menu-title">USER</div>
        <div className="menu-item" onClick={handleLogoutClick}>LOG OUT</div>
      </div>
  
      <button className="home-button" onClick={handleBackHome}>
        <span className="subscribe-label">Back to Home</span>
      </button>
  
      <div className="profile-form-accountinfo">
        <div className="background-accountinfo" />
        <div className="group-13-accountinfo" />
        <div className="account-info-accountinfo">
          <div className="menu-item-accountinfo">Account Info</div>
        </div>
  
        <div className="P-AccountInfo">
  <div className="personal-info-accountinfo">
    <div className="label-accountinfo">First Name</div>
    <input className="input-frame-accountinfo" type="text" placeholder="Enter first name" />

    <div className="label-accountinfo">Last Name</div>
    <input className="input-frame-accountinfo" type="text" placeholder="Enter last name" />

    <div className="label-accountinfo">Email</div>
    <input className="input-frame-accountinfo" type="email" placeholder="Enter email" />

    <div className="label-accountinfo">Username</div>
    <input className="input-frame-accountinfo" type="text" placeholder="Enter username" />

    <div className="label-accountinfo">Password</div>
    <input className="input-frame-accountinfo" type="password" placeholder="Enter password" />
  </div>
</div>

<div className="B-AccountInfo" />
<div className="business-info-accountinfo">
  <div className="section-title-accountinfo">Business Information</div>

  <div className="label-accountinfo">Store Name</div>
  <input className="b-input-frame-accountinfo" type="text" placeholder="Enter store name" />

  <div className="label-accountinfo">Store Address</div>
  <input className="b-input-frame-accountinfo" type="text" placeholder="Enter store address" />

  <div className="label-accountinfo">Gmail Account</div>
  <input className="b-input-frame-accountinfo" type="email" placeholder="Enter Gmail account" />
</div>

<div style={{ marginTop: '20px', textAlign: 'center' }}>
  <button className="send-button-accountinfo">Send</button>
</div>
      </div>
    </div>
  </div> 
  
  );
};

export default AccountInfo;
