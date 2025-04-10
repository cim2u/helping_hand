import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../style/LogIn.css";
import logoImage from "../assets/Logo.png";

const LogIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    // Check if the user is already logged in (by checking localStorage)
    const user = localStorage.getItem('user');
    if (user) {
      // If user data exists in localStorage, redirect to the dashboard or home
      window.location.href = '/dashboard'; // Or use navigate('/dashboard') if using react-router
    }
  }, []);

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

    // Save user data to localStorage (simulating a successful login)
    localStorage.setItem('user', JSON.stringify(formData));

    // Redirect to dashboard
    window.location.href = '/dashboard'; // or use navigate('/dashboard') if using react-router
  };

  return (
    <div
      className="login-page"
      style={{
        backgroundImage: "https://s3-alpha-sig.figma.com/img/cddc/c69c/3f6f0a76202e9185950e2cc3030ddcf5?Expires=1744588800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=kjxOMWUN80t2rVIumnkecxzwLsr-ege4Pdssqp2ylLLyryEBQ6FCkK-EYu8hPgpX~zsB3St5pn3QbHvtdyMTovGHTaDyHkfqhTAwR0fDnnZt6bF4do6Sdk4RbbEymd9jYvn9cHJZr2z8NCj4UDlvPY4frYGJSeqjsqLVf-HWu20YWfYI80epiKANjvYPt9kJ0tRF1USum4wMSjBXxGgrZaJjpRaUpY9djLUFx7pP~FRIMONo4-Lb5cmqj9YGDSWEVq1ft3STthhualXDryXf3xgGLxAXK2q2h9RvnjckWR8xl3~BlsgiPEpIn22d2tRlHnBbuzs~Wmz7pcBj9U7I~g__",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
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
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <Link to="/forgot-password" className="forgot-password">
            Forgot password?
          </Link>

          <button type="submit">Submit</button>

          <div className="signup-link">
            Don’t have an account? <Link to="/signup">Sign Up</Link>
          </div>

          <div className="admin-login">
            <Link to="/admin">Login as Admin</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
