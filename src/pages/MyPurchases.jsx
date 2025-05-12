import React from 'react';
import '../style/MyPurchases.css';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const MyPurchases = () => {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    // 1. Clear authentication token or session data
    localStorage.removeItem("authToken"); // adjust key if different
    sessionStorage.clear(); // optional, if you store session data here
  
    // 2. Redirect to login page
    navigate("/login");
  };
  const handleBackHome = () => {
    navigate("/"); // navigate to homepage
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

      {/* Purchase History Section */}
      <div className="myPurchasesPage">
        <div className="backgroundOverlayPurchases" />
        <h2 className="myPurchasesTitle">My Purchases</h2>
        <div className="rectangleMain" />

        {/* Purchase History Block 1 */}
        <div className="purchaseBlock" style={{ left: '529px', top: '271px' }} />
        <div className="lineSeparator" style={{ left: '529px', top: '305px' }} />
        <div className="lineSeparator" style={{ left: '529px', top: '420px' }} />
        <div className="MysellerName" style={{ left: '538px', top: '277px' }}>Name of seller</div>
        <div className="productName" style={{ left: '556px', top: '348px' }}>Product</div>

        {/* Purchase History Block 2 */}
        <div className="purchaseBlock" style={{ left: '529px', top: '465px' }} />
        <div className="lineSeparator" style={{ left: '529px', top: '499px' }} />
        <div className="lineSeparator" style={{ left: '529px', top: '614px' }} />
        <div className="MysellerName" style={{ left: '538px', top: '471px' }}>Name of seller</div>
        <div className="productName" style={{ left: '556px', top: '542px' }}>Product</div>

        {/* Purchase History Block 3 */}
        <div className="purchaseBlock" style={{ left: '529px', top: '661px' }} />
        <div className="lineSeparator" style={{ left: '529px', top: '695px' }} />
        <div className="lineSeparator" style={{ left: '529px', top: '810px' }} />
        <div className="MysellerName" style={{ left: '538px', top: '667px' }}>Name of seller</div>
        <div className="productName" style={{ left: '556px', top: '738px' }}>Product</div>
        </div>
        <button className="home-button" onClick={handleBackHome}>
        <span className="subscribe-label">Back to Home</span>
      </button>
      </div>
      </div>
    
  );
};

export default MyPurchases;
