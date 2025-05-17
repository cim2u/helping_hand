import React from "react";
import "../style/Settings.css";
import { Link, useNavigate } from "react-router-dom";

const Settings = () => {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    localStorage.removeItem("authToken");
    sessionStorage.clear();
    navigate("/login");
  };

  const handleBackHome = () => {
    navigate("/home");
  };

  return (
    <div className="account-info-wrapper">
  <div className="settings-container">
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
  </div>
</div>


  );
};

export default Settings;
