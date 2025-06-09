import React, { useState, useCallback, useEffect, useRef } from "react";
import "../style/ContinueAs.css";
import logoImage from "../assets/Logo.png";
import { useNavigate } from "react-router-dom";

const ContinueAs = () => {
  const [role, setRole] = useState("");
  const [documentFile, setDocumentFile] = useState(null);
  const [isFileValid, setIsFileValid] = useState(false);
  const [documentType, setDocumentType] = useState("");
  const [isSellerSelected, setIsSellerSelected] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileDisplayName, setFileDisplayName] = useState("");

  const navigate = useNavigate();

  const fileValidationRef = useRef(null);

  // Handle file input change with validation
  const handleFileChange = useCallback((e) => {
    const file = e.target.files[0];
    setDocumentFile(file);

    if (!file) {
      setIsFileValid(false);
      setFileDisplayName("");
      return;
    }

    // Accept PDF or image files only
    const validTypes = ["application/pdf"];
    if (file.type.startsWith("image/") || validTypes.includes(file.type)) {
      setIsFileValid(true);
      setFileDisplayName(file.name);
    } else {
      setIsFileValid(false);
      setFileDisplayName("Invalid file type. Please upload a PDF or image.");
    }
  }, []);

  // Handle role change and reset dependent states
  const handleRoleChange = useCallback((selectedRole) => {
    setRole(selectedRole);
    if (selectedRole === "seller") {
      setIsSellerSelected(true);
    } else {
      setIsSellerSelected(false);
      setDocumentFile(null);
      setIsFileValid(false);
      setFileDisplayName("");
      setDocumentType("");
    }
  }, []);

  // Submit handler with validation and simulated async
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      if (!role) {
        alert("Please select a role.");
        return;
      }

      if (role === "seller") {
        if (!documentFile || !isFileValid) {
          alert("Please upload a valid document.");
          return;
        }
        if (!documentType) {
          alert("Please select a document type.");
          return;
        }

        setIsSubmitting(true);

        // Store "seller" role in localStorage for app logic
        localStorage.setItem("userRole", "seller");

        // Simulate API submission delay
        setTimeout(() => {
          alert("Files are ready to be submitted to the admin.");
          setIsSubmitting(false);
          navigate("/seller-info");
        }, 1500);
      } else if (role === "buyer") {
        localStorage.setItem("userRole", "buyer");
        navigate("/home");
      }
    },
    [role, documentFile, isFileValid, documentType, navigate]
  );

  // Cancel/reset form with user confirmation
  const handleCancel = useCallback(() => {
    if (window.confirm("Are you sure you want to cancel and reset the form?")) {
      setRole("");
      setDocumentFile(null);
      setIsFileValid(false);
      setDocumentType("");
      setIsSellerSelected(false);
      setFileDisplayName("");
    }
  }, []);

  // Focus the first input when switching to seller form for accessibility
  useEffect(() => {
    if (isSellerSelected) {
      const selectInput = document.getElementById("documentTypeSelect");
      if (selectInput) {
        selectInput.focus();
      }
    }
  }, [isSellerSelected]);

  return (
    <div className="d-container">
      <div className="continue-as-page">
        <div className="card-background" />
        <div className="overlay-card" role="main" aria-labelledby="continue-as-title">
          <img
            src={logoImage}
            alt="Helping Hand logo"
            className="logo-image"
            width={150}
            height={150}
            loading="lazy"
          />

          {/* Cancel button only when seller form active */}
          {isSellerSelected && (
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

          <form onSubmit={handleSubmit} className="continueas-form" aria-describedby="form-instructions">
            <h1 id="continue-as-title" className="form-title">
              Continue As
            </h1>
            <p id="form-instructions" className="form-instructions">
              Please select your role to continue.
            </p>

            {/* Role selection options */}
            {!isSellerSelected && (
              <>
                <div className="role-option">
                  <label>
                    <input
                      type="radio"
                      name="role"
                      value="seller"
                      checked={role === "seller"}
                      onChange={() => handleRoleChange("seller")}
                      aria-describedby="seller-desc"
                    />
                    <span className="role-title">Seller</span>
                    <p id="seller-desc" className="role-description">
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
                      aria-describedby="buyer-desc"
                    />
                    <span className="role-title">Buyer</span>
                    <p id="buyer-desc" className="role-description">
                      I would like to browse for products & services.
                    </p>
                  </label>
                </div>
              </>
            )}

            {/* Seller document upload section */}
            {isSellerSelected && (
              <fieldset
                className="file-upload"
                aria-live="polite"
                aria-relevant="additions removals"
                aria-atomic="true"
              >
                <legend>Seller Document Verification</legend>

                <label htmlFor="documentTypeSelect" className="document-label">
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
                  <label htmlFor="fileUpload" className="document-label">
                    Upload a File:
                  </label>
                  <input
                    id="fileUpload"
                    type="file"
                    accept=".pdf,image/*"
                    onChange={handleFileChange}
                    required
                    aria-required="true"
                    aria-describedby="fileHelp"
                  />
                </div>

                <div id="fileHelp" className="file-help-text" ref={fileValidationRef}>
                  {fileDisplayName && (
                    <span style={{ color: isFileValid ? "green" : "red" }}>
                      {fileDisplayName}
                    </span>
                  )}
                </div>
              </fieldset>
            )}

            <button
              type="submit"
              className="e-submit-btn"
              disabled={(role === "seller" && (!isFileValid || !documentType)) || isSubmitting}
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
