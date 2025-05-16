import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../style/AdminDashboard.css";
import "../style/About.css";
import logo from "../assets/Logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faHouse,
  faUser,
  faCircleQuestion,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = (e) => {
    e.preventDefault();
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      // Clear session/local storage
      localStorage.removeItem("user");
      localStorage.removeItem("loggedIn");
      localStorage.removeItem("isAdmin");

      navigate("/admin-login"); // Fixed route, assuming your admin login route is '/admin-login'
    }
  };

  return (
    <div className="containerAdmin">
      {/* Header */}
      <header className="about-header">
        <div className="about-header-1"></div>
        <div className="logo-container">
          <img src={logo} alt="Helping Hand Logo" className="logo" />
        </div>
        <h2 className="titleAdmin">DASHBOARD</h2>
      </header>

      {/* Images Section */}
      <div className="image-section-1">
        <img
          src="https://i.imgur.com/H5a9ITt.png"
          alt="Helping Hand"
          className="about-image-1"
        />
      </div>
      <div className="image-section-2">
        <img
          src="https://i.imgur.com/GT5CDSQ.png"
          alt="Helping Hand"
          className="about-image-2"
        />
      </div>

      {/* Sidebar */}
      <aside className="sidebarAdmin" aria-label="Admin sidebar navigation">
        <div className="avatarAdmin" aria-hidden="true"></div>

        <div className="adminNameGroupAdmin">
          <p className="adminNameAdmin">Chin Chin Admin</p>

          {/* Notification Icon */}
          <div className="notificationAdmin" aria-label="Notifications">
            <FontAwesomeIcon
              icon={faBell}
              size="2x"
              className="bellIconAdmin"
              aria-hidden="true"
            />
            <div className="badgeAdmin" aria-live="polite">
              <span className="badgeLabelAdmin">3</span>
            </div>
          </div>
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

      {/* Main Content */}
      <main className="mainContentAdmin" tabIndex={-1}>
        <section className="cardAdmin" aria-labelledby="monthly-earnings-title">
          <h3 id="monthly-earnings-title" className="cardTitleAdmin">
            Monthly Earnings
          </h3>
          <div className="cardBoxAdmin"></div>
        </section>

        <section
          className="cardAdmin rightAdmin"
          aria-labelledby="yearly-earnings-title"
        >
          <h3 id="yearly-earnings-title" className="cardTitleAdmin">
            Yearly Earnings
          </h3>
          <div className="cardBoxAdmin"></div>
        </section>

        <section className="salesAdmin" aria-labelledby="national-sales-title">
          <h3 id="national-sales-title" className="cardTitleAdmin">
            National Sales
          </h3>
          <div className="salesBoxAdmin"></div>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
