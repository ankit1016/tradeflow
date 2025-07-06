import React, { useState } from "react";
import "./LoginForm.css";

const LoginForm = ({ selectedBroker, onLogin, onBack }) => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [errorType, setErrorType] = useState(""); // 'validation', 'server', 'network'
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (error) {
      setError("");
      setErrorType("");
    }
  };

  const getErrorIcon = () => {
    switch (errorType) {
      case "validation":
        return "⚠️";
      case "server":
        return "🔧";
      case "network":
        return "📡";
      default:
        return "❌";
    }
  };

  const getErrorClass = () => {
    switch (errorType) {
      case "validation":
        return "error-message validation-error";
      case "server":
        return "error-message server-error";
      case "network":
        return "error-message network-error";
      default:
        return "error-message";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setErrorType("");
    setSuccess(false);

    try {
      await onLogin(selectedBroker.id, credentials);
      setSuccess(true);
    } catch (err) {
      const errorMessage = err.message || "Login failed. Please try again.";
      setError(errorMessage);

      // Determine error type based on message content
      if (
        errorMessage.includes("Server error") ||
        errorMessage.includes("server")
      ) {
        setErrorType("server");
      } else if (
        errorMessage.includes("Network") ||
        errorMessage.includes("connection")
      ) {
        setErrorType("network");
      } else {
        setErrorType("validation");
      }
    } finally {
      setLoading(false);
    }
  };

  // Don't render if no broker is selected
  if (!selectedBroker) {
    return null;
  }

  return (
    <div className="login-container">
      <div className="login-card premium-glass">
        <div className="login-header">
          <button className="back-btn" onClick={onBack}>
            ← Back
          </button>
          <div className="broker-info">
            <div className="broker-logo">
              {selectedBroker.logo ? (
                // <img
                //   src={selectedBroker.logo}
                //   alt={selectedBroker.name}
                //   className="broker-logo-img"
                // />
                selectedBroker.logo
              ) : (
                <div className="broker-logo-placeholder">
                  {selectedBroker.name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <div className="broker-details">
              <h2>Login to {selectedBroker.name}</h2>
              <p>Enter your credentials to connect</p>
            </div>
          </div>
        </div>

        <div className="test-info">
          <span className="test-label">Test Scenarios:</span>
          <span className="test-details">
            • Success (200): demo / demo123 <br />• Validation Error (400):
            error400 / test400 <br />• Server Error (500): error500 / test500
          </span>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={credentials.username}
              onChange={handleInputChange}
              placeholder="Enter your username"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
              required
            />
          </div>

          {error && (
            <div className={getErrorClass()}>
              <span className="error-icon">{getErrorIcon()}</span>
              <span className="error-text">{error}</span>
            </div>
          )}

          {success && (
            <div className="success-message">
              <span className="success-icon">✅</span>
              <span className="success-text">
                Login successful! Redirecting...
              </span>
            </div>
          )}

          <button
            type="submit"
            className="login-btn"
            disabled={loading || success}
          >
            {loading ? (
              <>
                <span className="loading-spinner">⏳</span>
                <span>Connecting...</span>
              </>
            ) : success ? (
              <>
                <span className="success-icon">✅</span>
                <span>Connected!</span>
              </>
            ) : (
              <span>Connect Account</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
