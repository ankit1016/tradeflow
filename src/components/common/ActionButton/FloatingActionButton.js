import React, { useState, useRef, useEffect } from 'react';
import './FloatingActionButton.css';

const FloatingActionButton = ({ onBuy, onSell, currentStocks }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 20, y: window.innerHeight - 120 });
  const fabRef = useRef(null);
  const dragStart = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleResize = () => {
      setPosition(prev => ({
        ...prev,
        y: window.innerHeight - 120
      }));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMouseDown = (e) => {
    if (e.target.closest('.fab-option')) return;
    
    setIsDragging(true);
    dragStart.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y
    };
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const newX = e.clientX - dragStart.current.x;
    const newY = e.clientY - dragStart.current.y;

    // Keep FAB within screen bounds
    const maxX = window.innerWidth - 60;
    const maxY = window.innerHeight - 60;

    setPosition({
      x: Math.max(0, Math.min(newX, maxX)),
      y: Math.max(0, Math.min(newY, maxY))
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging]);

  const handleBuyClick = () => {
    const topStock = currentStocks && currentStocks.length > 0 ? currentStocks[0] : null;
    if (topStock && topStock.symbol && topStock.name) {
      onBuy(topStock);
    } else {
      // Fallback to first stock alphabetically
      const fallbackStock = { symbol: 'AAPL', name: 'Apple Inc.' };
      onBuy(fallbackStock);
    }
    setIsExpanded(false);
  };

  const handleSellClick = () => {
    const topStock = currentStocks && currentStocks.length > 0 ? currentStocks[0] : null;
    if (topStock && topStock.symbol && topStock.name) {
      onSell(topStock);
    } else {
      // Fallback to first stock alphabetically
      const fallbackStock = { symbol: 'AAPL', name: 'Apple Inc.' };
      onSell(fallbackStock);
    }
    setIsExpanded(false);
  };

  return (
    <div
      ref={fabRef}
      className={`fab-container ${isExpanded ? 'expanded' : ''}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`
      }}
    >
      {isExpanded && (
        <>
          <button
            className="fab-option buy"
            onClick={handleBuyClick}
            title="Buy"
          >
            <span className="fab-icon">📈</span>
            <span className="fab-label">Buy</span>
          </button>
          <button
            className="fab-option sell"
            onClick={handleSellClick}
            title="Sell"
          >
            <span className="fab-icon">📉</span>
            <span className="fab-label">Sell</span>
          </button>
        </>
      )}
      
      <button
        className={`fab-main ${isDragging ? 'dragging' : ''}`}
        onClick={() => setIsExpanded(!isExpanded)}
        onMouseDown={handleMouseDown}
        title="Trading Actions"
      >
        <span className="fab-icon">💰</span>
      </button>
    </div>
  );
};

export default FloatingActionButton; 