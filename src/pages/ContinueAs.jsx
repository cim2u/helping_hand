import React, { useState } from "react";
import "../style/ContinueAs.css";
import logoImage from "../assets/Logo.png";
import { useNavigate } from "react-router-dom";

const ContinueAs = () => {
  // Role can be "student" or "buyer"
  const [role, setRole] = useState("");
  // Uploaded document file object
  const [documentFile, setDocumentFile] = useState(null);
  // Validity of the uploaded file type
  const [isFileValid, setIsFileValid] = useState(false);
  // Selected document type (e.g., COR or ID)
  const [documentType, setDocumentType] = useState("");
  // Flag for UI when student role is selected
  const [isStudentSelected, setIsStudentSelected] = useState(false);
  // Submission loading state
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Display filename or error message
  const [fileDisplayName, setFileDisplayName] = useState("");

  const navigate = useNavigate();

  // Handle file input change: validate type and update state
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setDocumentFile(file);

    if (file && (file.type === "application/pdf" || file.type.startsWith("image/"))) {
      setIsFileValid(true);
      setFileDisplayName(file.name);
    } else {
      setIsFileValid(false);
      setFileDisplayName("Invalid file type");
    }
  };

  // Handle role selection change, reset related states if needed
  const handleRoleChange = (selectedRole) => {
    setRole(selectedRole);
    if (selectedRole === "student") {
      setIsStudentSelected(true);
    } else {
      setIsStudentSelected(false);
      setDocumentFile(null);
      setIsFileValid(false);
      setFileDisplayName("");
      setDocumentType("");
    }
  };

  // Submit form handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!role) {
      alert("Please select a role.");
      return;
    }

    if (role === "student") {
      if (!documentFile || !isFileValid) {
        alert("Please upload a valid document.");
        return;
      }
      if (!documentType) {
        alert("Please select a document type.");
        return;
      }

      setIsSubmitting(true);

      // Save role as "seller" because student = seller in your app logic
      localStorage.setItem("userRole", "seller");

      // Simulate async submission (e.g., API call)
      setTimeout(() => {
        alert("Files are ready to be submitted to the admin.");
        setIsSubmitting(false);
        navigate("/seller-info");
      }, 1500);
    } else if (role === "buyer") {
      // For buyer role, save and navigate directly
      localStorage.setItem("userRole", "buyer");
      navigate("/home");
    }
  };

  // Cancel/reset the form with confirmation
  const handleCancel = () => {
    if (window.confirm("Are you sure you want to cancel and reset the form?")) {
      setRole("");
      setDocumentFile(null);
      setIsFileValid(false);
      setDocumentType("");
      setIsStudentSelected(false);
      setFileDisplayName("");
    }
  };

  return (
    <div className="d-container">
      <div className="continue-as-page">
        <div className="card-background" />
        <div className="overlay-card">
          <img src={logoImage} alt="Helping Hand Logo" className="logo-image" />

          {/* Show cancel button only when student form is open */}
          {role === "student" && isStudentSelected && (
            <button
              type="button"
              onClick={handleCancel}
              className="exit-icon"
              title="Exit and reset form"
              aria-label="Cancel and reset form"
            >
              ✕
            </button>
          )}

          <form onSubmit={handleSubmit} className="continueas-form" aria-label="Role selection form">
            {/* Show role selection if student form is not open */}
            {!isStudentSelected && (
              <>
                <div className="role-option">
                  <label>
                    <input
                      type="radio"
                      name="role"
                      value="student"
                      checked={role === "student"}
                      onChange={() => handleRoleChange("student")}
                    />
                    <span className="role-title">Student</span>
                    <p className="role-description">
                      I would like to sell my products & services.
                    </p>
                  </label>
                </div>

                <div className="role-option">
                  <label>
                    <input
                      type="radio"
                      name="role"
                      value="buyer"
                      checked={role === "buyer"}
                      onChange={() => handleRoleChange("buyer")}
                    />
                    <span className="role-title">Buyer</span>
                    <p className="role-description">
                      I would like to browse for products & services.
                    </p>
                  </label>
                </div>
              </>
            )}

            {/* Student document upload form */}
            {role === "student" && isStudentSelected && (
              <div className="file-upload">
                <label htmlFor="documentTypeSelect">
                  Select Document Type:
                  <select
                    id="documentTypeSelect"
                    value={documentType}
                    onChange={(e) => setDocumentType(e.target.value)}
                    required
                    aria-required="true"
                  >
                    <option value="">Select a document</option>
                    <option value="COR">Certificate of Enrollment (COR)</option>
                    <option value="ID">Student ID</option>
                  </select>
                </label>

                <div className="file-input-row">
                  <label htmlFor="fileUpload">Upload a File:</label>
                  <input
                    id="fileUpload"
                    type="file"
                    accept=".pdf, image/*"
                    onChange={handleFileChange}
                    required
                    aria-required="true"
                    aria-describedby="fileHelp"
                  />
                </div>

                <div id="fileHelp" className="file-help-text">
                  {fileDisplayName && (
                    <span style={{ color: isFileValid ? "green" : "red" }}>
                      {fileDisplayName}
                    </span>
                  )}
                </div>
              </div>
            )}

            <button
              type="submit"
              className="e-submit-btn"
              disabled={
                (role === "student" && (!isFileValid || !documentType)) || isSubmitting
              }
              aria-busy={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="spinner" aria-hidden="true"></div> Submitting...
                </>
              ) : (
                "Submit"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContinueAs;
