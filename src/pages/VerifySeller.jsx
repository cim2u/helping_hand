import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faXmark,
  faFilePdf,
  faHouse,
  faUser,
  faUserCheck,
  faCircleQuestion,
  faRightFromBracket,
  faFilter,
} from "@fortawesome/free-solid-svg-icons";
import "../style/VerifySeller.css";
import logo from "../assets/Logo.png";
import ApprovalModal from "../components/ApprovalModal";

const DocumentPreview = ({ url, type, user }) => {
  const isPdf = url?.toLowerCase()?.endsWith(".pdf");
const navigate = useNavigate();

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="document-link"
      aria-label={`View ${type} document for ${user}`}
    >
      {isPdf ? (
        <>
          <FontAwesomeIcon icon={faFilePdf} /> View PDF
        </>
      ) : (
        <img
          src={url}
          alt={`${user} ${type}`}
          className="document-image"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://via.placeholder.com/150?text=Document+Not+Found";
          }}
        />
      )}
    </a>
  );
};

const StatusBadge = ({ status }) => {
  const statusConfig = {
    pending: { text: "Pending" },
    approved: { text: "Approved"},
    rejected: { text: "Rejected" },
  };

  const { text, color, icon } = statusConfig[status] || statusConfig.pending;

  return (
    <span className="status-badge" style={{ backgroundColor: color }}>
      {icon} {text}
    </span>
  );
};

const ActionButtons = ({ status, onApprove, onReject, user }) => {
  if (status !== "pending") {
    return <span className="no-actions">Action completed</span>;
  }

  return (
    <div className="action-btns">
      <button
        className="approve-btn"
        onClick={onApprove}
        aria-label={`Approve request for ${user}`}
      >
        <FontAwesomeIcon icon={faCheck} /> Approve
      </button>
      <button
        className="reject-btn"
        onClick={onReject}
        aria-label={`Reject request for ${user}`}
      >
        <FontAwesomeIcon icon={faXmark} /> Reject
      </button>
    </div>
  );
};

