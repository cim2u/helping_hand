import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Routes, Route, Link } from "react-router-dom";
import Login from "./components/Login"; 
import Signup from "./components/Signup"; 
import "./App.css";

function App() {
  return (
    <div className="box">
      {/* Image */}
      <div className="image1"></div>

      {/* Navigation Bar */}
      <nav className="topbar">
        <div className="nav-links">
          <button className="nav-btn">About</button>
          <button className="nav-btn">Shop</button>
          <button className="nav-btn">Help</button>
        </div>
      </nav>

      {/* Search Bar */}
      <div className="search-container">
        <div className="search-box">
          <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon" />
          <input type="text" placeholder="Search..." className="search-input" />
        </div>
      </div>

      {/* Hand and Helping Text */}
      <div className="hand">Hand</div>
      <div className="helping">Helping</div>

      {/* Box Help Section */}
      <div className="box-help"></div>

      {/* Grid Layout */}
      <div className="grid-container">
        <div className="grid-item">Item</div>
        <div className="grid-item">Item</div>
        <div className="grid-item">Item</div>
      </div>

      {/* Sign Up/Login Section */}
      <div className="container">
        <Link to="/login">
          <button className="login-btn">LOG IN</button>
        </Link>
        <Link to="/signup">
          <button className="sign-up-btn">SIGN UP</button>
        </Link>
      </div>

      {/* Routes (For Login and Signup) */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>


      {/* Most Purchased & Most Donated Section */}
      <div className="stats-container">
        <div className="column">
          <h3>Most Purchased</h3>
          <div className="content-box"></div>
        </div>
        <div className="column">
          <h3>Most Donated</h3>
          <div className="content-box"></div>
        </div>
      </div>
    </div>
  );
}

export default App;
