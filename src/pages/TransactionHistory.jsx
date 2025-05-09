import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../style/TransactionHistory.css'; // Corrected the CSS file import
import '../style/AdminDashboard.css';

const TransactionHistory = () => {
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

      {/* Transaction History Container */}
      <div className="transaction-history-container">
        <div className="transaction-header">
          <div className="transaction-avatar"></div>
          <div className="transaction-seller-name">Seller Name’s Transaction History</div>
        </div>

        {/* Loop through the transactions */}
        {transactions.map((transaction, index) => (
          <div key={index} className="transaction-group">
            <div className="transaction-rectangle">
              <div className="transaction-item-name">Purchased "{transaction.product}"</div>
              <div className="transaction-purchase-date">{transaction.date}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionHistory;
