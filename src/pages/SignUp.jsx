import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../style/Logo.module.css";
import logoImage from "../assets/Logo.png";
import "../style/SignUp.css";

// SignupForm component
const SignupForm = ({ handleChange, formData, handleSubmit, errorMessage, isSubmitting }) => (
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
    </div>

    {errorMessage && <p className="signup-error-message">{errorMessage}</p>}

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
    </p>s
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

  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value.trimStart(),
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const cleanedData = {
      ...formData,
      email: formData.email.trim(),
      username: formData.username.trim(),
    };

    if (cleanedData.password !== cleanedData.confirmPassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }

    if (cleanedData.password.length < 6) {
      setErrorMessage("Password must be at least 6 characters.");
      return;
    }

    setErrorMessage("");
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      console.log("Form submitted:", cleanedData);
      localStorage.setItem("isRegistered", "true");
      localStorage.setItem("loggedIn", "true");
      navigate("/terms");
    }, 1000);
  };

  return (
    <div className="c-container">
      <div className="flex h-screen">
        {/* Left Panel - Signup Form */}
        <div className="signup-left-panel">
          <div className="flex justify-center mb-6">
            <img src={logoImage} alt="HelpingHand Logo" className={styles.logoLarge} />
          </div>

          <p className="create-text">
            Create a free account and join our growing community!
          </p>

          <SignupForm
            handleChange={handleChange}
            formData={formData}
            handleSubmit={handleSubmit}
            errorMessage={errorMessage}
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
            backgroundImage: `url('https://s3-alpha-sig.figma.com/img/cddc/c69c/3f6f0a76202e9185950e2cc3030ddcf5?Expires=1745798400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=OSgpki4sDiZvJQaaVriuXYw824d-73NRdbbIvtE7QOxa0DEBTnaqr25l809G82VUYfdLi-qzcguGWZw113ZWHPkmCe39wejgx0mHBOZZ5OxXtrimYSAh37as31XlmaTMnXnIYhj-pVIVdnekxH1jYUYbF3lFRFLaOwi~-Op~ZqzpErl-9P6MmxTrDbm6bGuIKtH1xlZ3WPAepIf~Yb~2CYTyJgfjVg9T0mD7BSSVsLvnALAsBk0SPuH0Q~8rjRZmu-AMXGWT0hBvmxajESjf4suTA8ZvQwZGKVe~FZul1XSUnIqjrcerKK7FCVluiENEMOxr0cxaH-XUqwAbUyZCsw__')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="h-full w-full bg-black bg-opacity-30"></div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
