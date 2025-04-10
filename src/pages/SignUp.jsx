import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // ✅ Added useNavigate
import styles from "../style/Logo.module.css";
import logoImage from "../assets/Logo.png";
import "../style/SignUp.css";

// SignupForm component
const SignupForm = ({ handleChange, formData, handleSubmit }) => (
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

    // ✅ You could add validation here
    console.log("Form submitted", formData);

    // ✅ Redirect after successful submission
    navigate("/continue-as");
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

        <SignupForm handleChange={handleChange} formData={formData} handleSubmit={handleSubmit} />

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
          backgroundImage: "url('https://s3-alpha-sig.figma.com/img/cddc/c69c/3f6f0a76202e9185950e2cc3030ddcf5?Expires=1744588800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=kjxOMWUN80t2rVIumnkecxzwLsr-ege4Pdssqp2ylLLyryEBQ6FCkK-EYu8hPgpX~zsB3St5pn3QbHvtdyMTovGHTaDyHkfqhTAwR0fDnnZt6bF4do6Sdk4RbbEymd9jYvn9cHJZr2z8NCj4UDlvPY4frYGJSeqjsqLVf-HWu20YWfYI80epiKANjvYPt9kJ0tRF1USum4wMSjBXxGgrZaJjpRaUpY9djLUFx7pP~FRIMONo4-Lb5cmqj9YGDSWEVq1ft3STthhualXDryXf3xgGLxAXK2q2h9RvnjckWR8xl3~BlsgiPEpIn22d2tRlHnBbuzs~Wmz7pcBj9U7I~g__')",
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