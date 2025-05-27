import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import styles from "../style/Logo.module.css";
import logoImage from "../assets/Logo.png";
import "../style/SignUp.css";

const SignupForm = ({
  handleChange,
  formData,
  handleSubmit,
  errorMessage,
  isSubmitting,
  showPassword,
  showConfirmPassword,
  togglePasswordVisibility,
  toggleConfirmPasswordVisibility,
}) => (
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
      <div style={{ position: "relative" }}>
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        {formData.password.length > 0 && (
          <FontAwesomeIcon
            icon={showPassword ? faEye : faEyeSlash}
            onClick={togglePasswordVisibility}
            style={{
              position: "absolute",
              right: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              cursor: "pointer",
              fontSize: "12px",
            }}
          />
        )}
      </div>
    </div>

    

    <div className="signup-form-group">
      <label htmlFor="confirmPassword">Confirm Password</label>
      <div style={{ position: "relative" }}>
        <input
          type={showConfirmPassword ? "text" : "password"}
          name="confirmPassword"
          id="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        {formData.confirmPassword.length > 0 && (
          <FontAwesomeIcon
            icon={showConfirmPassword ? faEye : faEyeSlash}
            onClick={toggleConfirmPasswordVisibility}
            style={{
              position: "absolute",
              right: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              cursor: "pointer",
              fontSize: "12px",
            }}
          />
        )}
      </div>
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
      <Link to="/login" className="signup-login-link">
        Login
      </Link>
    </p>
  </form>
);

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });


localStorage.setItem('profileName', formData.username); // match profileModal
localStorage.setItem('profileEmail', formData.email);


  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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

   localStorage.setItem("sellerUsername", formData.username);
  const handleSubmit = (event) => {
    event.preventDefault();

    const { firstName, lastName, email, username, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }

    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters.");
      return;
    }

    setErrorMessage("");
    setIsSubmitting(true);

    // Simulate success
    setTimeout(() => {
      localStorage.setItem("isRegistered", "true");
      localStorage.setItem("loggedIn", "true");
      localStorage.setItem("username", username);  // <-- Save username here
      navigate("/terms");
    }, 1000);
  };

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword((prev) => !prev);

  return (
    <div className="c-container">
      <div className="flex h-screen">
        <div className="signup-left-panel">
          <div className="logo-signup">
            <img src={logoImage} alt="HelpingHand Logo" className={styles.logoLarge} />
          </div>

          <p className="create-text">Create a free account and join our growing community!</p>

          <SignupForm
            handleChange={handleChange}
            formData={formData}
            handleSubmit={handleSubmit}
            errorMessage={errorMessage}
            isSubmitting={isSubmitting}
            showPassword={showPassword}
            showConfirmPassword={showConfirmPassword}
            togglePasswordVisibility={togglePasswordVisibility}
            toggleConfirmPasswordVisibility={toggleConfirmPasswordVisibility}
          />

          <p className="by-creat-text">
            By creating an account, you agree to HelpingHand's{" "}
            <Link to="/terms" className="text-cyan-300">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link to="/terms" className="text-cyan-300">
              Privacy Policy
            </Link>
            .
          </p>
        </div>

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
