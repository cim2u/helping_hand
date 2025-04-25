import React from 'react';
import "../style/Settings.css"; // ✅ goes up one level to reach /style

const Settings = () => {
  return (
    <div className="settings-container">
      <div className="settings-background"></div>

      {/* Settings Title */}
      <div className="settings-title">Settings</div>

      {/* Settings Sidebar */}
      <div className="settings-sidebar">
        <div className="my-account">
          <div className="settings-rectangle1"></div>
          <div className="settings-myaccount">My Account</div>

          {/* Account Info */}
          <div className="settings-rectangle">
            <div className="settings-label">Account Info</div>
          </div>

          {/* My Purchases */}
          <div className="settings-rectangle">
            <div className="settings-label">My Purchases</div>
          </div>

          {/* Premium */}
          <div className="settings-rectangle2">
            <div className="settings-premium">Premium</div>
          </div>

          {/* Customize Themes */}
          <div className="settings-rectangle">
            <div className="settings-label">Customize Themes</div>
          </div>

          {/* Badges */}
          <div className="settings-rectangle">
            <div className="settings-label">Badges</div>
          </div>
        </div>

        {/* Support Section */}
        <div className="support">
          <div className="settings-rectangle3">
            <div className="settings-support">Support</div>
          </div>

          {/* Help Center */}
          <div className="settings-rectangle">
            <div className="settings-label">Help Center</div>
          </div>

          {/* About */}
          <div className="settings-rectangle">
            <div className="settings-label">About</div>
          </div>
        </div>

        {/* User Section */}
        <div className="user">
          <div className="settings-rectangle4">
            <div className="settings-user">User</div>
          </div>

          {/* Log Out */}
          <div className="settings-rectangle">
            <div className="settings-label">Log Out</div>
          </div>
        </div>
      </div>

      {/* Home Button */}
      <button className="settings-home-button">Back to Home</button>
    </div>
  );
};

export default Settings;
