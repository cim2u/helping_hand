import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../style/Signup.css";
import API from "../api";

const SignUp = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [error, setError] = useState(""); // Error state
  const [loading, setLoading] = useState(false); // Loading state
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (user.password !== user.password_confirmation) {
      setError("Passwords do not match!"); // Show error if passwords don't match
      return;
    }

    setError(""); // Clear any previous error
    setLoading(true); // Set loading to true while submitting

    try {
      // Make API call to the backend to register the user
      await API.post("/", user);
      alert("Signup successful! Please verify your email.");
      navigate("/shop"); // Redirect to shop after successful signup
    } catch (error) {
      // Handle error from API
      setError(error.response?.data?.message || "Signup failed! Please try again.");
    } finally {
      setLoading(false); // End the loading state
    }
  };

  return (
    <div className="signup-container container-hh">
      <div className="signup-box">
        <h2 className="tagline-su">CDO’s Marketplace for Student Talent and Creativity!</h2>
        <h3 className="su-title">Create a free account and join our growing community!</h3>
        {error && <p className="error-message">{error}</p>} {/* Display error message */}
        <form onSubmit={handleSubmit}>
          {/* Full Name Fields */}
          <div className="full-name-container">
            <div className="first-name">
              <input
                type="text"
                name="first_name"
                placeholder="First Name"
                value={user.first_name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="last-name">
              <input
                type="text"
                name="last_name"
                placeholder="Last Name"
                value={user.last_name}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={user.email}
            onChange={handleChange}
            required
          />

          {/* Password Field */}
          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={user.password}
              onChange={handleChange}
              required
            />
            <span onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* Confirm Password Field */}
          <div className="password-container">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="password_confirmation"
              placeholder="Confirm Password"
              value={user.password_confirmation}
              onChange={handleChange}
              required
            />
            <span onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
        <p className="terms-su-1">
          By creating an account, you agree to HelpingHand’s Terms of Services and Privacy Policy.
        </p>
        <p className="terms-su-2">
          Already have an account? <Link to="/login">Log In</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
