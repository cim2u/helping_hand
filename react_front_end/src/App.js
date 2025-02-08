import React, { useState } from "react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple validation (can be expanded)
    if (!formData.email.includes("@")) {
      alert("Please enter a valid email address.");
      return;
    }
    console.log("Form Data Submitted:", formData);
  };

  return (
    <div className="container">
      <div className="form-section">
        <h1 className="logo">
          <span className="helping">Helping</span> <span className="hand">Hand</span>
        </h1>
        <div className="subtitle">CDO’s Marketplace for Student Talent and Creativity!</div>

        <p className="description">Create a free account and join our growing community!</p>

        <form className="register-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              required
              onChange={handleChange}
              value={formData.firstName}
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              required
              onChange={handleChange}
              value={formData.lastName}
            />
          </div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            onChange={handleChange}
            value={formData.email}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            onChange={handleChange}
            value={formData.password}
          />
          <button type="submit">Sign Up</button>
        </form>

        <p className="terms">
          By creating an account, you agree to HelpingHand's <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
        </p>
      </div>
      <div className="image-section"></div>
    </div>
  );
}

export default App;
