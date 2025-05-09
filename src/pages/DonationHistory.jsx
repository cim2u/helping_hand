import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../style/TransactionHistory.css'; // Corrected the CSS file import

import '../style/DonationHistory.css';

const DonationHistory = () => {
  // Sample data for transaction history
  const transactions = [
    { 
      name: 'Chin Chin Admin',
      product: 'Ribbon Keychain',
      date: '5/8/2025'
    },
    {
      name: 'John Doe',
      product: 'Helping Hand Subscription',
      date: '5/8/2025'
    },
    {
      name: 'Jane Smith',
      product: 'Ribbon Keychain',
      date: '5/7/2025'
    }
    // Add more transaction objects as needed
  ];

  const location = useLocation(); // Get the current location for highlighting active menu items

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

      <div className="donation-history-container">
        <div className="donation-header">
          <div className="donation-avatar"></div>
          <div className="donation-seller-name">Seller Name’s Donation History</div>
        </div>

        {/* Render transaction history */}
        {transactions.map((transaction, index) => (
          <div key={index} className="donation-group donation-group-74">
            <div className="donation-item-name">Donated to “{transaction.product}”</div>
            <div className="donation-purchase-date">{transaction.date}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DonationHistory;
