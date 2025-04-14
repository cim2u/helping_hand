import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../style/Logo.module.css";
import logoImage from "../assets/Logo.png";
import "../style/SignUp.css";

// SignupForm component
const SignupForm = ({ handleChange, formData, handleSubmit, errorMessage }) => (
  <form onSubmit={handleSubmit} className="signup-form">
    <div className="name-container">
      <div className="form-group">
        <label>First Name</label>
        <input
          type="text"
          name="firstName"
          placeholder="Enter first name"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Last Name</label>
        <input
          type="text"
          name="lastName"
          placeholder="Enter last name"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
      </div>
    </div>

    <label>Email</label>
    <input
      type="email"
      name="email"
      placeholder="Enter email"
      value={formData.email}
      onChange={handleChange}
      required
    />

    <label>Username</label>
    <input
      type="text"
      name="username"
      placeholder="Choose a username"
      value={formData.username}
      onChange={handleChange}
      required
    />

    <label>Password</label>
    <input
      type="password"
      name="password"
      placeholder="Enter password"
      value={formData.password}
      onChange={handleChange}
      required
    />

    <label>Confirm Password</label>
    <input
      type="password"
      name="confirmPassword"
      placeholder="Re-enter password"
      value={formData.confirmPassword}
      onChange={handleChange}
      required
    />

    {errorMessage && <p className="error-message">{errorMessage}</p>}

    <button type="submit">Submit</button>

    <p className="login-text">
      Already have an account? <Link to="/login" className="text-cyan-300">Login</Link>
    </p>
  </form>
);

// SignUp component
const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState("");  // For error messages
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

    // Password validation
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }

    // Further validation can be added here (e.g., email format, etc.)

    console.log("Form submitted", formData);
    setErrorMessage("");  // Reset error message on successful submit

    // Redirect to terms page after successful submission
    navigate("/terms");
  };

  return (
    <div className="flex h-screen">
      {/* Left Panel - Signup Form */}
      <div className="relative w-full sm:w-1/3 bg-black bg-opacity-50 flex flex-col justify-center p-8 rounded-r-2xl">
        {/* Logo and Title */}
        <div className="flex justify-center mb-6">
          <img src={logoImage} alt="HelpingHand Logo" className={styles.logoLarge} />
        </div>

        <p className="create-text">Create a free account and join our growing community!</p>

        <SignupForm
          handleChange={handleChange}
          formData={formData}
          handleSubmit={handleSubmit}
          errorMessage={errorMessage}  // Pass error message to the form
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
          backgroundImage: "url('https://s3-alpha-sig.figma.com/img/cddc/c69c/3f6f0a76202e9185950e2cc3030ddcf5?Expires=1745798400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=OSgpki4sDiZvJQaaVriuXYw824d-73NRdbbIvtE7QOxa0DEBTnaqr25l809G82VUYfdLi-qzcguGWZw113ZWHPkmCe39wejgx0mHBOZZ5OxXtrimYSAh37as31XlmaTMnXnIYhj-pVIVdnekxH1jYUYbF3lFRFLaOwi~-Op~ZqzpErl-9P6MmxTrDbm6bGuIKtH1xlZ3WPAepIf~Yb~2CYTyJgfjVg9T0mD7BSSVsLvnALAsBk0SPuH0Q~8rjRZmu-AMXGWT0hBvmxajESjf4suTA8ZvQwZGKVe~FZul1XSUnIqjrcerKK7FCVluiENEMOxr0cxaH-XUqwAbUyZCsw__')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="h-full w-full bg-black bg-opacity-30"></div>
      </div>
    </div>
  );
};

export default SignUp;
