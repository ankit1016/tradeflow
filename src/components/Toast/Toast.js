import React, { useEffect } from "react";
import "./Toast.css";

const Toast = ({ message, type = "success", isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000); // Auto close after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className={`toast ${type} ${isVisible ? "show" : ""}`}>
      <div className="toast-content">
        <div className="toast-icon">{type === "success" ? "✓" : "✕"}</div>
        <div className="toast-message">{message}</div>
        <button className="toast-close" onClick={onClose}>
          ×
        </button>
      </div>
    </div>
  );
};

export default Toast;
