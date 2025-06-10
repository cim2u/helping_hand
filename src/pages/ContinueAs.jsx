import React, { useState, useCallback, useEffect } from "react";
import "../style/ContinueAs.css";
import logoImage from "../assets/Logo.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ContinueAs = () => {
  const [role, setRole] = useState("");
  const [documentFile, setDocumentFile] = useState(null);
  const [isFileValid, setIsFileValid] = useState(false);
  const [documentType, setDocumentType] = useState("");
  const [isSellerSelected, setIsSellerSelected] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileDisplayName, setFileDisplayName] = useState("");

  const navigate = useNavigate();

  const handleFileChange = useCallback((e) => {
    const file = e.target.files[0];
    setDocumentFile(file);

    if (!file) {
      setIsFileValid(false);
      setFileDisplayName("");
      return;
    }

    const validTypes = ["application/pdf"];
    if (file.type.startsWith("image/") || validTypes.includes(file.type)) {
      setIsFileValid(true);
      setFileDisplayName(file.name);
    } else {
      setIsFileValid(false);
      setFileDisplayName("Invalid file type. Please upload a PDF or image.");
    }
  }, []);

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

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      if (!role) {
        alert("Please select a role.");
        return;
      }

      localStorage.setItem("pendingUserRole", role);

      if (role === "seller") {
        if (!documentFile || !isFileValid) {
          alert("Please upload a valid document.");
          return;
        }

        if (!documentType) {
          alert("Please select a document type.");
          return;
        }

        const userId = localStorage.getItem("userId");
        if (!userId) {
          alert("User not logged in. Please log in first.");
          return;
        }

        setIsSubmitting(true);

        const formData = new FormData();
        formData.append("document", documentFile);
        formData.append("document_type", documentType);
        formData.append("role", "seller");
        formData.append("user_id", userId);

        try {
          const response = await axios.post("http://localhost:8000/api/seller-verification-requests", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });

          if (response.status === 200 || response.status === 201) {
            alert("Document uploaded successfully. Please complete your signup.");
            navigate("/signup");
          } else {
            alert("Unexpected response from server. Please try again.");
            console.warn("Unexpected status:", response.status);
          }
        } catch (error) {
          alert("Error uploading document. Please try again.");
          console.error("Upload error:", error);
        } finally {
          setIsSubmitting(false);
        }
      } else if (role === "buyer") {
        alert("You selected Buyer. Please complete your signup.");
        navigate("/signup");
      }
    },
    [role, documentFile, isFileValid, documentType, navigate]
  );

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

  useEffect(() => {
    if (isSellerSelected) {
      document.getElementById("documentTypeSelect")?.focus();
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
            <h1 id="continue-as-title" className="form-title">Continue As</h1>
            <p id="form-instructions" className="form-instructions">Please select your role to continue.</p>

            {!isSellerSelected ? (
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
            ) : (
              <fieldset className="file-upload" aria-live="polite">
                <legend>Seller Document Verification</legend>

                <label htmlFor="documentTypeSelect" className="document-label">
                  Select Document Type:
                  <select
                    id="documentTypeSelect"
                    value={documentType}
                    onChange={(e) => setDocumentType(e.target.value)}
                    required
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
                    aria-describedby="fileHelp"
                  />
                  {fileDisplayName && (
                    <p id="fileHelp" className={isFileValid ? "file-valid" : "file-invalid"}>
                      {fileDisplayName}
                    </p>
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
