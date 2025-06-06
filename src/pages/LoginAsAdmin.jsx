import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../style/LogIn.css";
import logoImage from "../assets/Logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const LoginAsAdmin = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const togglePasswordVisibility = () => setPasswordVisible((prev) => !prev);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/public/admin/login",
        formData
      );

      const data = response.data;

      localStorage.setItem(
        "user",
        JSON.stringify({ role: "admin", username: data.username })
      );
      localStorage.setItem("token", data.token);
      localStorage.setItem("loggedIn", "true");
      localStorage.setItem("isAdmin", "true");

      navigate("/admin/dashboard");
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        alert(error.response.data.message);
      } else {
        alert("Network error. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
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
            <img src={logoImage} alt="Helping Hand Logo" className="logo-image" />
          </div>

          <div className="welcome-heading">
            <h2>Admin Login</h2>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              disabled={loading}
            />

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
                  disabled={loading}
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

            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>

            <div className="admin-login">
              <Link to="/login">Login as User</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginAsAdmin;
