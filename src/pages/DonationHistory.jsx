import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useLocation,useNavigate  } from 'react-router-dom';
import { faBell, faHouse, faUser, faCircleQuestion, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import '../style/AdminDashboard.css';
import "../style/About.css";
import logo from "../assets/Logo.png";
import '../style/TransactionHistory.css'; // Corrected the CSS file import

import '../style/DonationHistory.css';

const DonationHistory = () => {
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
