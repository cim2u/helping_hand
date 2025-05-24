import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHouse,
  faUser,
  faCircleQuestion,
  faRightFromBracket,
  faMoneyBillTransfer,
  faUserCheck,
  faClock
} from '@fortawesome/free-solid-svg-icons';

import '../style/AdminDashboard.css';
import '../style/AdminHelpCenter.css';
import '../style/AdminUserManagement.css';
import '../style/About.css';

import logo from '../assets/Logo.png';

const AdminHelpCenter = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(prev => !prev);
  };

  // Logout handler with confirmation
  const handleLogout = (e) => {
    e.preventDefault();
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      localStorage.removeItem("user");
      localStorage.removeItem("loggedIn");
      localStorage.removeItem("isAdmin");
      navigate("/login-admin");
    }
  };

  return (
    <div className="containerAdmin">
      {/* Header */}
      <header className="about-header">
        <div className="about-header-1"></div>
        <div className="logo-container">
          <img src={logo} alt="HelpingHand Logo" className="logo" />
        </div>
        <h2 className="titleAdmin">HELP CENTER</h2>
      </header>

      {/* Image Section */}
      <div className="image-section-2">
        <img
          src="https://i.imgur.com/GT5CDSQ.png"
          alt="Helping Hand"
          className="about-image-2"
        />
      </div>

      {/* Sidebar */}
      <aside className="sidebarAdmin">
        <div className="avatarAdmin"></div>
        <div className="adminNameGroupAdmin">
          <p className="adminNameAdmin">Francim Elorde</p>
          <p className="adminNameAdminRole">Admin</p>
        </div>

        {/* Navigation Menu */}
        <nav className="menuAdmin" role="navigation" aria-label="Admin menu">
          <Link
            to="/admin/dashboard"
            className={`menuItemAdmin ${
              location.pathname === "/admin/dashboard" ? "active" : ""
            }`}
          >
            <FontAwesomeIcon icon={faHouse} className="iconAdmin" />
            <span className="menuTextAdmin">Dashboard</span>
          </Link>

          <Link
            to="/admin/user-management"
            className={`menuItemAdmin ${
              location.pathname === "/admin/user-management" ? "active" : ""
            }`}
          >
            <FontAwesomeIcon icon={faUser} className="iconAdmin" />
            <span className="menuTextAdmin">User Management</span>
          </Link>

          <Link
            to="/admin/payments"
            className={`menuItemAdmin ${
              location.pathname === "/admin/payments" ? "active" : ""
            }`}
          >
            <FontAwesomeIcon icon={faMoneyBillTransfer} className="iconAdmin" />
            <span className="menuTextAdmin">Pending Payments</span>
          </Link>
          
          <Link
            to="/admin/verify-seller"
            className={`menuItemAdmin ${
              location.pathname === "/admin/verify-seller" ? "active" : ""
            }`}
          >
            <FontAwesomeIcon icon={faUserCheck} className="iconAdmin" />
            <span className="menuTextAdmin">Verify Seller</span>
          </Link>

          

          <Link
            to="/admin/help-center"
            className={`menuItemAdmin ${
              location.pathname === "/admin/help-center" ? "active" : ""
            }`}
          >
            <FontAwesomeIcon icon={faCircleQuestion} className="iconAdmin" />
            <span className="menuTextAdmin">Help Center</span>
          </Link>

          

          {/* Logout */}
          <div
            className="Logout-menuItemAdmin"
            onClick={handleLogout}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                handleLogout(e);
              }
            }}
            style={{ cursor: "pointer" }}
            aria-label="Log Out"
          >
            <div className="menuItemAdmin">
              <FontAwesomeIcon icon={faRightFromBracket} className="iconAdmin" />
              <span className="menuTextAdmin">Log Out</span>
            </div>
          </div>
        </nav>
      </aside>

      {/* Help Center Main Content */}
      <main className="group73HelpCenter">
        <div className="rectangle120HelpCenter"></div>
        <h2 className="titleHelpCenter">Customer Reviews</h2>

        <div className="rectangle124HelpCenter">
          <p className="reviewTextHelpCenter">
            "This product really helped me organize my tasks efficiently. Highly recommended!"
          </p>
          <p className="reviewAuthorHelpCenter">– Jane Doe</p>
        </div>

        <div className="rectangle125HelpCenter">
          <p className="reviewTextHelpCenter">
            "Customer support was prompt and very helpful. Great experience overall."
          </p>
          <p className="reviewAuthorHelpCenter">– John Smith</p>
        </div>
      </main>
    </div>
  );
};

export default AdminHelpCenter;