import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faCheck, 
  faXmark, 
  faFilePdf, 
  faHouse,
  faUser,
  faMoneyBillTransfer,
  faUserCheck,
  faCircleQuestion,
  faClock,
  faRightFromBracket
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "../style/AdminDashboard.css";
import "../style/About.css";
import "../style/VerifySeller.css";
import logo from "../assets/Logo.png";
import ApprovalModal from "../components/ApprovalModal";

// DocumentPreview: preview PDF or image link
const DocumentPreview = ({ url, type, user }) => {
  const isPdf = url.toLowerCase().endsWith(".pdf");
  if (isPdf) {
    return (
      <a 
        href={url} 
        target="_blank" 
        rel="noopener noreferrer" 
        aria-label={`View ${type} document for ${user}`}
        className="document-link"
      >
        <FontAwesomeIcon icon={faFilePdf} /> View PDF
      </a>
    );
  } else {
    return (
      <a 
        href={url} 
        target="_blank" 
        rel="noopener noreferrer" 
        aria-label={`View ${type} image for ${user}`}
      >
        <img 
          src={url} 
          alt={`${user} ${type}`} 
          className="document-image" 
        />
      </a>
    );
  }
};

// Status badge with colors
const StatusBadge = ({ status }) => {
  const statusText = {
    pending: "Pending",
    approved: "Approved",
    rejected: "Rejected",
  };
  return (
    <span className={`status-badge status-${status}`}>
      {status === "approved" && "✅ "}
      {status === "rejected" && "❌ "}
      {statusText[status]}
    </span>
  );
};

// Buttons for approve/reject actions
const ActionButtons = ({ status, onApprove, onReject, user }) => {
  if (status !== "pending") {
    return <span>No actions available</span>;
  }
  return (
    <>
      <button
        className="approve-btn"
        onClick={onApprove}
        aria-label={`Approve verification for ${user}`}
      >
        <FontAwesomeIcon icon={faCheck} /> Approve
      </button>
      <button
        className="reject-btn"
        onClick={onReject}
        aria-label={`Reject verification for ${user}`}
        style={{ marginLeft: "0.5rem" }}
      >
        <FontAwesomeIcon icon={faXmark} /> Reject
      </button>
    </>
  );
};

