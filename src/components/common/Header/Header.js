import React from "react";
import "./Header.css";

const Header = ({
  appName = "TradeFlow",
  userName,
  brokerName,
  brokerLogo,
  onLogout,
  onBack,
  showBackButton = false,
}) => {
  return (
    <header className="app-header">
      <div className="header-content">
        <div className="header-left">
          {showBackButton && onBack && (
            <button className="back-btn" onClick={onBack} title="Back">
              <span className="back-icon">←</span>
            </button>
          )}
          <div className="app-logo">
            <span className="logo-icon">📈</span>
            <span className="logo-text">{appName}</span>
          </div>
        </div>

        <div className="header-right">
          {userName && (
            <div className="user-info">
              <span className="user-icon">👤</span>
              <span className="user-name">{userName}</span>
            </div>
          )}

          {brokerName && (
            <div className="header-broker-info">
              {brokerLogo &&
                // <img
                //   src={brokerLogo}
                //   alt={brokerName}
                //   className="broker-logo"
                // />
                brokerLogo}
              <span className="broker-name">{brokerName}</span>
            </div>
          )}

          {onLogout && (
            <button className="logout-btn" onClick={onLogout} title="Logout">
              <span className="logout-icon">↪️</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
