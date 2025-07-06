import React from 'react';

const BottomNavigation = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'holdings', label: 'Holdings', icon: '📊' },
    { id: 'orderbook', label: 'Orderbook', icon: '📋' },
    { id: 'positions', label: 'Positions', icon: '📈' }
  ];

  return (
    <div className="bottom-navigation">
      <div className="bottom-nav-tabs">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`bottom-nav-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => onTabChange(tab.id)}
          >
            <span className="bottom-nav-icon">{tab.icon}</span>
            <span className="bottom-nav-label">{tab.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BottomNavigation; 