import React, { useState } from "react";
import "../style/Login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import API from "../api"; // Ensure this points to your API handler

const Login = ({ onClose }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await API.post("/login", { email, password });
      localStorage.setItem("token", response.data.token); // Store token if needed
      navigate("/"); // Redirect to homepage after login
    } catch (error) {
      setError(error.response?.data?.message || "Login failed! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    navigate(-1); // Navigate back to the previous page
    if (onClose) onClose(); // Call onClose to close the popup (if needed)
  };

  return (
    <div className="popup-overlay">
      <div className="login-form">
        <button className="close-btn" onClick={handleClose}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
        <h2>Login Form</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="forgot-password-btn">Forgot Password?</button>
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? "Logging in..." : "LOGIN"}
          </button>
        </form>
        <p className="signup-text">
          Not a member?{" "}
          <button className="signup-btn" onClick={() => navigate("/signup")}>
            Signup now
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
