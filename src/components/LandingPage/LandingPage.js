import React, { useState, useEffect, useRef } from 'react';
import './LandingPage.css';

const LandingPage = ({ onGetStarted }) => {
  const [animateCards, setAnimateCards] = useState(false);
  const [animateHero, setAnimateHero] = useState(false);
  const [animateCTA, setAnimateCTA] = useState(false);
  const featuresRef = useRef(null);
  const heroRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    // Hero section animation
    const heroObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setAnimateHero(true);
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (heroRef.current) {
      heroObserver.observe(heroRef.current);
    }

    // Features section animation
    const featuresObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setAnimateCards(true);
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    if (featuresRef.current) {
      featuresObserver.observe(featuresRef.current);
    }

    // CTA section animation
    const ctaObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setAnimateCTA(true);
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (ctaRef.current) {
      ctaObserver.observe(ctaRef.current);
    }

    return () => {
      if (heroRef.current) heroObserver.unobserve(heroRef.current);
      if (featuresRef.current) featuresObserver.unobserve(featuresRef.current);
      if (ctaRef.current) ctaObserver.unobserve(ctaRef.current);
    };
  }, []);

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <div className="hero-section" ref={heroRef}>
        <div className="hero-content">
          <div className={`hero-text ${animateHero ? 'animate-in' : ''}`}>
            <h1 className="hero-title">
              <span className="gradient-text">TradeFlow</span>
              <br />
              Professional Trading Platform
            </h1>
            <p className="hero-subtitle">
              Experience seamless trading with real-time data, advanced order management, 
              and professional-grade tools designed for serious traders.
            </p>
            <div className="hero-features">
              <div className="feature-item">
                <span className="feature-icon">📈</span>
                <span>Real-time Market Data</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">⚡</span>
                <span>Lightning Fast Orders</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">🔒</span>
                <span>Secure & Reliable</span>
              </div>
            </div>
            <button className="cta-button" onClick={onGetStarted}>
              Get Started
            </button>
          </div>
          <div className={`hero-visual ${animateHero ? 'animate-in' : ''}`} style={{ animationDelay: '0.3s' }}>
            <div className="trading-demo">
              <div className="demo-header">
                <div className="demo-logo">📈</div>
                <span>TradeFlow Demo</span>
              </div>
              <div className="demo-content">
                <div className="demo-chart">
                  <div className="chart-line"></div>
                  <div className="chart-dots">
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                  </div>
                </div>
                <div className="demo-stats">
                  <div className="stat">
                    <span className="stat-label">AAPL</span>
                    <span className="stat-value">$175.43</span>
                    <span className="stat-change positive">+2.34%</span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">TSLA</span>
                    <span className="stat-value">$242.12</span>
                    <span className="stat-change negative">-1.23%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="features-section" ref={featuresRef}>
        <div className={`section-header ${animateCards ? 'animate-in' : ''}`}>
          <h2>Why Choose TradeFlow?</h2>
          <p>Built for professional traders who demand excellence</p>
        </div>
        <div className="features-grid">
          <div className={`feature-card ${animateCards ? 'animate-in' : ''}`} style={{ animationDelay: '0.1s' }}>
            <div className="feature-icon">📊</div>
            <h3>Advanced Analytics</h3>
            <p>Comprehensive charts, technical indicators, and real-time market analysis to make informed decisions.</p>
          </div>
          <div className={`feature-card ${animateCards ? 'animate-in' : ''}`} style={{ animationDelay: '0.2s' }}>
            <div className="feature-icon">⚡</div>
            <h3>Lightning Fast</h3>
            <p>Execute trades in milliseconds with our high-performance infrastructure and low-latency connections.</p>
          </div>
          <div className={`feature-card ${animateCards ? 'animate-in' : ''}`} style={{ animationDelay: '0.3s' }}>
            <div className="feature-icon">🔒</div>
            <h3>Bank-Grade Security</h3>
            <p>Your funds and data are protected with enterprise-level security and encryption protocols.</p>
          </div>
          <div className={`feature-card ${animateCards ? 'animate-in' : ''}`} style={{ animationDelay: '0.4s' }}>
            <div className="feature-icon">📱</div>
            <h3>Cross-Platform</h3>
            <p>Trade seamlessly across desktop, tablet, and mobile devices with our responsive design.</p>
          </div>
          <div className={`feature-card ${animateCards ? 'animate-in' : ''}`} style={{ animationDelay: '0.5s' }}>
            <div className="feature-icon">🎯</div>
            <h3>Smart Orders</h3>
            <p>Advanced order types including stop-loss, limit orders, and conditional orders for precise execution.</p>
          </div>
          <div className={`feature-card ${animateCards ? 'animate-in' : ''}`} style={{ animationDelay: '0.6s' }}>
            <div className="feature-icon">📈</div>
            <h3>Portfolio Tracking</h3>
            <p>Monitor your positions, P&L, and performance with detailed analytics and reporting tools.</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="cta-section" ref={ctaRef}>
        <div className={`cta-content ${animateCTA ? 'animate-in' : ''}`}>
          <h2>Ready to Start Trading?</h2>
          <p>Join thousands of traders who trust TradeFlow for their trading needs.</p>
          <button className="cta-button large" onClick={onGetStarted}>
            Start Trading Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage; 