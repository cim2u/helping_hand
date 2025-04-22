import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style/LogIn.css";
import logoImage from "../assets/Logo.png";

const LogIn = () => {
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
    console.log("Login submitted:", formData);

    // ✅ Simulate successful login
    localStorage.setItem("user", JSON.stringify(formData));
    localStorage.setItem("loggedIn", "true");
    
    localStorage.setItem("isSubscribed", "false"); // default value
    localStorage.setItem("isRegistered", "true");  // mark as registered ✅

    navigate("/home");
  };

  return (
    <div
      className="login-page"
      style={{
        backgroundImage: "https://s3-alpha-sig.figma.com/img/cddc/c69c/3f6f0a76202e9185950e2cc3030ddcf5?Expires=1745798400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=OSgpki4sDiZvJQaaVriuXYw824d-73NRdbbIvtE7QOxa0DEBTnaqr25l809G82VUYfdLi-qzcguGWZw113ZWHPkmCe39wejgx0mHBOZZ5OxXtrimYSAh37as31XlmaTMnXnIYhj-pVIVdnekxH1jYUYbF3lFRFLaOwi~-Op~ZqzpErl-9P6MmxTrDbm6bGuIKtH1xlZ3WPAepIf~Yb~2CYTyJgfjVg9T0mD7BSSVsLvnALAsBk0SPuH0Q~8rjRZmu-AMXGWT0hBvmxajESjf4suTA8ZvQwZGKVe~FZul1XSUnIqjrcerKK7FCVluiENEMOxr0cxaH-XUqwAbUyZCsw__",
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

          <h2>Welcome!</h2>

          <form onSubmit={handleSubmit} className="login-form">
            <label>Email</label>
            <input
              type="email"
              name="email"
              
              value={formData.email}
              onChange={handleChange}
              required
            />
            <label>Password</label>
            <input
              type="password"
              name="password"
              
              value={formData.password}
              onChange={handleChange}
              required
            />

            <Link to="/forgot-password" className="forgot-password">
              Forgot password?
            </Link>

            <button type="submit" className="login-btn">Login</button>


            <div className="signup-link">
              Don’t have an account? <Link to="/signup">Sign Up</Link>
            </div>

            <div className="admin-login">
              <Link to="/admin">Login as Admin</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
