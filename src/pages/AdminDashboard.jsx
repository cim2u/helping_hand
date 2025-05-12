import React from 'react';
import { Link, useLocation,useNavigate  } from 'react-router-dom';
import '../style/AdminDashboard.css';
import "../style/About.css";
import logo from "../assets/Logo.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faHouse, faUser, faCircleQuestion, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
const handleLogout = (e) => {
  e.preventDefault();
  const confirmLogout = window.confirm("Are you sure you want to log out?");
  if (confirmLogout) {
    // Clear session storage/localStorage if needed
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
             
       
        <h2 className="titleAdmin">DASHBOARD</h2>
      </header>
       

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
      <aside className="sidebarAdmin">
        <div className="avatarAdmin"></div>
        <div className="adminNameGroupAdmin">
          <p className="adminNameAdmin">Chin Chin Admin</p>

          {/* Notification Icon */}
          <div className="notificationAdmin">
            <FontAwesomeIcon icon={faBell} size="2x" className="bellIconAdmin" />
            <div className="badgeAdmin">
              <span className="badgeLabelAdmin">3</span>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="menuAdmin">
          <Link
            to="/admin/dashboard"
            className={`menuItemAdmin ${location.pathname === '/admin/dashboard' ? 'active' : ''}`}
          >
            <FontAwesomeIcon icon={faHouse} className="iconAdmin" />
            <span className="menuTextAdmin">Dashboard</span>
          </Link>

          <Link
            to="/admin/user-management"
            className={`menuItemAdmin ${location.pathname === '/admin/user-management' ? 'active' : ''}`}
          >
            <FontAwesomeIcon icon={faUser} className="iconAdmin" />
            <span className="menuTextAdmin">User Management</span>
          </Link>

          <Link
            to="/admin/help-center"
            className={`menuItemAdmin ${location.pathname === '/admin/help-center' ? 'active' : ''}`}
          >
            <FontAwesomeIcon icon={faCircleQuestion} className="iconAdmin" />
            <span className="menuTextAdmin">Help Center</span>
          </Link>
        
         <div className="Logout-menuItemAdmin">
         <div onClick={handleLogout} className="menuItemAdmin" style={{ cursor: "pointer" }}>
  <FontAwesomeIcon icon={faRightFromBracket} className="iconAdmin" />
  <span className="menuTextAdmin">Log Out</span>
</div>
</div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="mainContentAdmin">
        <section className="cardAdmin">
          <h3 className="cardTitleAdmin">Monthly Earnings</h3>
          <div className="cardBoxAdmin"></div>
        </section>

        <section className="cardAdmin rightAdmin">
          <h3 className="cardTitleAdmin">Yearly Earnings</h3>
          <div className="cardBoxAdmin"></div>
        </section>

        <section className="salesAdmin">
          <h3 className="cardTitleAdmin">National Sales</h3>
          <div className="salesBoxAdmin"></div>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
