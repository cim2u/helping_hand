import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import '../style/AdminDashboard.css';
import '../style/AdminUserManagement.css';

const AdminUserManagement = () => {
  const location = useLocation();
   // Function to toggle dropdown visibility
   const handleToggle = () => {
    setShowDropdown(prevState => !prevState);
  };

  // Function to toggle the dropdown visibility
  const toggleDropdown = () => {
    setShowDropdown(prevState => !prevState);
  };

  const [showDropdown, setShowDropdown] = useState(false);

 


  return (
    <div className="containerAdmin">
      <header className="headerAdmin">
        <div className="logoGroupAdmin">
          <h1 className="logoTextAdmin">Helping</h1>
          <p className="logoSubTextAdmin">Hand</p>
        </div>
        <h2 className="titleAdmin">USER MANAGEMENT</h2>
      </header>

      <aside className="sidebarAdmin">
        <div className="avatarAdmin"></div>
        <div className="adminNameGroupAdmin">
          <p className="adminNameAdmin">Chin Chin Admin</p>
          <div className="notificationAdmin">
            <div className="bellIconAdmin"></div>
            <div className="badgeAdmin">
              <span className="badgeLabelAdmin">3</span>
            </div>
          </div>
        </div>

        <nav className="menuAdmin">
          <Link to="/admin/dashboard" className={`menuItemAdmin ${location.pathname === '/admin/dashboard' ? 'active' : ''}`}>
            <div className="iconAdmin"></div>
            <span className="menuTextAdmin">Dashboard</span>
          </Link>

          <Link to="/admin/user-management" className={`menuItemAdmin ${location.pathname === '/admin/user-management' ? 'active' : ''}`}>
            <div className="iconAdmin"></div>
            <span className="menuTextAdmin">User Management</span>
          </Link>

          <Link to="/admin/help-center" className={`menuItemAdmin ${location.pathname === '/admin/help-center' ? 'active' : ''}`}>
            <div className="iconAdmin"></div>
            <span className="menuTextAdmin">Help Center</span>
          </Link>

          <Link to="/" className="menuItemAdmin">
            <div className="iconAdmin"></div>
            <span className="menuTextAdmin">Log Out</span>
          </Link>
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
