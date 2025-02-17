import React from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css"; // Import CSS for styling

function Login() {
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    // Add login logic here (e.g., authentication API call)
    navigate("/dashboard"); // Navigate to dashboard after login
  };

  return (
    <div className="login-container"> {/* Background Blur Container */}
      <div className="login-box"> {/* Login Form Box */}
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input type="text" placeholder="Username" required />
          <input type="password" placeholder="Password" required />
          <button type="submit">Login</button>
        </form>
        <p>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
