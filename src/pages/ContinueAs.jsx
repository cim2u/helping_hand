import React, { useState } from "react";
import "../style/ContinueAs.css";
import logoImage from "../assets/Logo.png";
import { useNavigate } from "react-router-dom";


const ContinueAs = () => {
  const [role, setRole] = useState("");
  const [documentFile, setDocumentFile] = useState(null);
  const [isFileValid, setIsFileValid] = useState(false);
  const [documentType, setDocumentType] = useState("");
  const [isStudentSelected, setIsStudentSelected] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileDisplayName, setFileDisplayName] = useState("");

  const [gcashQR, setGcashQR] = useState(null);
  const [isGcashQRValid, setIsGcashQRValid] = useState(false);
  const [gcashQRDisplayName, setGcashQRDisplayName] = useState("");
  const [userUploadedQR, setUserUploadedQR] = useState(null);  // New state for QR preview URL

  const navigate = useNavigate();

  // Validate document file: PDF or image
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

  // Validate GCash QR file: image only & create preview URL
  const handleGcashQRChange = (e) => {
    const file = e.target.files[0];
    setGcashQR(file);

    if (file && file.type.startsWith("image/")) {
      setIsGcashQRValid(true);
      setGcashQRDisplayName(file.name);

      // Create a URL for the uploaded image
      const imageUrl = URL.createObjectURL(file);
      setUserUploadedQR(imageUrl);

      // Optional: Save to localStorage for access on other pages
      // localStorage.setItem("userUploadedQR", imageUrl);
    } else {
      setIsGcashQRValid(false);
      setGcashQRDisplayName("Invalid file type");
      setUserUploadedQR(null);

      // Optional: Remove from localStorage if invalid
      // localStorage.removeItem("userUploadedQR");
    }
  };

  // Submit handler with validation and simulated async
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
      if (!gcashQR || !isGcashQRValid) {
        alert("Please upload a valid GCash QR Code.");
        return;
      }

      setIsSubmitting(true);

      // Simulate API call or form submission delay
      setTimeout(() => {
        alert("Files are ready to be submitted to the admin.");
        setIsSubmitting(false);
        navigate("/store");
      }, 1500);

    } else if (role === "buyer") {
      navigate("/home");
    }
  };

  // Reset all form data on cancel
  const handleCancel = () => {
    if (window.confirm("Are you sure you want to cancel and reset the form?")) {
      setRole("");
      setDocumentFile(null);
      setDocumentType("");
      setIsStudentSelected(false);
      setFileDisplayName("");
      setGcashQR(null);
      setIsGcashQRValid(false);
      setGcashQRDisplayName("");
      setUserUploadedQR(null);

      // Optional: Remove QR from localStorage on cancel
      // localStorage.removeItem("userUploadedQR");
    }
  };

  // When role changes, reset related state
  const handleRoleChange = (selectedRole) => {
    setRole(selectedRole);
    if (selectedRole === "student") {
      setIsStudentSelected(true);
    } else {
      // Reset student-specific fields when switching to buyer
      setIsStudentSelected(false);
      setDocumentFile(null);
      setIsFileValid(false);
      setFileDisplayName("");
      setDocumentType("");
      setGcashQR(null);
      setIsGcashQRValid(false);
      setGcashQRDisplayName("");
      setUserUploadedQR(null);

      // Optional: Remove QR from localStorage on role switch
      // localStorage.removeItem("userUploadedQR");
    }
  };

  return (
    <div className="d-container">
      <div className="continue-as-page">
        <div className="card-background" />
        <div className="overlay-card">
          <img src={logoImage} alt="Helping Hand Logo" className="logo-image" />

          {role === "student" && isStudentSelected && (
            <button
              type="button"
              onClick={handleCancel}
              className="exit-icon"
              title="Exit and reset form"
            >
              ✕
            </button>
          )}

          <form onSubmit={handleSubmit} className="continueas-form">
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

            {role === "student" && isStudentSelected && (
              <div className="file-upload">
                {/* Document Type Select */}
                <label>
                  Select Document Type:
                  <select
                    value={documentType}
                    onChange={(e) => setDocumentType(e.target.value)}
                    required
                  >
                    <option value="">Select a document</option>
                    <option value="COR">Certificate of Enrollment (COR)</option>
                    <option value="ID">Student ID</option>
                  </select>
                </label>

                {/* Document Upload */}
                <div className="file-input-row">
                  <label htmlFor="fileUpload">Upload a File:</label>
                  <input
                    id="fileUpload"
                    type="file"
                    accept=".pdf, image/*"
                    onChange={handleFileChange}
                    required
                  />
                </div>

                {/* File Validation Message */}
                {!isFileValid && documentFile && (
                  <span style={{ color: "red" }}>
                    Invalid file type. Please upload a PDF or image (JPG, PNG, etc.).
                  </span>
                )}

                {/* GCash QR Upload */}
                <div className="file-input-row">
                  <label htmlFor="gcashQRUpload">Upload GCash QR Code:</label>
                  <input
                    id="gcashQRUpload"
                    type="file"
                    accept="image/*"
                    onChange={handleGcashQRChange}
                    required
                  />
                </div>

                {/* QR Validation Message */}
                {!isGcashQRValid && gcashQR && (
                  <span style={{ color: "red" }}>
                    Invalid QR Code. Please upload an image (JPG, PNG, etc.).
                  </span>
                )}

                {/* Preview uploaded QR (optional) */}
                {isGcashQRValid && userUploadedQR && (
                  <div className="qr-preview">
                    <p>Preview:</p>
                    <img
                      src={userUploadedQR}
                      alt="Uploaded GCash QR"
                      style={{ width: "150px", height: "150px", objectFit: "contain", border: "1px solid #ccc" }}
                    />
                  </div>
                )}
              </div>
            )}

            <button
              type="submit"
              className="e-submit-btn"
              disabled={
                (role === "student" && (!isFileValid || !isGcashQRValid || !documentType)) || isSubmitting
              }
            >
              {isSubmitting ? (
                <>
                  <div className="spinner"></div> Submitting...
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
