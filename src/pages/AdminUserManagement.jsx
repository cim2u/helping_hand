import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHouse,
  faUser,
  faCircleQuestion,
  faRightFromBracket,
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

  const [users, setUsers] = useState([]);
  const [userToDelete, setUserToDelete] = useState(null);
  const [dropdownOpenForUserId, setDropdownOpenForUserId] = useState(null);

  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  

  // Fetch users on mount
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('No token found. Redirecting to login...');
      navigate('/admin-login');
      return;
    }

    setLoading(true);
    setFetchError(null);

    fetch('http://localhost:8000/api/users', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then(async (res) => {
        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(`HTTP ${res.status} - ${res.statusText}: ${errorText}`);
        }
        return res.json();
      })
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
        setFetchError(error.message);
        setLoading(false);
      });
  }, [navigate]);

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

  // Logout handler
  const handleLogout = (e) => {
    e.preventDefault();
    const confirmLogout = window.confirm('Are you sure you want to log out?');
    if (confirmLogout) {
      localStorage.removeItem('user');
      localStorage.removeItem('loggedIn');
      localStorage.removeItem('isAdmin');
      localStorage.removeItem('token');
      navigate('/admin-login');
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

  const cancelDelete = () => setUserToDelete(null);

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
            style={{ cursor: 'pointer' }}
            onClick={handleLogout}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => {
              if (e.key === 'Enter' || e.key === ' ') handleLogout(e);
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

        {loading && <p style={{ padding: '20px', textAlign: 'center' }}>Loading users...</p>}

        {fetchError && (
          <p style={{ color: 'red', padding: '20px', textAlign: 'center' }}>
            Error: {fetchError}
          </p>
        )}

        {!loading && !fetchError && (
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
        )}

        {/* Delete Confirmation Modal */}
        {userToDelete && (
          <div
            className="modalOverlay"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modalTitle"
          >
            <div className="modalBox">
              <p id="modalTitle">
                Are you sure you want to delete user <strong>{userToDelete.name}</strong>?
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
