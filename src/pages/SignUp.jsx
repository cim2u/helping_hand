import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "../style/Logo.module.css";
import logoImage from "../assets/Logo.png";
import "../style/SignUp.css";

// SignupForm component
const SignupForm = ({ handleChange, formData, handleSubmit, errors, isSubmitting }) => (
  <form onSubmit={handleSubmit} className="signup-form">
    <div className="name-container">
      <div className="signup-group">
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          name="firstName"
          id="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        {errors.firstName && <p className="signup-error-message">{errors.firstName}</p>}
      </div>

      <div className="signup-group">
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          name="lastName"
          id="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
        {errors.lastName && <p className="signup-error-message">{errors.lastName}</p>}
      </div>
    </div>

    <div className="signup-form-group">
      <label htmlFor="email">Email</label>
      <input
        type="email"
        name="email"
        id="email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      {errors.email && <p className="signup-error-message">{errors.email}</p>}
    </div>

    <div className="signup-form-group">
      <label htmlFor="username">Username</label>
      <input
        type="text"
        name="username"
        id="username"
        value={formData.username}
        onChange={handleChange}
        required
      />
      {errors.username && <p className="signup-error-message">{errors.username}</p>}
    </div>

    <div className="signup-form-group">
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        id="password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      {errors.password && <p className="signup-error-message">{errors.password}</p>}
    </div>

    <div className="signup-form-group">
      <label htmlFor="confirmPassword">Confirm Password</label>
      <input
        type="password"
        name="confirmPassword"
        id="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
        required
      />
      {errors.confirmPassword && <p className="signup-error-message">{errors.confirmPassword}</p>}
    </div>

    <button
      type="submit"
      disabled={isSubmitting}
      className={`signup-submit-button ${isSubmitting ? "btn-disabled" : ""}`}
    >
      {isSubmitting ? "Submitting..." : "Submit"}
    </button>

    <p className="signup-login-text">
      Already have an account?{" "}
      <Link to="/login" className="signup-login-link">Login</Link>
    </p>
  </form>
);

// Main SignUp component
const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value.trimStart(),
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const cleanedData = {
      name: `${formData.firstName.trim()} ${formData.lastName.trim()}`,
      username: formData.username.trim(),
      email: formData.email.trim(),
      password: formData.password,
      password_confirmation: formData.confirmPassword,
    };

    if (cleanedData.password !== formData.confirmPassword) {
      setErrors({ confirmPassword: "Passwords do not match." });
      return;
    }

    if (cleanedData.password.length < 6) {
      setErrors({ password: "Password must be at least 6 characters." });
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      await axios.post("https://your-ngrok-url.ngrok.io/api/register", cleanedData, {
        headers: { "Content-Type": "application/json" },
      });

      localStorage.setItem("isRegistered", "true");
      localStorage.setItem("loggedIn", "true");
      navigate("/terms");
    } catch (error) {
      if (error.response?.data?.errors) {
        const backendErrors = error.response.data.errors;
        const formattedErrors = {};
        Object.keys(backendErrors).forEach((key) => {
          formattedErrors[key] = backendErrors[key][0];
        });
        setErrors(formattedErrors);
      } else {
        setErrors({ general: "An error occurred. Please try again." });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="c-container">
      <div className="flex h-screen">
        {/* Left Panel - Signup Form */}
        <div className="signup-left-panel">
          <div className="logo-signup">
            <img src={logoImage} alt="HelpingHand Logo" className={styles.logoLarge} />
          </div>

          <p className="create-text">
            Create a free account and join our growing community!
          </p>

          <SignupForm
            handleChange={handleChange}
            formData={formData}
            handleSubmit={handleSubmit}
            errors={errors}
            isSubmitting={isSubmitting}
          />

          <p className="by-creat-text">
            By creating an account, you agree to HelpingHand's{" "}
            <Link to="/terms" className="text-cyan-300">Terms of Service</Link> and{" "}
            <Link to="/terms" className="text-cyan-300">Privacy Policy</Link>.
          </p>
        </div>

        {/* Right Panel - Background Image */}
        <div
          className="image-back"
          style={{
            backgroundImage: `url('https://i.imgur.com/ErEQ4GI.png')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
      </div>
    </div>
  );
};

export default SignUp;
