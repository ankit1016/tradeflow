import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <div className="footer-section">
      <div className="footer-content">
        <div className="footer-grid">
          <div className="footer-column">
            <h3>TradeFlow</h3>
            <p>Professional trading platform designed for serious traders. Experience seamless trading with real-time data and advanced tools.</p>
          </div>
          <div className="footer-column">
            <h3>Platform</h3>
            <ul className="footer-links">
              <li><a href="#features">Features</a></li>
              <li><a href="#pricing">Pricing</a></li>
              <li><a href="#security">Security</a></li>
              <li><a href="#api">API</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Support</h3>
            <ul className="footer-links">
              <li><a href="#help">Help Center</a></li>
              <li><a href="#contact">Contact Us</a></li>
              <li><a href="#status">System Status</a></li>
              <li><a href="#community">Community</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Company</h3>
            <ul className="footer-links">
              <li><a href="#about">About Us</a></li>
              <li><a href="#careers">Careers</a></li>
              <li><a href="#press">Press</a></li>
              <li><a href="#legal">Legal</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 TradeFlow. All rights reserved.</p>
          <div className="footer-social">
            <a href="#" className="social-link">📧</a>
            <a href="#" className="social-link">🐦</a>
            <a href="#" className="social-link">💼</a>
            <a href="#" className="social-link">📱</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer; 