const VerifySeller = () => {
  const [requests, setRequests] = useState([
    {
      id: 1,
      user: "Juan Dela Cruz",
      documentType: "CCOR",
      documentUrl: "https://example.com/sample-ccor.pdf",
      gcashQrCodeUrl: "https://i.imgur.com/GT5CDSQ.png",
      status: "pending",
      dateSubmitted: "2023-05-15",
    },
    {
      id: 2,
      user: "Maria Santos",
      documentType: "ID",
      documentUrl: "https://i.imgur.com/GT5CDSQ.png",
      gcashQrCodeUrl: "https://i.imgur.com/GT5CDSQ.png",
      status: "pending",
      dateSubmitted: "2023-05-16",
    },
    {
      id: 3,
      user: "Pedro Reyes",
      documentType: "Business Permit",
      documentUrl: "https://example.com/business-permit.pdf",
      gcashQrCodeUrl: "https://i.imgur.com/GT5CDSQ.png",
      status: "approved",
      dateSubmitted: "2023-05-10",
    },
  ]);

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [actionType, setActionType] = useState(null);

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
    if (selectedRequest && actionType) {
      setRequests((prev) =>
        prev.map((req) =>
          req.id === selectedRequest.id ? { ...req, status: actionType } : req
        )
      );
      console.log(`User "${selectedRequest.user}" was ${actionType} with comment: "${comment}"`);
      closeModal();
    }
  };

  const handleLogout = () => {
    console.log("Logging out...");
  };

  return (
    <div className="containerAdmin">
      {/* Header */}
      <header className="about-header">
        <div className="about-header-1"></div>
        <div className="logo-container">
          <img src={logo} alt="Helping Hand Logo" className="logo" />
        </div>
        <h2 className="titleAdmin">DASHBOARD</h2>
      </header>

      <div className="image-section-2">
        <img
          src="https://i.imgur.com/GT5CDSQ.png"
          alt="Helping Hand"
          className="about-image-2"
        />
      </div>

      {/* Sidebar */}
      <aside className="sidebarAdmin" aria-label="Admin sidebar navigation">
        <div className="avatarAdmin" aria-hidden="true"></div>
        <div className="adminNameGroupAdmin">
          <p className="adminNameAdmin">Francim Elorde</p>
          <p className="adminNameAdminRole">Admin</p>
        </div>
        <nav className="menuAdmin" role="navigation" aria-label="Admin menu">
          <Link
            to="/admin/dashboard"
            className={`menuItemAdmin ${window.location.pathname === "/admin/dashboard" ? "active" : ""}`}
          >
            <FontAwesomeIcon icon={faHouse} className="iconAdmin" />
            <span className="menuTextAdmin">Dashboard</span>
          </Link>

          <Link
            to="/admin/user-management"
            className={`menuItemAdmin ${window.location.pathname === "/admin/user-management" ? "active" : ""}`}
          >
            <FontAwesomeIcon icon={faUser} className="iconAdmin" />
            <span className="menuTextAdmin">User Management</span>
          </Link>

          <Link
            to="/admin/payments"
            className={`menuItemAdmin ${window.location.pathname === "/admin/payments" ? "active" : ""}`}
          >
            <FontAwesomeIcon icon={faMoneyBillTransfer} className="iconAdmin" />
            <span className="menuTextAdmin">Pending Payments</span>
          </Link>
          
          <Link
            to="/admin/verify-seller"
            className={`menuItemAdmin ${window.location.pathname === "/admin/verify-seller" ? "active" : ""}`}
          >
            <FontAwesomeIcon icon={faUserCheck} className="iconAdmin" />
            <span className="menuTextAdmin">Verify Seller</span>
          </Link>

          <Link
            to="/admin/help-center"
            className={`menuItemAdmin ${window.location.pathname === "/admin/help-center" ? "active" : ""}`}
          >
            <FontAwesomeIcon icon={faCircleQuestion} className="iconAdmin" />
            <span className="menuTextAdmin">Help Center</span>
          </Link>


          {/* Logout */}
          <div
            className="Logout-menuItemAdmin"
            onClick={handleLogout}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                handleLogout(e);
              }
            }}
            style={{ cursor: "pointer" }}
            aria-label="Log Out"
          >
            <div className="menuItemAdmin">
              <FontAwesomeIcon icon={faRightFromBracket} className="iconAdmin" />
              <span className="menuTextAdmin">Log Out</span>
            </div>
          </div>
        </nav>
      </aside>

      {/* Main content */}
      <section className="cardAdmin verify-seller" aria-labelledby="verify-seller-title">
        <div className="verify-seller-header">
          <h3 id="verify-seller-title" className="cardTitleAdmin">Seller Verification Requests</h3>
        </div>

        <table className="verify-seller-table" role="table">
          <thead>
            <tr>
              <th>User</th>
              <th>Document</th>
              <th>GCash QR Code</th>
              <th>Date Submitted</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {requests.map((request) => (
              <tr key={request.id}>
                <td>{request.user}</td>
                <td>
                  <DocumentPreview
                    url={request.documentUrl}
                    type={request.documentType}
                    user={request.user}
                  />
                </td>
                <td>
                  <a href={request.gcashQrCodeUrl} target="_blank" rel="noopener noreferrer" aria-label={`View GCash QR code for ${request.user}`}>
                    <img
                      src={request.gcashQrCodeUrl}
                      alt={`GCash QR code for ${request.user}`}
                      className="gcash-qr-code"
                    />
                  </a>
                </td>
                <td>{request.dateSubmitted}</td>
                <td><StatusBadge status={request.status} /></td>
                <td>
                  <ActionButtons
                    status={request.status}
                    onApprove={() => openModal(request, "approved")}
                    onReject={() => openModal(request, "rejected")}
                    user={request.user}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Approval/Rejection Modal */}
        <ApprovalModal
          isOpen={modalOpen}
          onClose={closeModal}
          user={selectedRequest?.user || ""}
          action={actionType}
          onSubmitComment={handleSubmitComment}
        />
      </section>
    </div>
  );
};

export default VerifySeller;
