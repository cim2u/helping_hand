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
import Subscribe from "./pages/Subscribe.jsx";
import MyShop from "./pages/MyShop.jsx";
import SellerInfo from "./pages/SellerInfo.jsx";
import ProductDetail from "./components/ProductGrid.jsx";
import Settings from "./pages/Settings.jsx";
import Cart from "./components/CartModal.jsx";
import Support from "./pages/Support.jsx";
import AccountInfo from "./pages/AccountInfo.jsx";
import MyPurchases from "./pages/MyPurchases.jsx";
import CustomizeThemes from "./pages/CustomizeThemes.jsx";
import OrderPage from "./pages/OrderPage.jsx";
import Shop from "./pages/Shop.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import LoginAsAdmin from "./pages/LoginAsAdmin.jsx";
import AdminUserManagement from './pages/AdminUserManagement';
import AdminHelpCenter from './pages/AdminHelpCenter';
import TransactionHistory from './pages/TransactionHistory.jsx';
import DonationHistory from './pages/DonationHistory.jsx';

import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const userLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const userSubscribed = localStorage.getItem("isSubscribed") === "true";
    const userIsAdmin = localStorage.getItem("isAdmin") === "true";

    setIsLoggedIn(userLoggedIn);
    setIsSubscribed(userSubscribed);
    setIsAdmin(userIsAdmin);
  }, []);

  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<Navigate to="/about" />} />

        {/* Public Pages */}
        <Route path="/about" element={<About isLoggedIn={isLoggedIn} />} />
        <Route path="/support" element={<Support />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn setIsLoggedIn={setIsLoggedIn} setIsSubscribed={setIsSubscribed} />} />
        <Route path="/login-admin" element={<LoginAsAdmin setIsAdmin={setIsAdmin} />} />
        <Route path="/continue-as" element={<ContinueAs />} />
        <Route path="/terms" element={<TermsAndPolicy />} />

        {/* Home Page */}
        <Route path="/home" element={
          <Home
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            setIsSubscribed={setIsSubscribed}
            setIsAdmin={setIsAdmin}
          />
        } />

        {/* Store Pages */}
        <Route path="/store" element={<MyShop />} />
        <Route path="/store/:storeName" element={<MyShop />} />
        <Route path="/sellerinfo" element={<SellerInfo />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetail />} />

        {/* User Pages */}
        <Route path="/settings" element={
          <Settings
            setIsLoggedIn={setIsLoggedIn}
            setIsSubscribed={setIsSubscribed}
            setIsAdmin={setIsAdmin}
          />
        } />
        <Route path="/subscribe" element={<Subscribe />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/account-info" element={<AccountInfo />} />
        <Route path="/my-purchases" element={<MyPurchases />} />
        <Route path="/customize-themes" element={<CustomizeThemes />} />
        <Route path="/orders" element={<OrderPage />} />

        {/* Admin Routes */}
        <Route path="/admin-dashboard" element={isAdmin ? <Navigate to="/admin/dashboard" /> : <Navigate to="/login-admin" />} />
        <Route path="/admin/dashboard" element={isAdmin ? <AdminDashboard /> : <Navigate to="/login-admin" />} />
        <Route path="/admin/user-management" element={isAdmin ? <AdminUserManagement /> : <Navigate to="/login-admin" />} />
        <Route path="/admin/help-center" element={isAdmin ? <AdminHelpCenter /> : <Navigate to="/login-admin" />} />
        <Route path="/admin/transaction-history" element={isAdmin ? <TransactionHistory /> : <Navigate to="/login-admin" />} />
        <Route path="/admin/donation-history" element={isAdmin ? <DonationHistory /> : <Navigate to="/login-admin" />} />

        {/* Protected Routes */}
        <Route
          path="/student-dashboard"
          element={isLoggedIn && isSubscribed ? <StudentDashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/buyer-dashboard"
          element={isLoggedIn && isSubscribed ? <BuyerDashboard /> : <Navigate to="/login" />}
        />
      </Routes>
    </div>
  );
}

export default App;
