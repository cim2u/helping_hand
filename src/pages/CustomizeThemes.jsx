import React from 'react';
import '../style/CustomizeThemes.css';
import { useNavigate } from "react-router-dom";

const CustomizeThemes = () => {

  const navigate = useNavigate();

  const handleBackHome = () => {
    navigate("/"); // this navigates to the homepage

  };
  return (
    <div className="settings-wrapper">
      <div className="background-overlay" />
      <div className="settings-background" />
      <div className="settings-panel">
        <h1 className="settings-title">Settings</h1>
        <div className="section-title">MY ACCOUNT</div>
      <div className="menu-item" onClick={() => navigate("/account-info")}>ACCOUNT INFO</div>
      <div className="menu-item" onClick={() => navigate("/my-purchases")}>MY PURCHASES</div>

      <div className="section-title">PREMIUM</div>
      <div className="menu-item" onClick={() => navigate("/customize-themes")}>CUSTOMIZE THEMES</div>
      <div className="menu-item" onClick={() => navigate("/badges")}>BADGES</div>

      <div className="section-title">SUPPORT</div>
      <div className="menu-item" onClick={() => navigate("/help-center")}>HELP CENTER</div>
      <div className="menu-item" onClick={() => navigate("/about")}>ABOUT</div>

      <div className="section-title">USER</div>
      <div className="menu-item" onClick={() => navigate("/logout")}>LOG OUT</div>

      <div className="theme-component">
      {/* Background */}
      <div className="background-theme" />

      {/* Themes */}
      <div className="themes-theme">
        <span className="theme-title-theme">Themes</span>
      </div>

      {/* Group 8 */}
      <div className="group-8-theme">
        <div className="rectangle-77-theme" />
      </div>

      {/* Morning */}
      <div className="morning-theme">
        <span className="morning-text-theme">Morning</span>
      </div>

      {/* Radio buttons */}
      <div className="radio-buttons-theme">
        <div className="container-theme">
          <div className="state-layer-theme">
            <div className="icon-theme" />
          </div>
        </div>
      </div>

      {/* Group 9 */}
      <div className="group-9-theme">
        <div className="rectangle-77-theme" />
      </div>

      {/* Lilac */}
      <div className="lilac-theme">
        <span className="lilac-text-theme">Lilac</span>
      </div>

      {/* Group 10 */}
      <div className="group-10-theme">
        <div className="rectangle-77-theme" />
      </div>

      {/* Group 11 */}
      <div className="group-11-theme">
        <div className="rectangle-77-theme" />
      </div>

      {/* More themes */}
      <div className="more-themes-theme">
        <span className="more-themes-text-theme">More themes coming soon!</span>
      </div>
    </div>
    
      </div>
      <button className="backhome-button" onClick={handleBackHome}>      Back Home
    </button>

        <div className="state-layer">
          <span>BACK HOME</span>
        </div>

    </div>
  );
};

export default CustomizeThemes;
