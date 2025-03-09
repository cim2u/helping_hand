import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";
import "../style/Home.css"; // Ensure this file exists

const Home = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query");

  // Assume `items` is the list of products you want to filter
  const [searchQuery, setSearchQuery] = useState(query || "");

  const items = [
    { id: 1, name: "Item 1" },
    { id: 2, name: "Item 2" },
    { id: 3, name: "Item 3" },
    // Add your product data here
  ];

  const filteredItems = searchQuery
    ? items.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : items;

  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Handle search submit, you can navigate to another page or update URL
    // This will allow the query to persist when you refresh
    window.history.pushState(null, "", `?query=${searchQuery}`);
  };

  return (
    <div className="box">
      {/* Image */}
      <div className="image1"></div>

      {/* Navigation Bar */}
      <nav className="topbar">
        <div className="nav-links">
          <Link to="/about">
            <button className="nav-btn">About</button>
          </Link>
          <Link to="/shop">
            <button className="nav-btn">Shop</button>
          </Link>
          <Link to="/help">
            <button className="nav-btn">Help</button>
          </Link>
        </div>
      </nav>

      {/* Search Bar */}
      <div className="search-container">
        <form className="search-box" onSubmit={handleSearchSubmit}>
          <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon" />
          <input
            type="text"
            placeholder="Search..."
            className="search-input"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </form>
      </div>

      {/* Hand and Helping Text */}
      <div className="hand">Hand</div>
      <div className="helping">Helping</div>

      {/* Box Help Section */}
      <div className="box-help"></div>

      {/* Grid Layout */}
      <div className="grid-container">
        {filteredItems.map((item) => (
          <div className="grid-item" key={item.id}>
            <h2>{item.name}</h2>
          </div>
        ))}
      </div>

      {/* Logout Button */}
      <div className="container">
        <Link to="/logout">
          <button className="logout-btn">LOG OUT</button>
        </Link>
      </div>

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
};

export default Home;
