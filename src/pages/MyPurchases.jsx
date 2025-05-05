import React from 'react';
import '../style/MyPurchases.css';
import { useNavigate } from "react-router-dom";

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
        <div className="sellerName" style={{ left: '538px', top: '277px' }}>Name of seller</div>
        <div className="productName" style={{ left: '556px', top: '348px' }}>Product</div>

        {/* Purchase History Block 2 */}
        <div className="purchaseBlock" style={{ left: '529px', top: '465px' }} />
        <div className="lineSeparator" style={{ left: '529px', top: '499px' }} />
        <div className="lineSeparator" style={{ left: '529px', top: '614px' }} />
        <div className="sellerName" style={{ left: '538px', top: '471px' }}>Name of seller</div>
        <div className="productName" style={{ left: '556px', top: '542px' }}>Product</div>

        {/* Purchase History Block 3 */}
        <div className="purchaseBlock" style={{ left: '529px', top: '661px' }} />
        <div className="lineSeparator" style={{ left: '529px', top: '695px' }} />
        <div className="lineSeparator" style={{ left: '529px', top: '810px' }} />
        <div className="sellerName" style={{ left: '538px', top: '667px' }}>Name of seller</div>
        <div className="productName" style={{ left: '556px', top: '738px' }}>Product</div>

        <button className="backhome-button" onClick={handleBackHome}>Back Home</button>
      </div>
    </div>
  );
};

export default MyPurchases;
