import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import About from "./pages/About.jsx";
import Home from "./pages/Home.jsx";
import SignUp from "./pages/SignUp.jsx";
import LogIn from "./pages/LogIn.jsx";
import ContinueAs from "./pages/ContinueAs.jsx";
import TermsAndPolicy from "./pages/TermsAndPolicy.jsx";
import StudentDashboard from "./pages/StudentDashboard.jsx";
import BuyerDashboard from "./pages/BuyerDashboard.jsx";
import Subscribe from "./pages/Subscribe.jsx";
import MyShop from "./pages/MyShop.jsx"; // ✅ Import MyShop
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    const userLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const userSubscribed = localStorage.getItem("isSubscribed") === "true";
    setIsLoggedIn(userLoggedIn);
    setIsSubscribed(userSubscribed);
  }, []);

  return (
    <div className="app-container">
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/continue-as" element={<ContinueAs />} />
        <Route path="/terms" element={<TermsAndPolicy />} />
        <Route path="/myshop" element={<MyShop />} /> {/* ✅ Add this */}

        <Route
          path="/student-dashboard"
          element={isLoggedIn ? <StudentDashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/buyer-dashboard"
          element={isLoggedIn ? <BuyerDashboard /> : <Navigate to="/login" />}
        />

        <Route
          path="/subscribe"
          element={
            isLoggedIn && !isSubscribed ? (
              <Subscribe
                onSubscribe={() => {
                  setIsSubscribed(true);
                  localStorage.setItem("isSubscribed", "true");
                }}
              />
            ) : (
              <Navigate to="/home" />
            )
          }
        />

        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/home" />} />
      </Routes>
    </div>
  );
}

export default App;
