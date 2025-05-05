import React from 'react';
import '../style/CustomizeThemes.css';
import { useNavigate } from "react-router-dom";

const CustomizeThemes = () => {

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
      

      <div className="section-title">SUPPORT</div>
      <div className="menu-item" onClick={() => navigate("/help-center")}>HELP CENTER</div>
      <div className="menu-item" onClick={() => navigate("/about")}>ABOUT</div>

      <div className="section-title">USER</div>
      <div className="menu-item" onClick={() => navigate("/logout")}>LOG OUT</div>

            {/* Theme Customization Section */}
            <div className="theme-container">
          <div className="theme-background" />
          <div className="theme-group-7" />
          <div className="theme-group-8">
            <div className="theme-rectangle-77" />
            <div className="theme-morning">Morning</div>
          </div>
          <div className="theme-group-9">
            <div className="theme-rectangle-81" />
            <div className="theme-lilac">Lilac</div>
          </div>
          <div className="theme-group-10">
            <div className="theme-rectangle-77" />
          </div>
          <div className="theme-group-11">
            <div className="theme-rectangle-77" />
          </div>
          <div className="theme-more-themes">More themes coming soon!</div>
          <div className="theme-rectangle-80" />
          
        </div>
      </div>
      <button className="backhome-button" onClick={handleBackHome}>      Back Home
    </button>

        <div className="state-layer">
          <span>BACK HOME</span>
        </div>

    </div>
  );
};

export default CustomizeThemes;
