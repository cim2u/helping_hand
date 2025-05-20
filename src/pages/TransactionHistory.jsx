import React, { useState } from 'react';  // import useState
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  faBell,
  faHouse,
  faUser,
  faCircleQuestion,
  faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import '../style/TransactionHistory.css';
import '../style/AdminDashboard.css';
import '../style/About.css';
import logo from '../assets/Logo.png';

const TransactionHistory = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // State to hold selected user's name, default text before clicking
  const [selectedUser, setSelectedUser] = useState('User Name');

  const transactions = [
    { name: 'Chin Chin Admin', product: 'Ribbon Keychain', date: '5/8/2025' },
    { name: 'John Doe', product: 'Helping Hand Subscription', date: '5/8/2025' },
    { name: 'Jane Smith', product: 'Ribbon Keychain', date: '5/7/2025' },
  ];

  const handleLogout = (e) => {
    e.preventDefault();
    const confirmLogout = window.confirm('Are you sure you want to log out?');
    if (confirmLogout) {
      localStorage.removeItem('user');
      localStorage.removeItem('loggedIn');
      localStorage.removeItem('isAdmin');
      navigate('/login-admin');
    }
  };

  // Update selectedUser when a user row is clicked
  const handleUserClick = (name) => {
    setSelectedUser(name);
  };

  return (
    <div className="containerAdmin">
      {/* Header */}
      <header className="about-header">
        <div className="about-header-1"></div>
        <div className="logo-container">
          <img src={logo} alt="HelpingHand Logo" className="logo" />
        </div>
        <h2 className="titleAdmin">USER MANAGEMENT</h2>
      </header>

     

      <div className="image-section-2">
        <img
          src="https://i.imgur.com/GT5CDSQ.png"
          alt="Helping Hand"
          className="about-image-2"
        />
      </div>

      {/* Sidebar Navigation */}
      <aside className="sidebarAdmin">
        <div className="avatarAdmin"></div>
        <div className="adminNameGroupAdmin">
                   <p className="adminNameAdmin">Francim Elorde</p>
          <p className="adminNameAdminRole">Admin</p>

          
        </div>

        <nav className="menuAdmin">
          <Link
            to="/admin/dashboard"
            className={`menuItemAdmin ${
              location.pathname === '/admin/dashboard' ? 'active' : ''
            }`}
          >
            <FontAwesomeIcon icon={faHouse} className="iconAdmin" />
            <span className="menuTextAdmin">Dashboard</span>
          </Link>

          <Link
            to="/admin/user-management"
            className={`menuItemAdmin ${
              location.pathname === '/admin/user-management' ? 'active' : ''
            }`}
          >
            <FontAwesomeIcon icon={faUser} className="iconAdmin" />
            <span className="menuTextAdmin">User Management</span>
          </Link>

          <Link
            to="/admin/help-center"
            className={`menuItemAdmin ${
              location.pathname === '/admin/help-center' ? 'active' : ''
            }`}
          >
            <FontAwesomeIcon icon={faCircleQuestion} className="iconAdmin" />
            <span className="menuTextAdmin">Help Center</span>
          </Link>

          <div className="Logout-menuItemAdmin">
            <div onClick={handleLogout} className="menuItemAdmin" style={{ cursor: 'pointer' }}>
              <FontAwesomeIcon icon={faRightFromBracket} className="iconAdmin" />
              <span className="menuTextAdmin">Log Out</span>
            </div>
          </div>
        </nav>
      </aside>

      {/* Transaction History Container */}
      <div className="transaction-history-container">
        <div className="transaction-header">
          <div className="transaction-avatar"></div>
          {/* Show selected user's name dynamically */}
          <div className="transaction-user-name">{selectedUser}’s Transaction History</div>
        </div>

        {/* List users and allow click to select */}
        {transactions.map((transaction, index) => (
          <div
            key={index}
            className="transaction-group"
            onClick={() => handleUserClick(transaction.name)}
            style={{ cursor: 'pointer' }}
          >
            <div className="transaction-rectangle">
              <div className="transaction-item-name">
                Purchased &quot;{transaction.product}&quot;
              </div>
              <div className="transaction-purchase-date">{transaction.date}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionHistory;
