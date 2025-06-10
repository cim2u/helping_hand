import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHouse,
  faUser,
  faCircleQuestion,
  faRightFromBracket,
  faMoneyBillTransfer,
  faUserCheck
} from '@fortawesome/free-solid-svg-icons';

import '../style/AdminDashboard.css';
import '../style/AdminHelpCenter.css';
import '../style/AdminUserManagement.css';
import '../style/About.css';

import logo from '../assets/Logo.png';

const AdminHelpCenter = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [messages, setMessages] = useState([]);
  const [replyInputs, setReplyInputs] = useState({});

  const toggleDropdown = () => {
    setShowDropdown(prev => !prev);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      localStorage.removeItem("user");
      localStorage.removeItem("loggedIn");
      localStorage.removeItem("isAdmin");
      navigate("/admin-login");
    }
  };

  useEffect(() => {
    const storedMessages = JSON.parse(localStorage.getItem("supportMessages")) || [];
    setMessages(storedMessages);
  }, []);

  const handleReplyChange = (id, text) => {
    setReplyInputs(prev => ({ ...prev, [id]: text }));
  };

  const handleReplySubmit = (id) => {
    const updatedMessages = messages.map(msg => {
      if (msg.id === id) {
        return { ...msg, reply: replyInputs[id] };
      }
      return msg;
    });
    setMessages(updatedMessages);
    localStorage.setItem("supportMessages", JSON.stringify(updatedMessages));
    setReplyInputs(prev => ({ ...prev, [id]: "" }));
  };

  return (
    <div className="containerAdmin">
      {/* Header */}
      <header className="about-header">
        <div className="about-header-1"></div>
        <div className="logo-container">
          <img src={logo} alt="HelpingHand Logo" className="logo" />
        </div>
        <h2 className="titleAdmin">HELP CENTER</h2>
      </header>

      {/* Image Section */}
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
          <p className="adminNameAdmin">Francim Elorde</p>
          <p className="adminNameAdminRole">Admin</p>
        </div>

        {/* Navigation Menu */}
        <nav className="menuAdmin" role="navigation" aria-label="Admin menu">
          <Link
            to="/admin/dashboard"
            className={`menuItemAdmin ${location.pathname === "/admin/dashboard" ? "active" : ""}`}
          >
            <FontAwesomeIcon icon={faHouse} className="iconAdmin" />
            <span className="menuTextAdmin">Dashboard</span>
          </Link>

          <Link
            to="/admin/user-management"
            className={`menuItemAdmin ${location.pathname === "/admin/user-management" ? "active" : ""}`}
          >
            <FontAwesomeIcon icon={faUser} className="iconAdmin" />
            <span className="menuTextAdmin">User Management</span>
          </Link>


          <Link
            to="/admin/verify-seller"
            className={`menuItemAdmin ${location.pathname === "/admin/verify-seller" ? "active" : ""}`}
          >
            <FontAwesomeIcon icon={faUserCheck} className="iconAdmin" />
            <span className="menuTextAdmin">Verify Seller</span>
          </Link>

          <Link
            to="/admin/help-center"
            className={`menuItemAdmin ${location.pathname === "/admin/help-center" ? "active" : ""}`}
          >
            <FontAwesomeIcon icon={faCircleQuestion} className="iconAdmin" />
            <span className="menuTextAdmin">Help Center</span>
          </Link>

         <div
                     className="Logout-menuItemAdmin"
                     style={{ cursor: "pointer" }}
                     onClick={handleLogout}
                     role="button"
                     tabIndex={0}
                     onKeyPress={(e) => {
                       if (e.key === "Enter" || e.key === " ") handleLogout();
                     }}
                     aria-label="Log out"
                   >
                     <FontAwesomeIcon icon={faRightFromBracket} className="iconAdmin" />
                     <span className="menuTextAdmin">Log Out</span>
                   </div>
        </nav>
      </aside>

      {/* Help Center Main Content */}
      <main className="group73HelpCenter">
        <div className="rectangle120HelpCenter"></div>
        <h2 className="titleHelpCenter">Support Messages</h2>

        {messages.length === 0 ? (
          <div className="rectangle124HelpCenter">
            <p className="reviewTextHelpCenter">No support messages yet.</p>
          </div>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className="rectangle124HelpCenter">
              <p className="reviewTextHelpCenter">"{msg.text}"</p>
              <p className="reviewAuthorHelpCenter">– Sent on: {msg.timestamp}</p>

              {msg.reply ? (
                <div className="replyBoxHelpCenter">
                  <p className="replyLabelHelpCenter">Admin Reply:</p>
                  <p className="replyTextHelpCenter">{msg.reply}</p>
                </div>
              ) : (
                <div className="replyFormHelpCenter">
                  <textarea
                    value={replyInputs[msg.id] || ""}
                    onChange={(e) => handleReplyChange(msg.id, e.target.value)}
                    placeholder="Type your reply here..."
                    className="replyTextareaHelpCenter"
                  />
                  <button
                    onClick={() => handleReplySubmit(msg.id)}
                    className="replyButtonHelpCenter"
                  >
                    Send Reply
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </main>
    </div>
  );
};

export default AdminHelpCenter;