const VerifySeller = () => {

  const navigate = useNavigate(); // ✅ Correct placement
  const sampleRequests = [
    {
      id: 1,
      userId: "user123",
      user: "Juan Dela Cruz",
      email: "juan@example.com",
      documentType: "COR",
      documentUrl: "https://example.com/sample-ccor.pdf",
      status: "pending",
      dateSubmitted: "2023-05-15",
      businessName: "Juan's Store",
    },
  
    {
      id: 3,
      userId: "user789",
      user: "Pedro Reyes",
      email: "pedro@example.com",
      documentType: "Business Permit",
      documentUrl: "https://example.com/business-permit.pdf",
      status: "approved",
      dateSubmitted: "2023-05-10",
      businessName: "Pedro Enterprises",
    },
  ];

  const [requests, setRequests] = useState(sampleRequests);
  const [filteredRequests, setFilteredRequests] = useState(sampleRequests);
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortConfig, setSortConfig] = useState({
    key: "dateSubmitted",
    direction: "desc",
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [actionType, setActionType] = useState(null);
  const [notification, setNotification] = useState({
    show: false,
    message: "",
  });

  // Filter and sort requests whenever dependencies change
  useEffect(() => {
    let result = requests;

    // Filter by status if not "all"
    if (statusFilter !== "all") {
      result = result.filter((request) => request.status === statusFilter);
    }

    // Sort by key and direction
    if (sortConfig.key) {
      result = [...result].sort((a, b) => {
        const aVal = a[sortConfig.key];
        const bVal = b[sortConfig.key];

        // If sorting by date, parse to Date for accurate comparison
        if (sortConfig.key === "dateSubmitted") {
          return sortConfig.direction === "asc"
            ? new Date(aVal) - new Date(bVal)
            : new Date(bVal) - new Date(aVal);
        }

        // For strings
        if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    setFilteredRequests(result);
  }, [requests, statusFilter, sortConfig]);

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const openModal = (request, action) => {
    setSelectedRequest(request);
    setActionType(action);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedRequest(null);
    setActionType(null);
  };

  const handleSubmitComment = (comment) => {
    if (!selectedRequest || !actionType) return;

    // Update the status of the selected request
    const updatedRequests = requests.map((req) =>
      req.id === selectedRequest.id ? { ...req, status: actionType } : req
    );
    setRequests(updatedRequests);

    // Save notification to localStorage
    const supportMessages =
      JSON.parse(localStorage.getItem("supportMessages")) || [];

    const notificationMessage = {
      id: Date.now(),
      userId: selectedRequest.userId,
      text: `Your ${selectedRequest.documentType} verification has been ${actionType}. ${
        comment ? `Admin comment: ${comment}` : ""
      }`,
      timestamp: new Date().toISOString(),
      isRead: false,
      type: "verification",
    };

    localStorage.setItem(
      "supportMessages",
      JSON.stringify([...supportMessages, notificationMessage])
    );

    setNotification({
      show: true,
      message: `Successfully ${actionType} ${selectedRequest.user}'s request`,
    });

    // Hide notification after 3 seconds
    setTimeout(() => setNotification({ show: false, message: "" }), 3000);

    closeModal();
  };

  const handleLogout = (e) => {
    e.preventDefault();
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      localStorage.removeItem("user");
      localStorage.removeItem("loggedIn");
      localStorage.removeItem("isAdmin");
      navigate("/login-admin");
    }
  };

  return (
    <div className="containerAdmin">
      {/* Header */}
      <header className="about-header">
        <div className="about-header-1"></div>
        <div className="logo-container">
          <img src={logo} alt="Helping Hand Logo" className="logo" />
        </div>
        <h2 className="titleAdmin">VERIFY SELLER</h2>
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
      <aside className="sidebarAdmin" aria-label="Admin navigation">
        <div className="avatarAdmin"></div>
        <div className="adminNameGroupAdmin">
          <p className="adminNameAdmin">Francim Elorde</p>
          <p className="adminNameAdminRole">Admin</p>
        </div>
        <nav className="menuAdmin">
          <Link to="/admin/dashboard" className="menuItemAdmin">
            <FontAwesomeIcon icon={faHouse} className="iconAdmin" />
            <span className="menuTextAdmin">Dashboard</span>
          </Link>
          <Link to="/admin/user-management" className="menuItemAdmin">
            <FontAwesomeIcon icon={faUser} className="iconAdmin" />
            <span className="menuTextAdmin">User Management</span>
          </Link>
          <Link to="/admin/verify-seller" className="menuItemAdmin active">
            <FontAwesomeIcon icon={faUserCheck} className="iconAdmin" />
            <span className="menuTextAdmin">Verify Seller</span>
          </Link>
          <Link to="/admin/help-center" className="menuItemAdmin">
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

      {/* Main Content */}
      <section className="cardAdmin verify-seller" aria-label="Seller verification requests">
        <div className="verify-seller-header">
          <h3 className="cardTitleAdmin">Seller Verification Requests</h3>
          <div className="controls-row">
            <div className="filter-group">
              
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="status-filter"
                aria-label="Filter requests by status"
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
        </div>

        <div className="table-responsive">
          <table className="verify-seller-table" role="table">
            <thead>
              <tr>
                <th
                  onClick={() => requestSort("user")}
                  role="columnheader"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && requestSort("user")}
                  aria-sort={
                    sortConfig.key === "user"
                      ? sortConfig.direction === "asc"
                        ? "ascending"
                        : "descending"
                      : "none"
                  }
                >
                  User
                </th>
                <th
                  onClick={() => requestSort("email")}
                  role="columnheader"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && requestSort("email")}
                  aria-sort={
                    sortConfig.key === "email"
                      ? sortConfig.direction === "asc"
                        ? "ascending"
                        : "descending"
                      : "none"
                  }
                >
                  Email
                </th>
                <th
                  onClick={() => requestSort("documentType")}
                  role="columnheader"
                  tabIndex={0}
                  onKeyDown={(e) =>
                    e.key === "Enter" && requestSort("documentType")
                  }
                  aria-sort={
                    sortConfig.key === "documentType"
                      ? sortConfig.direction === "asc"
                        ? "ascending"
                        : "descending"
                      : "none"
                  }
                >
                  Document Type
                </th>
                <th>Document Preview</th>
                <th
                  onClick={() => requestSort("status")}
                  role="columnheader"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && requestSort("status")}
                  aria-sort={
                    sortConfig.key === "status"
                      ? sortConfig.direction === "asc"
                        ? "ascending"
                        : "descending"
                      : "none"
                  }
                >
                  Status
                </th>
                <th
                  onClick={() => requestSort("dateSubmitted")}
                  role="columnheader"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && requestSort("dateSubmitted")}
                  aria-sort={
                    sortConfig.key === "dateSubmitted"
                      ? sortConfig.direction === "asc"
                        ? "ascending"
                        : "descending"
                      : "none"
                  }
                >
                  Date Submitted
                </th>
                <th>Business Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.length === 0 && (
                <tr>
                  <td colSpan="8" style={{ textAlign: "center", padding: "1em" }}>
                    No requests found.
                  </td>
                </tr>
              )}
              {filteredRequests.map((request) => (
                <tr key={request.id}>
                  <td>{request.user}</td>
                  <td>{request.email}</td>
                  <td>{request.documentType}</td>
                  <td>
                    <DocumentPreview
                      url={request.documentUrl}
                      type={request.documentType}
                      user={request.user}
                    />
                  </td>
                  <td>
                    <StatusBadge status={request.status} />
                  </td>
                  <td>{new Date(request.dateSubmitted).toLocaleDateString()}</td>
                  <td>{request.businessName}</td>
                  <td>
                    <ActionButtons
                      status={request.status}
                      user={request.user}
                      onApprove={() => openModal(request, "approved")}
                      onReject={() => openModal(request, "rejected")}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    {modalOpen && selectedRequest && (
        <ApprovalModal
          isOpen={modalOpen}
          onClose={closeModal}
          onSubmitComment={handleSubmitComment}
          user={selectedRequest.user}
          action={actionType}
        />
      )}

        {notification.show && (
          <div
            className="notification"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
          >
            {notification.message}
          </div>
        )}
      </section>
    </div>
  );
};

export default VerifySeller;
