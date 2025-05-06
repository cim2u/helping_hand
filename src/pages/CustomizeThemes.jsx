import React from 'react';
import '../style/CustomizeThemes.css';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const CustomizeThemes = () => {

  const navigate = useNavigate();

  const handleLogoutClick = () => {
    // 1. Clear authentication token or session data
    localStorage.removeItem("authToken"); // adjust key if different
    sessionStorage.clear(); // optional, if you store session data here
  
    // 2. Redirect to login page
    navigate("/login");
  };
  const handleBackHome = () => {
    navigate("/"); // this navigates to the homepage

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

      <button className="home-button" onClick={handleBackHome}>
        <span className="subscribe-label">Back to Home</span>
      </button>

            {/* Theme Customization Section */}
            <div className="theme-background-accountinfo ">
            <div className="theme-container">
          <div className="theme-background" />
          <div className="theme">
      <div className="theme-group-7" />

      <div className="theme-group-8">
        <div className="theme-rectangle-77 morning-bg" />
        <div className="theme-morning">Morning</div>
      </div>

      <div className="theme-group-9">
        <div className="theme-rectangle-81 lilac-bg" />
        <div className="theme-lilac">Lilac</div>
      </div>

      <div className="theme-group-10">
        <div className="theme-rectangle-77" />
      </div>

      

      <div className="theme-more-themes">More themes coming soon!</div>
      <div className="theme-rectangle-80" />

    </div>
          
        </div>
      </div>
      </div>
    </div>
    </div>
  );
};

export default CustomizeThemes;
