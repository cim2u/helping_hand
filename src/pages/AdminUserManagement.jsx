import React, { useState } from 'react';
import { Link, useLocation,useNavigate  } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown,faBell, faHouse, faUser, faCircleQuestion, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import '../style/AdminDashboard.css';
import '../style/AdminUserManagement.css';
import "../style/About.css";
import logo from "../assets/Logo.png";

const AdminUserManagement = () => {
  const location = useLocation();
   // Function to toggle dropdown visibility
   const handleToggle = () => {
    setShowDropdown(prevState => !prevState);
  };

  const navigate = useNavigate();
   
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
  // Function to toggle the dropdown visibility
  const toggleDropdown = () => {
    setShowDropdown(prevState => !prevState);
  };

  const [showDropdown, setShowDropdown] = useState(false);

 


  return (
    <div className="containerAdmin">
    <header className="about-header">
                   <div className="about-header-1"></div>
                   <div className="logo-container">
                     <img src={logo} alt="HelpingHand Logo" className="logo" />
                   </div>
        <h2 className="titleAdmin">USER MANAGEMENT</h2>
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
      <div className="adminPage">
        {/* Seller Section */}
        <div className="group68">
          <div className="sellerRectangle118"></div>

          <div className="sellerAccounts">
            <span>Seller Accounts</span>
          </div>

          <div className="rectangle122"></div>

          <div className="Seller-deleteAccount" style={{ left: '581px', top: '959px' }}>
            <span>Delete Account</span>
          </div>

          <div className="avatar">
            <div className="shape" style={{ backgroundImage: 'url(image.png)' }}></div>
          </div>

          <div className="sellerName">
            <span>Seller Name</span>
          </div>

          {/* Dropdown Toggle */}
          <div className="chevronDown" onClick={handleToggle}>
            <FontAwesomeIcon
              icon={faChevronDown}
              className={`chevronIcon ${showDropdown ? 'rotated' : ''}`}
            />
          </div>

        {/* Conditional Dropdown Content */}
{showDropdown && (
    <div className="dropdownContainer">
      {/* Button to trigger dropdown visibility */}
      <button onClick={toggleDropdown} className="dropdownButton">
        Menu
      </button>

      {/* Conditional Dropdown Content */}
      {showDropdown && (
        <div className="historyDropdown">
          <div className="dropdownHeader">
            <h4>History</h4>
          </div>

          {/* Link to Transaction History page */}
          <Link to="/admin/transaction-history" className="transactionHistory">
            Transaction History
          </Link>

          {/* Link to Donation History page */}
          <Link to="/admin/donation-history" className="donationHistory">
            Donation History
          </Link>
        </div>
      )}
    </div>
)}

</div>
        {/* Active Accounts Section */}
        <div className="accountGroup72">
          <div className="accountTitle">Accounts</div>
          <div className="accountRectangle118"></div>

          <div className="accountCard">
            <div className="accountAvatar">A</div>
            <div className="accountName">Seller Name</div>
          </div>

          <div className="accountDelete">Delete Account</div>
        </div>

        {/* Deleted Accounts Section */}
        <div className="deletedGroupLast">
          <div className="deletedTitleLast">Deleted Accounts</div>
          <div className="deletedRectangleLast"></div>

          <div className="deletedCardLast">
            <div className="deletedAvatarLast">B</div>
            <div className="deletedNameLast">Deleted Seller</div>
          </div>

          <div className="deletedRestoreLast">Restore Account</div>
        </div>
      </div>
    </div>
  );
};

export default AdminUserManagement;
