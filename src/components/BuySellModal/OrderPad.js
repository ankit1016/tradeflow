import React, { useState, useEffect } from "react";
import { getStockData, placeOrder } from "../../api/mockApi";
import "./OrderPad.css";

const OrderPad = ({
  stock,
  orderType,
  onClose,
  onOrderPlaced,
  stocks = [],
}) => {
  const [selectedStock, setSelectedStock] = useState(stock);
  const [orderData, setOrderData] = useState({
    quantity: "",
    price: "",
    orderType: "MARKET",
  });
  const [stockInfo, setStockInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (selectedStock && selectedStock.symbol) {
      const info = getStockData(selectedStock.symbol);
      setStockInfo(info);
      if (info && info.currentPrice) {
        setOrderData((prev) => ({
          ...prev,
          price: info.currentPrice.toString(),
        }));
      }
    }
  }, [selectedStock]);

  useEffect(() => {
    setSelectedStock(stock);
  }, [stock]);

  useEffect(() => {
    document.body.classList.add("orderpad-open");
    return () => {
      document.body.classList.remove("orderpad-open");
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleStockChange = (e) => {
    const symbol = e.target.value;
    const found = stocks.find((s) => s.symbol === symbol);
    if (found) setSelectedStock(found);
  };

  const calculateOrderValue = () => {
    const quantity = parseFloat(orderData.quantity) || 0;
    const price = parseFloat(orderData.price) || 0;
    return quantity * price;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const orderPayload = {
        symbol: selectedStock.symbol,
        name: selectedStock.name,
        type: orderType,
        quantity: parseInt(orderData.quantity),
        price: parseFloat(orderData.price),
        orderType: orderData.orderType,
        timestamp: new Date().toISOString(),
      };

      const response = await placeOrder(orderPayload);

      if (response.status === 200) {
        onOrderPlaced(response.data);
        onClose();
        if (window.showToast) {
          window.showToast(
            `${orderType} order for ${selectedStock.symbol} placed successfully!`,
            "success"
          );
        }
      } else {
        setError("Failed to place order. Please try again.");
      }
    } catch (err) {
      setError("Error placing order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!selectedStock || !selectedStock.symbol || !stockInfo) {
    return null;
  }

  const currentPrice = stockInfo.currentPrice || 0;

  return (
    <div className="orderpad-overlay" onClick={onClose}>
      <div className="orderpad-modal" onClick={(e) => e.stopPropagation()}>
        <div className={`orderpad-header ${orderType?.toLowerCase() || "buy"}`}>
          <h2>{orderType || "BUY"} Order</h2>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="stock-select-bar">
          <label htmlFor="stock-select">Stock:</label>
          <select
            id="stock-select"
            value={selectedStock.symbol}
            onChange={handleStockChange}
            className="stock-select"
          >
            {stocks.map((s) => (
              <option key={s.symbol} value={s.symbol}>
                {s.symbol} - {s.name}
              </option>
            ))}
          </select>
        </div>
        <div className="stock-info compact-stock-info">
          <span className="stock-name-inline">{stockInfo.name}</span>
          <span className="current-price-inline">
            ${currentPrice.toFixed(2)}
          </span>
        </div>
        <form onSubmit={handleSubmit} className="order-form">
          {orderType === "SELL" && selectedStock.quantity !== undefined && (
            <div
              className="current-quantity-info"
              style={{
                color: "#60a5fa",
                fontWeight: 600,
                marginBottom: 8,
                fontSize: 13,
              }}
            >
              Current: {selectedStock.quantity}
            </div>
          )}
          <div className="form-group">
            <label htmlFor="quantity">Quantity</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={orderData.quantity}
              onChange={handleInputChange}
              placeholder="Enter quantity"
              min="1"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              id="price"
              name="price"
              value={orderData.price}
              onChange={handleInputChange}
              placeholder="Enter price"
              step="0.01"
              min="0"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="orderType">Order Type</label>
            <select
              id="orderType"
              name="orderType"
              value={orderData.orderType}
              onChange={handleInputChange}
            >
              <option value="MARKET">Market</option>
              <option value="LIMIT">Limit</option>
              <option value="STOP_LOSS">Stop Loss</option>
            </select>
          </div>
          <div className="order-summary">
            <div className="summary-row">
              <span>Order Value:</span>
              <span className="order-value">
                ${calculateOrderValue().toFixed(2)}
              </span>
            </div>
            <div className="summary-row">
              <span>Brokerage:</span>
              <span>$9.99</span>
            </div>
            <div className="summary-row total">
              <span>Total:</span>
              <span>${(calculateOrderValue() + 9.99).toFixed(2)}</span>
            </div>
          </div>
          {error && <div className="error-message">{error}</div>}
          <div style={{ marginTop: "24px" }}>
            <button
              type="submit"
              className={`submit-btn ${orderType?.toLowerCase() || "buy"}`}
              disabled={loading}
            >
              {loading
                ? "Placing Order..."
                : `${orderType || "BUY"} ${selectedStock.symbol}`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderPad;
