import React from 'react';
import '../style/Settings.css';
import { useNavigate } from "react-router-dom";

const Settings = () => {

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
      </div>
      <button className="backhome-button" onClick={handleBackHome}>      Back Home
    </button>

        <div className="state-layer">
          <span>BACK HOME</span>
        </div>

    </div>
  );
};

export default Settings;
