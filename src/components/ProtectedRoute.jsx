import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const isLoggedIn = localStorage.getItem("loggedIn") === "true";
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  if (adminOnly && !isAdmin) {
    return <Navigate to="/login-admin" />;
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
