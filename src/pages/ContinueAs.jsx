import React, { useState } from "react";
import "../style/ContinueAs.css";
import logoImage from "../assets/Logo.png";
import { useNavigate } from "react-router-dom";

const ContinueAs = () => {
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (role) {
      console.log("Selected role:", role);
      navigate("/terms", { state: { role } });
    } else {
      alert("Please select a role.");
    }
  };

  return (
    <div className="continue-as-page">
      <div className="card-background" />

      <div className="overlay-card">
        <img src={logoImage} alt="Helping Hand Logo" className="logo-image" />

        <form onSubmit={handleSubmit} className="continueas-form">
          <div className="role-option">
            <label>
              <input
                type="radio"
                name="role"
                value="student"
                checked={role === "student"}
                onChange={() => setRole("student")}
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
                onChange={() => setRole("buyer")}
              />
              <span className="role-title">Buyer</span>
              <p className="role-description">
                I would like to browse for products & services.
              </p>
            </label>
          </div>

          <button type="submit" className="submit-btn">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContinueAs;
