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
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setDocumentFile(file);
    if (file && (file.type === "application/pdf" || file.type.startsWith("image/"))) {
      setIsFileValid(true);
    } else {
      setIsFileValid(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!role) {
      alert("Please select a role.");
      return;
    }

    if (role === "student") {
      if (!documentFile) {
        alert("Please upload your Certificate of Enrollment or Student ID.");
        return;
      }

      localStorage.setItem("documentFile", documentFile.name);
      localStorage.setItem("documentType", documentType);
      navigate("/myshop", { state: { role, documentFile: documentFile.name, documentType } });
    }

    if (role === "buyer") {
      const userRole = localStorage.getItem("role");
      if (userRole === "buyer") {
        navigate("/home");
      } else {
        navigate("/login");
      }
    }
  };

  const handleCancel = () => {
    if (window.confirm("Are you sure you want to cancel and reset the form?")) {
      setRole("");
      setDocumentFile(null);
      setDocumentType("");
      setIsStudentSelected(false);
    }
  };

  return (
    <div className="continue-as-page">
      <div className="card-background" />
      <div className="overlay-card">
        <img src={logoImage} alt="Helping Hand Logo" className="logo-image" />

        {role === "student" && isStudentSelected && (
          <span
            className="exit-icon"
            onClick={handleCancel}
            title="Exit and go back"
          >
            &#10005;
          </span>
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
                    onChange={() => {
                      setRole("student");
                      setIsStudentSelected(true);
                    }}
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
                    onChange={() => {
                      setRole("buyer");
                      setIsStudentSelected(false);
                    }}
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

              <label>
                Upload Certificate of Enrollment (COR) or Student ID
                <input
                  type="file"
                  accept=".pdf, image/*"
                  onChange={handleFileChange}
                  required
                />
              </label>

              {!isFileValid && documentFile && (
                <span style={{ color: "red" }}>
                  Invalid file type. Please upload a PDF or image (JPG, PNG, etc.).
                </span>
              )}

              {documentFile && isFileValid && (
                <button type="button" className="send-btn" onClick={handleSubmit}>
                  Send
                </button>
              )}
            </div>
          )}

          <button
            type="submit"
            className="submit-btn"
            disabled={!isFileValid && role === "student"}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContinueAs;
