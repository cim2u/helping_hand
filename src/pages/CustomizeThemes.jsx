import React, { useState, useEffect } from 'react';
import '../style/CustomizeThemes.css';
import { useNavigate, Link } from 'react-router-dom';

const CustomizeThemes = () => {
  const navigate = useNavigate();
  const [selectedTheme, setSelectedTheme] = useState(localStorage.getItem("theme") || "default");

  const handleLogoutClick = () => {
    localStorage.removeItem("authToken");
    sessionStorage.clear();
    navigate("/login");
  };

  const handleBackHome = () => {
    navigate("/");
  };

  const handleThemeChange = (event) => {
    const theme = event.target.value;

    if (theme !== "default") {
      const isSubscribed = localStorage.getItem("isSubscribed") === "true";
      if (!isSubscribed) {
        navigate("/subscribe");
        return;
      }
    }

    setSelectedTheme(theme);
    localStorage.setItem("theme", theme);
  };

  return (
    <div className="account-info-wrapper">
      <div className="settings-container">
        <div className="settings-background-overlay" />
        <div className="sidebar-bg" />
        <h1 className="settings-header">Settings</h1>

        <div className="menu-box">
          <h2 className="menu-title">MY ACCOUNT</h2>
          <Link to="/account-info" className="menu-item">ACCOUNT INFO</Link>
          <Link to="/my-purchases" className="menu-item">MY PURCHASES</Link>

          <div className="menu-title">PREMIUM</div>
          <Link to="/customize-themes" className="menu-item">CUSTOMIZE THEMES</Link>

          <h2 className="menu-title">SUPPORT</h2>
          <Link to="/support" className="menu-item">HELP CENTER</Link>
          <Link to="/about" className="menu-item">ABOUT</Link>

          <div className="menu-title">USER</div>
          <div className="menu-item" onClick={handleLogoutClick}>LOG OUT</div>

          <button className="home-button" onClick={handleBackHome}>
            <span className="subscribe-label">Back to Home</span>
          </button>

          {/* Theme Customization Section */}
          <div className="theme-background-accountinfo">
            <div className="theme-container">
              <div className="theme-background" />
              <div className="theme">

                {/* Morning Theme */}
                <div className="theme-group-8">
                  <div className="theme-rectangle-77 morning-bg" />
                  <div className="theme-morning">
                    <input
                      type="radio"
                      id="morning"
                      name="theme"
                      value="morning"
                      checked={selectedTheme === "morning"}
                      onChange={handleThemeChange}
                      style={{ zIndex: 2, position: "relative", cursor: "pointer" }}
                    />
                    <label
                      htmlFor="morning"
                      style={{ marginLeft: "8px", zIndex: 2, position: "relative", cursor: "pointer" }}
                    >
                      Morning
                    </label>
                  </div>
                </div>

                {/* Lilac Theme */}
                <div className="theme-group-9">
                  <div className="theme-rectangle-81 lilac-bg" />
                  <div className="theme-lilac">
                    <input
                      type="radio"
                      id="lilac"
                      name="theme"
                      value="lilac"
                      checked={selectedTheme === "lilac"}
                      onChange={handleThemeChange}
                      style={{ zIndex: 2, position: "relative", cursor: "pointer" }}
                    />
                    <label
                      htmlFor="lilac"
                      style={{ marginLeft: "8px", zIndex: 2, position: "relative", cursor: "pointer" }}
                    >
                      Lilac
                    </label>
                  </div>
                </div>

                {/* Default (White) Theme */}
                <div className="theme-group-12">
                  <div className="theme-rectangle-82 default-bg" />
                  <div className="theme-default">
                    <input
                      type="radio"
                      id="default"
                      name="theme"
                      value="default"
                      checked={selectedTheme === "default"}
                      onChange={handleThemeChange}
                      style={{ zIndex: 2, position: "relative", cursor: "pointer" }}
                    />
                   <label htmlFor="default" className="theme-label-default">
  Default
</label>
                  </div>
                </div>

                {/* Reserved Theme Slot */}
                <div className="theme-group-10"></div>

                <div className="theme-more-themes">More themes coming soon!</div>
                <div className="theme-rectangle-80" />

              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CustomizeThemes;
