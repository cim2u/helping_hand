import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style/LogIn.css";
import logoImage from "../assets/Logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const LogIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const [isRegistered, setIsRegistered] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      if (formData.email && formData.password) {
        // Simulate token and session
        localStorage.setItem("authToken", "fake-token-123");
        localStorage.setItem("isRegistered", "true");
        localStorage.setItem("isLoggedIn", "true");

        // Check for admin by email (you can change this condition)
        const isAdmin = formData.email === "admin@example.com";
        localStorage.setItem("userRole", isAdmin ? "admin" : "user");
        setIsRegistered(true);

        // Navigate based on role
        if (isAdmin) {
          navigate("/admin-dashboard");
        } else {
          navigate("/home");
        }
      } else {
        setError("Please enter both email and password.");
      }
    } catch (err) {
      setError("Login failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  return (
    <div
      className="login-page"
      style={{
        backgroundImage: "url('https://i.imgur.com/ErEQ4GI.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="b-container">
        <div className="login-container">
          <div className="logo-wrapper">
            <img
              src={logoImage}
              alt="Helping Hand Logo"
              className="logo-image"
            />
          </div>

          <div className="welcome-heading">
            <h2>Welcome!</h2>
          </div>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit} className="login-form">
            <input
              type="hidden"
              autoComplete="off"
              name="login_source"
              value="comet_headerless_login"
            />

            <div className="login-rectangle12"></div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                autoComplete="username"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="password-container">
                <input
                  id="password"
                  type={passwordVisible ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  autoComplete="current-password"
                  className="form-input"
                />
                {formData.password && (
                  <FontAwesomeIcon
                    icon={passwordVisible ? faEye : faEyeSlash}
                    onClick={togglePasswordVisibility}
                    className="password-toggle-icon"
                    title={passwordVisible ? "Hide password" : "Show password"}
                  />
                )}
              </div>
            </div>

           

            <button
              type="submit"
              className="login-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>

            <div className="auth-links">
              <div className="signup-link">
                Don't have an account? <Link to="/signup">Sign Up</Link>
              </div>
              <div className="admin-login">
                <Link to="/login-admin">Login as Admin</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
