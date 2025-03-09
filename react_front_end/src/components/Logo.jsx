import React from "react";
import { Link } from "react-router-dom";
import "../style/Logo.css";  // Add styles to a separate CSS file or inside the component as needed

export default function Logo() {
  return (
    <div className="logo">
      <Link to="/shop" className="hh-logo">
        <span className="hh-helping">Helping</span>
        <span className="hh-hand">Hand</span>
      </Link>
    </div>
  );
}
