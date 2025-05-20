import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { faHouse, faUser, faCircleQuestion, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import '../style/AdminDashboard.css';
import '../style/About.css';
import logo from '../assets/Logo.png';
import '../style/TransactionHistory.css';
import '../style/DonationHistory.css';

const DonationHistory = () => {
  const navigate = useNavigate();

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

  const transactions = [
    { 
      name: '',
      product: 'Ribbon Keychain',
      date: '5/8/2025'
    },
   
  ];

  const location = useLocation();

  return (
    <div className="containerAdmin">
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

      <aside className="sidebarAdmin">
        <div className="avatarAdmin"></div>
        <div className="adminNameGroupAdmin">
          <p className="adminNameAdmin">Francim Elorde</p>
          <p className="adminNameAdminRole">Admin</p>
        </div>

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
            <div onClick={handleLogout} className="menuItemAdmin" style={{ cursor: 'pointer' }}>
              <FontAwesomeIcon icon={faRightFromBracket} className="iconAdmin" />
              <span className="menuTextAdmin">Log Out</span>
            </div>
          </div>
        </nav>
      </aside>
      <div className="white-container"></div>

      <div className="donation-container">
        <h3 className="donation-title">Donation History</h3>

        {transactions.map((transaction, idx) => (
          <div key={idx} className="donation-transactionCard">
            <div className="donation-transactionInfo">
              <div className="donation-avatar">{transaction.name.charAt(0)}</div>
              <div className="donation-text">
                Donated to “{transaction.product}”
              </div>
            </div>
            <div className="donation-dateText">{transaction.date}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DonationHistory;
