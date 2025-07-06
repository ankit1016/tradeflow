import React, { useState, useEffect } from "react";
import "./Orderbook.css";
import { getOrderbook } from "../../api/mockApi";
import CommonTable from "../../components/common/Table/CommonTable";

const PAGE_SIZE_OPTIONS = [10, 20, 50];

const Orderbook = ({ onStockSelect, onStocksUpdate }) => {
  const [orderbook, setOrderbook] = useState({ orders: [], pnl: {} });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchOrderbook();
  }, []);

  useEffect(() => {
    if (onStocksUpdate && orderbook.orders && orderbook.orders.length > 0) {
      onStocksUpdate(orderbook.orders);
    }
  }, [orderbook.orders, onStocksUpdate]);

  const fetchOrderbook = async () => {
    try {
      setLoading(true);
      const response = await getOrderbook();
      if (response.status === 200) {
        setOrderbook(response.data);
      } else {
        setError("Failed to fetch orderbook");
      }
    } catch (err) {
      setError("Error loading orderbook data");
    } finally {
      setLoading(false);
    }
  };

  // Table config for CommonTable
  const typeOptions = [
    "All",
    ...Array.from(new Set(orderbook.orders.map((o) => o.type).filter(Boolean))),
  ];
  const statusOptions = [
    "All",
    ...Array.from(
      new Set(orderbook.orders.map((o) => o.status).filter(Boolean))
    ),
  ];
  const columns = [
    {
      key: "symbol",
      label: "Stock",
      className: "text-left",
      sortable: true,
      renderCell: (o) => (
        <div className="stock-info">
          <div className="stock-symbol">{o.symbol}</div>
          <div className="stock-name">{o.name}</div>
        </div>
      ),
    },
    {
      key: "type",
      label: "Type",
      className: "text-left",
      sortable: true,
      renderCell: (o) => (
        <span className={`type-badge ${o.type?.toLowerCase()}`}>{o.type}</span>
      ),
    },
    {
      key: "quantity",
      label: "Quantity",
      sortable: true,
      className: "text-right",
    },
    {
      key: "price",
      label: "Price",
      sortable: true,
      className: "text-right",
      renderCell: (o) => formatCurrency(o.price),
    },
    {
      key: "orderValue",
      label: "Order Value",
      sortable: true,
      className: "text-right",
      renderCell: (o) => formatCurrency(o.orderValue),
    },
    {
      key: "status",
      label: "Status",
      className: "text-right",
      sortable: true,
      renderCell: (o) => (
        <span className={`status-badge ${o.status?.toLowerCase()}`}>
          {o.status}
        </span>
      ),
    },
    {
      key: "timestamp",
      label: "Date",
      className: "text-right",
      sortable: true,
      renderCell: (o) => formatDate(o.timestamp),
    },
  ];
  const filters = [
    { key: "type", label: "Type", options: typeOptions },
    { key: "status", label: "Status", options: statusOptions },
  ];
  const cardRender = (order) => (
    <div className="order-card">
      <div className="card-header">
        <div className="order-info">
          <h3 className="order-symbol">{order.symbol}</h3>
          <p className="order-name">{order.name}</p>
        </div>
        <div className="order-badges">
          <span className={`type-badge ${order.type?.toLowerCase()}`}>
            {order.type}
          </span>
          <span className={`status-badge ${order.status?.toLowerCase()}`}>
            {order.status}
          </span>
        </div>
      </div>
      <div className="card-details">
        <div className="detail-grid">
          <div className="detail-item">
            <span className="detail-label">Quantity</span>
            <span className="detail-value">{order.quantity}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Price</span>
            <span className="detail-value">{formatCurrency(order.price)}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Order Value</span>
            <span className="detail-value">
              {formatCurrency(order.orderValue)}
            </span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Date</span>
            <span className="detail-value">{formatDate(order.timestamp)}</span>
          </div>
        </div>
      </div>
    </div>
  );
  function formatCurrency(amount) {
    if (amount === undefined || amount === null) return "$0.00";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);
  }
  function formatDate(dateString) {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }
  return (
    <div className="orderbook-container">
      {/* Premium Glassy Header */}
      <div className="orderbook-header premium-glass-header">
        <div className="header-main">
          <div className="header-title">
            <h2>Orderbook</h2>
            <span className="orderbook-summary-label">Recent Orders</span>
          </div>
          <div className="header-stats">
            <div className="stat-group">
              <div className="stat-item primary">
                <span className="stat-value">
                  {formatCurrency(orderbook.pnl?.total)}
                </span>
                <span className="stat-label">Total P&L</span>
              </div>
              <div className="stat-item">
                <span className="stat-value positive">
                  {formatCurrency(orderbook.pnl?.realized)}
                </span>
                <span className="stat-label">Realized</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">
                  {formatCurrency(orderbook.pnl?.unrealized)}
                </span>
                <span className="stat-label">Unrealized</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CommonTable
        columns={columns}
        data={orderbook.orders}
        filters={filters}
        searchPlaceholder="Search orders by symbol, name, type, or status..."
        cardRender={cardRender}
        onRowClick={(order) =>
          onStockSelect &&
          onStockSelect({ symbol: order.symbol, name: order.name })
        }
        initialSort={{ field: "timestamp", direction: "desc" }}
        loading={loading}
        error={error}
        emptyMessage="No orders found."
        pageSizeOptions={PAGE_SIZE_OPTIONS}
      />
    </div>
  );
};

export default Orderbook;
