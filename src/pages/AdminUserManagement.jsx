import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHouse,
  faUser,
  faCircleQuestion,
  faRightFromBracket,
  faChevronDown,
} from '@fortawesome/free-solid-svg-icons';

import '../style/AdminDashboard.css';
import '../style/AdminUserManagement.css';
import '../style/About.css';
import logo from '../assets/Logo.png';

const AdminUserManagement = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'Shelamae',
      role: 'Seller',
      email: 'shelamae@yamba',
      createDate: '2025-02-03',
    },
    {
      id: 2,
      name: 'John Doe',
      role: 'Buyer',
      email: 'john.doe@example.com',
      createDate: '2024-12-15',
    },
  ]);

  const [userToDelete, setUserToDelete] = useState(null);
  const [dropdownOpenForUserId, setDropdownOpenForUserId] = useState(null);
  const boxRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (boxRef.current && !boxRef.current.contains(event.target)) {
        setDropdownOpenForUserId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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

  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setDropdownOpenForUserId(null);
  };

  const confirmDelete = () => {
    setUsers(users.filter((u) => u.id !== userToDelete.id));
    setUserToDelete(null);
  };

  const cancelDelete = () => {
    setUserToDelete(null);
  };

  const toggleDropdown = (userId) => {
    setDropdownOpenForUserId((prev) => (prev === userId ? null : userId));
  };

  const handleTransactionClick = (user) => {
    setDropdownOpenForUserId(null);
    navigate('/admin/transaction-history', { state: { user } });
  };

  const handleDonationClick = (user) => {
    setDropdownOpenForUserId(null);
    navigate('/admin/donation-history', { state: { user } });
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

      {/* Sidebar */}
      <aside className="sidebarAdmin">
        <div className="avatarAdmin"></div>
        <div className="adminNameGroupAdmin">
          <p className="adminNameAdmin">Francim Elorde</p>
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

      {/* Main User Table */}
      <div className="userGroupContainer">
        <div className="userBackgroundLayer"></div>
        <div className="userContentBox"></div>

        <h1 className="userTitle">Users</h1>

        <div className="userColumnHeaders" style={{ display: 'flex', fontWeight: 'bold', padding: '10px 0' }}>
          <span style={{ flexBasis: '50px' }}>ID</span>
          <span style={{ flexBasis: '150px' }}>Name</span>
          <span style={{ flexBasis: '100px' }}>Role</span>
          <span style={{ flexBasis: '200px' }}>Email</span>
          <span style={{ flexBasis: '150px' }}>Create Date</span>
          <span style={{ flexBasis: '250px' }}>Actions</span>
        </div>

        {users.map((user) => (
          <div
            key={user.id}
            className="userRow"
            style={{
              display: 'flex',
              padding: '10px 0',
              borderBottom: '1px solid #ddd',
              alignItems: 'center',
              position: 'relative',
            }}
          >
            <span style={{ flexBasis: '50px' }}>{user.id}</span>
            <span style={{ flexBasis: '150px' }}>{user.name}</span>
            <span style={{ flexBasis: '100px' }}>{user.role}</span>
            <span style={{ flexBasis: '200px' }}>{user.email}</span>
            <span style={{ flexBasis: '150px' }}>{user.createDate}</span>
            <div style={{ flexBasis: '250px', display: 'flex', gap: '10px' }}>
              <button className="deleteBtn" onClick={() => handleDeleteClick(user)}>
                Delete
              </button>
              <button
                className="dropdownToggleBtn"
                onClick={() => toggleDropdown(user.id)}
                style={{ cursor: 'pointer' }}
                aria-label="Toggle dropdown"
              >
                <FontAwesomeIcon icon={faChevronDown} />
              </button>
            </div>

            {dropdownOpenForUserId === user.id && (
              <div
                ref={boxRef}
                className="chover-down-arrow-container"
                style={{
                  position: 'absolute',
                  width: 273,
                  height: 153,
                  background: '#FEFEFE',
                  borderRadius: 28,
                  top: '40px',
                  right: '10px',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                  zIndex: 10,
                }}
              >
                <div
                  style={{
                    width: '100%',
                    height: 31,
                    background: '#1E1E1E',
                    borderTopLeftRadius: 28,
                    borderTopRightRadius: 28,
                  }}
                />
                <div
                  onClick={() => handleTransactionClick(user)}
                  style={{
                    position: 'absolute',
                    left: 27,
                    top: 58,
                    fontWeight: 500,
                    fontSize: 15,
                    textDecoration: 'underline',
                    cursor: 'pointer',
                  }}
                >
                  Transaction History
                </div>
                <div
                  onClick={() => handleDonationClick(user)}
                  style={{
                    position: 'absolute',
                    left: 27,
                    top: 97,
                    fontWeight: 500,
                    fontSize: 15,
                    textDecoration: 'underline',
                    cursor: 'pointer',
                  }}
                >
                  Donation History
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Delete Confirmation Modal */}
        {userToDelete && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0,0,0,0.5)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 1000,
            }}
          >
            <div
              style={{
                background: 'white',
                padding: '20px',
                borderRadius: '10px',
                maxWidth: '400px',
                textAlign: 'center',
              }}
            >
              <p>
                Are you sure you want to delete user <strong>{userToDelete.name}</strong>?
              </p>
              <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '15px' }}>
                <button onClick={confirmDelete} style={{ padding: '8px 16px' }}>
                  Yes
                </button>
                <button onClick={cancelDelete} style={{ padding: '8px 16px' }}>
                  No
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUserManagement;
