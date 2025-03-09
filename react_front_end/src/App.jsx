import { useState, useEffect } from "react";
import { Route, Routes, Link, useNavigate, Navigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes, faHome, faMagnifyingGlass, faUser } from "@fortawesome/free-solid-svg-icons";
import Logo from "./components/Logo.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Shop from "./pages/Shop.jsx";
import About from "./pages/About.jsx";
import Help from "./pages/Help.jsx";
import Subscribe from "./pages/Subscribe.jsx";
import Profile from "./pages/Profile.jsx"; 
import "./App.css";

export default function App() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [profileClicked, setProfileClicked] = useState(false);

  // Prevent scrolling when component is mounted
  useEffect(() => {
    document.body.style.overflow = "hidden"; // Disables scrolling on body
    return () => {
      document.body.style.overflow = "auto"; // Reverts it back when component unmounts
    };
  }, []);

  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/home?query=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <div className="app-container">
      <Link to="/">
        <Logo />
      </Link>

      <header className="header">
        <p className="hh-tagline">CDO’s Marketplace for Student Talent and Creativity!</p>

        {/* Search Bar */}
        <form className="search-form" onSubmit={handleSearchSubmit}>
          <input
            type="text"
            className="search-bar"
            placeholder="Search Products..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button type="submit" className="search-icon-button">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon" />
          </button>
        </form>

        {/* Navbar */}
        <nav className="navbar">
          <Link to="/" className="home-icon-link">
            <FontAwesomeIcon icon={faHome} className="home-icon" />
          </Link>

          {/* Profile Icon Button (Changes color on click) */}
          <Link 
            to="/profile"
            className="profile-icon-button"
            style={{ backgroundColor: profileClicked ? "orange" : "#1d4d8177" }}
            onClick={() => setProfileClicked(true)}
          >
            <FontAwesomeIcon icon={faUser} className="profile-icon" />
          </Link>
        </nav>

        {/* Burger Menu */}
        <div className="burger-menu" onClick={() => setMenuOpen(!menuOpen)}>
          <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} className="burger-icon" />
        </div>

        {/* Dropdown Menu */}
        {menuOpen && (
          <div className="dropdown-menu">
            <Link to="/shop" className="dropdown-link" onClick={() => setMenuOpen(false)}>Shop</Link>
            <Link to="/about" className="dropdown-link" onClick={() => setMenuOpen(false)}>About</Link>
            <Link to="/help" className="dropdown-link" onClick={() => setMenuOpen(false)}>Help</Link>
            <Link to="/login" className="dropdown-link" onClick={() => setMenuOpen(false)}>Login</Link>
            <Link to="/signup" className="dropdown-link" onClick={() => setMenuOpen(false)}>Signup</Link>
          </div>
        )}
      </header>

      <main className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/shop" element={<Navigate to="/" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About />} />
          <Route path="/help" element={<Help />} />
          <Route path="/subscribe" element={<Subscribe />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
