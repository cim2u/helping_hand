import React from "react";
import "./App.css";

function App() {
  return (
    <div className="box">
      
 {/* Image */}
      <div className="image1"></div>
      {/* Navbar */}
      <nav className="navbar">
        
        <div className="nav-links">
          <a href="#">Home</a>
          <a href="#">About</a>
          <a href="#">Contact</a>
        </div>
      </nav>

      {/* Search Bar */}
      <div className="search-container">
        <input type="text" placeholder="Search..." />
      </div>

      {/* Hand and Helping Text */}
      <div className="hand">Hand</div>
      <div className="helping">Helping</div>
      <div className="box-help"></div>
      {/* Grid Layout */}
      <div className="grid-container">
        <div className="grid-item">Item 1</div>
        <div className="grid-item">Item 2</div>
        <div className="grid-item">Item 3</div>
      </div>

      
    </div>
  );
}

export default App;
