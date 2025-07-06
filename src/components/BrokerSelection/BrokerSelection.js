import React from 'react';
import './BrokerSelection.css';

const BrokerSelection = ({ brokers, onSelectBroker }) => {
  const handleBrokerClick = (broker) => {
    console.log('Broker card clicked:', broker.name); // Debug log
    onSelectBroker(broker);
  };

  const isEmoji = (str) => {
    return /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/u.test(str);
  };

  return (
    <div className="broker-selection">
      <div className="container">
        <div className="broker-header">
          <h1>Connect Your Broker</h1>
          <p>Select your preferred trading platform to get started</p>
        </div>
        
        <div className="brokers-grid">
          {brokers.map((broker) => (
            <div
              key={broker.id}
              className="broker-card"
              onClick={() => handleBrokerClick(broker)}
            >
              <div className="broker-logo">
                {broker.logo ? (
                  isEmoji(broker.logo) ? (
                    <div className="broker-logo-emoji">
                      {broker.logo}
                    </div>
                  ) : (
                    <img 
                      src={broker.logo} 
                      alt={broker.name}
                      className="broker-logo-img"
                    />
                  )
                ) : (
                  <div className="broker-logo-placeholder">
                    {broker.name.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <div className="broker-info">
                <h3>{broker.name}</h3>
                <p>{broker.description}</p>
                <div className="broker-features">
                  {broker.features && broker.features.map((feature, index) => (
                    <span key={index} className="feature-tag">{feature}</span>
                  ))}
                </div>
              </div>
              <div className="broker-arrow">→</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrokerSelection; 