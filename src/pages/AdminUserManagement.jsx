import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHouse,
  faUser,
  faCircleQuestion,
  faRightFromBracket,
  faChevronDown,
  faMoneyBillTransfer,
  faUserCheck,
} from '@fortawesome/free-solid-svg-icons';

import '../style/AdminDashboard.css';
import '../style/AdminUserManagement.css';
import '../style/About.css';
import logo from '../assets/Logo.png';

const AdminUserManagement = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // Sample user data (replace with API or state management as needed)
  const [users, setUsers] = useState([
    { id: 1, name: 'Shelamae', role: 'Seller', email: 'shelamae@yamba', createDate: '2025-02-03' },
    { id: 2, name: 'John Doe', role: 'Buyer', email: 'john.doe@example.com', createDate: '2024-12-15' },
  ]);

  // User selected for deletion confirmation
  const [userToDelete, setUserToDelete] = useState(null);

  // Tracks which user's dropdown is open (user ID)
  const [dropdownOpenForUserId, setDropdownOpenForUserId] = useState(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpenForUserId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

  // Open delete confirmation modal
  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setDropdownOpenForUserId(null);
  };

  // Confirm user deletion
  const confirmDelete = () => {
    setUsers(users.filter((u) => u.id !== userToDelete.id));
    setUserToDelete(null);
  };

  // Cancel deletion modal
  const cancelDelete = () => setUserToDelete(null);

  // Toggle dropdown for specific user ID
  const toggleDropdown = (userId) => {
    setDropdownOpenForUserId((prev) => (prev === userId ? null : userId));
  };

  // Navigate to transaction history for user
  const handleTransactionClick = (user) => {
    setDropdownOpenForUserId(null);
    navigate('/admin/transaction-history', { state: { user } });
  };

  // Navigate to donation history for user
  const handleDonationClick = (user) => {
    setDropdownOpenForUserId(null);
    navigate('/admin/donation-history', { state: { user } });
  };

  return (
    <div className="containerAdmin">
      {/* Header Section */}
      <header className="about-header">
        <div className="about-header-1"></div>
        <div className="logo-container-2">
          <img src={logo} alt="HelpingHand Logo" className="logo" />
        </div>
        <h2 className="titleAdmin">USER MANAGEMENT</h2>
      </header>

      {/* Decorative Image */}
      <div className="image-section-2">
        <img
          src="https://i.imgur.com/GT5CDSQ.png"
          alt="Helping Hand"
          className="about-image-2"
        />
      </div>

      {/* Sidebar Navigation */}
      <aside className="sidebarAdmin">
        <div className="avatarAdmin" />
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
            to="/admin/verify-seller"
            className={`menuItemAdmin ${location.pathname === '/admin/verify-seller' ? 'active' : ''}`}
          >
            <FontAwesomeIcon icon={faUserCheck} className="iconAdmin" />
            <span className="menuTextAdmin">Verify Seller</span>
          </Link>

          <Link
            to="/admin/help-center"
            className={`menuItemAdmin ${location.pathname === '/admin/help-center' ? 'active' : ''}`}
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

      {/* Main Content: User Table */}
      <main className="userGroupContainer">
        <h1 className="userTitle">Users</h1>

        <div className="userTableContainer">
          <table className="userTable" role="table" aria-label="User management table">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Role</th>
                <th scope="col">Email</th>
                <th scope="col">Create Date</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>
                    No users found.
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.role}</td>
                    <td>{user.email}</td>
                    <td>{user.createDate}</td>
                    <td className="userActionsCell">
                      <button
                        className="deleteBtn"
                        onClick={() => handleDeleteClick(user)}
                        aria-label={`Delete user ${user.name}`}
                      >
                        Delete
                      </button>
                  
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Delete Confirmation Modal */}
        {userToDelete && (
          <div className="modalOverlay" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
            <div className="modalBox">
              <p id="modalTitle">
                Are you sure you want to delete user{' '}
                <strong>{userToDelete.name}</strong>?
              </p>
              <div className="modalButtons">
                <button onClick={confirmDelete} autoFocus>
                  Yes
                </button>
                <button onClick={cancelDelete}>No</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminUserManagement;
