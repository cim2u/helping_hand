import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";


// Pages
import About from "./pages/About.jsx";
import Home from "./pages/Home.jsx";
import SignUp from "./pages/SignUp.jsx";
import LogIn from "./pages/LogIn.jsx";
import ContinueAs from "./pages/ContinueAs.jsx";
import TermsAndPolicy from "./pages/TermsAndPolicy.jsx";
import StudentDashboard from "./pages/StudentDashboard.jsx";
import BuyerDashboard from "./pages/BuyerDashboard.jsx";
import Subscribe from "./pages/Subscribe.jsx"; // ✅ Import Subscribe page
import MyShop from "./pages/MyShop.jsx";
import SellerInfo from "./pages/SellerInfo.jsx";
import ProductDetail from "./components/ProductGrid.jsx"; // ✅ Import Product Detail page
import Settings from "./pages/Settings.jsx";
import Cart from "./components/CartModal.jsx";
import Support from './pages/Support.jsx';
import AccountInfo from './pages/AccountInfo.jsx';
import MyPurchases from './pages/MyPurchases.jsx';
import CustomizeThemes from './pages/CustomizeThemes.jsx';
import Shop from './pages/Shop.jsx';
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
        <Route path="/" element={<Navigate to="/home" />} />

        {/* Home Page with Nested Routes */}
        <Route path="/home" element={<Home />}>
          {/* Add more nested routes here if needed */}
        </Route>

        {/* Other Pages */}
        <Route path="/about" element={<About />} />
        <Route path="/support" element={<Support />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/continue-as" element={<ContinueAs />} />
        <Route path="/terms" element={<TermsAndPolicy />} />
        <Route path="/myshop" element={<MyShop />} />
        <Route path="/sellerinfo" element={<SellerInfo />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/subscribe" element={<Subscribe />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/account-info" element={<AccountInfo />} />
        <Route path="/my-purchases" element={<MyPurchases />} />
        <Route path="/customize-themes"element={<CustomizeThemes/>}/>
        <Route path="/shop"element={<Shop/>}/>


        {/* Product Details Route */}
        <Route path="/product/:id" element={<ProductDetail />} />

        {/* Protected Routes for Dashboards */}
        <Route
          path="/student-dashboard"
          element={isLoggedIn ? <StudentDashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/buyer-dashboard"
          element={isLoggedIn ? <BuyerDashboard /> : <Navigate to="/login" />}
        />
      </Routes>
    </div>
  );
}

export default App;
