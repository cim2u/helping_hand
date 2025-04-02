import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import About from "./pages/About.jsx";
import Home from "./pages/Home.jsx";
   // ✅ Import Logo
import SignUp from "./pages/SignUp.jsx";  // ✅ Import SignUp component
import "./App.css";

function App() {
  return (
    <div className="app-container">
      
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<SignUp />} /> {/* Add SignUp Route */}
        <Route path="/" element={<Navigate to="/about" />} /> {/* Redirect to About */}
      </Routes>
    </div>
  );
}

export default App;


