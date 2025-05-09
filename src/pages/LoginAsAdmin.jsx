import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style/LogIn.css";
import logoImage from "../assets/Logo.png";

const LoginAsAdmin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = formData;

    // Set your admin credentials here
    const adminEmail = "admin@helpinghand.com";
    const adminPassword = "admin123";

    // Check if the email and password match the admin credentials
    if (email === adminEmail && password === adminPassword) {
      console.log("Admin login successful");

      // Save admin status in localStorage
      localStorage.setItem("user", JSON.stringify({ role: "admin", email }));
      localStorage.setItem("loggedIn", "true");
      localStorage.setItem("isAdmin", "true");

      navigate("/admin-dashboard"); // Redirect to admin dashboard
    } else {
      alert("Invalid admin credentials.");
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
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <button type="submit" className="login-btn">Login</button>

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
