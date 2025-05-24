import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import "../style/ApprovalModal.css"; // Update your styles here

const ApprovalModal = ({
  isOpen,
  onClose,
  user,
  action,
  onSubmitComment
}) => {
  const [comment, setComment] = useState("");

  if (!isOpen) return null;

  const handleSubmit = () => {
    onSubmitComment(comment);
    setComment(""); // clear after submit
  };

  return (
    <div
      className="modalOverlayApproval"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modalTitleApproval"
    >
      <div className="modalContentApproval">
        <button
          className="modalCloseBtnApproval"
          onClick={onClose}
          aria-label="Close modal"
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>
        <h2 id="modalTitleApproval" className="modalTitleApproval">
          {action === "approved" ? "Approve" : "Reject"} Verification
        </h2>
        <p className="modalTextApproval">
          Please leave a comment to notify <strong>{user}</strong> about this {action}.
        </p>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your comment here..."
          rows={5}
          className="modalTextareaApproval"
          aria-label={`Comment for ${action} verification of ${user}`}
        />
        <button
          className="modalSubmitBtnApproval"
          onClick={handleSubmit}
          disabled={comment.trim() === ""}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ApprovalModal;
