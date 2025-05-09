import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import '../style/AdminDashboard.css';
import '../style/AdminHelpCenter.css';

const AdminHelpCenter = () => {
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(prevState => !prevState);
  };

  return (
    <div className="containerAdmin">
      <header className="headerAdmin">
        <div className="logoGroupAdmin">
          <h1 className="logoTextAdmin">Helping</h1>
          <p className="logoSubTextAdmin">Hand</p>
        </div>
        <h2 className="titleAdmin">HELP CENTER</h2>
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

      {/* Help Center / Customer Reviews Section */}
      <div className="group73HelpCenter">
        <div className="rectangle120HelpCenter"></div>

        <h2 className="titleHelpCenter">Customer Reviews</h2>

        <div className="rectangle124HelpCenter">
          <p className="reviewTextHelpCenter">
            “This product really helped me organize my tasks efficiently. Highly recommended!”
          </p>
          <p className="reviewAuthorHelpCenter">– Jane Doe</p>
        </div>

        <div className="rectangle125HelpCenter">
          <p className="reviewTextHelpCenter">
            “Customer support was prompt and very helpful. Great experience overall.”
          </p>
          <p className="reviewAuthorHelpCenter">– John Smith</p>
        </div>
      </div>
    </div>
  );
};

export default AdminHelpCenter;
