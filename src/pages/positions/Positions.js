import React, { useState, useEffect } from "react";
import "./Positions.css";
import { getPositions } from "../../api/mockApi";
import CommonTable from "../../components/common/Table/CommonTable";

const PAGE_SIZE_OPTIONS = [10, 20, 50];

const Positions = ({ onStockSelect, onStocksUpdate }) => {
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPositions();
  }, []);

  useEffect(() => {
    if (onStocksUpdate && positions.length > 0) {
      onStocksUpdate(positions);
    }
  }, [positions, onStocksUpdate]);

  const fetchPositions = async () => {
    try {
      setLoading(true);
      const response = await getPositions();
      if (response.status === 200) {
        setPositions(response.data.positions || []);
      } else {
        setError("Failed to fetch positions");
      }
    } catch (err) {
      setError("Error loading positions data");
    } finally {
      setLoading(false);
    }
  };

  // Table config for CommonTable
  const typeOptions = [
    "All",
    ...Array.from(new Set(positions.map((p) => p.type).filter(Boolean))),
  ];
  const columns = [
    {
      key: "symbol",
      label: "Stock",
      className: "text-left",
      sortable: true,
      renderCell: (p) => (
        <div className="stock-info">
          <div className="stock-symbol">{p.symbol}</div>
          <div className="stock-name">{p.name}</div>
        </div>
      ),
    },
    {
      key: "type",
      label: "Type",
      className: "text-left",
      sortable: true,
      renderCell: (p) => (
        <span className={`position-type ${p.type?.toLowerCase()}`}>
          {p.type}
        </span>
      ),
    },
    {
      key: "quantity",
      label: "Quantity",
      sortable: true,
      className: "text-right",
    },
    {
      key: "avgPrice",
      label: "Avg Price",
      sortable: true,
      className: "text-right",
      renderCell: (p) => formatCurrency(p.avgPrice),
    },
    {
      key: "currentPrice",
      label: "Current Price",
      sortable: true,
      className: "text-right",
      renderCell: (p) => formatCurrency(p.currentPrice),
    },
    {
      key: "marketValue",
      label: "Market Value",
      sortable: true,
      className: "text-right",
      renderCell: (p) => formatCurrency(p.marketValue),
    },
    {
      key: "pnl",
      label: "P&L",
      sortable: true,
      className: "text-right",
      renderCell: (p) => (
        <span className={(p.pnl || 0) >= 0 ? "positive" : "negative"}>
          {formatCurrency(p.pnl)}
        </span>
      ),
    },
    {
      key: "pnlPercent",
      label: "P&L %",
      sortable: true,
      className: "text-right",
      renderCell: (p) => (
        <span className={(p.pnlPercent || 0) >= 0 ? "positive" : "negative"}>
          {formatPercentage(p.pnlPercent)}
        </span>
      ),
    },
  ];
  const filters = [
    { key: "type", label: "Type", options: typeOptions },
    {
      key: "pnlFilter",
      label: "P&L",
      options: ["All", "Profitable", "Losing"],
    },
  ];
  const tableData = positions.map((p) => ({
    ...p,
    pnlFilter:
      (p.pnl || 0) > 0 ? "Profitable" : (p.pnl || 0) < 0 ? "Losing" : "All",
  }));
  const cardRender = (position) => (
    <div className="position-card">
      <div className="card-header">
        <div className="stock-info">
          <h3 className="stock-symbol">{position.symbol}</h3>
          <p className="stock-name">{position.name}</p>
          <span className={`position-type ${position.type?.toLowerCase()}`}>
            {position.type}
          </span>
        </div>
        <div className="position-pnl">
          <span
            className={`pnl-amount ${
              (position.pnl || 0) >= 0 ? "positive" : "negative"
            }`}
          >
            {formatCurrency(position.pnl)}
          </span>
          <span
            className={`pnl-percentage ${
              (position.pnlPercent || 0) >= 0 ? "positive" : "negative"
            }`}
          >
            {formatPercentage(position.pnlPercent)}
          </span>
        </div>
      </div>
      <div className="card-details">
        <div className="detail-grid">
          <div className="detail-item">
            <span className="detail-label">Quantity</span>
            <span className="detail-value">{position.quantity}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Avg Price</span>
            <span className="detail-value">
              {formatCurrency(position.avgPrice)}
            </span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Current Price</span>
            <span className="detail-value">
              {formatCurrency(position.currentPrice)}
            </span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Market Value</span>
            <span className="detail-value">
              {formatCurrency(position.marketValue)}
            </span>
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
  function formatPercentage(value) {
    if (value === undefined || value === null) return "+0.00%";
    return `${value >= 0 ? "+" : ""}${value.toFixed(2)}%`;
  }
  return (
    <div className="positions-container">
      {/* Premium Glassy Header */}
      <div className="positions-header premium-glass-header compact">
        <div className="header-main compact">
          <div className="header-title compact">
            <h2>Positions</h2>
          </div>
          <div className="header-stats compact">
            <div className="stat-group compact">
              <div className="stat-item primary compact">
                <span
                  className={`stat-value ${
                    positions.reduce((sum, p) => sum + (p.pnl || 0), 0) >= 0
                      ? "positive"
                      : "negative"
                  }`}
                >
                  {formatCurrency(
                    positions.reduce((sum, p) => sum + (p.pnl || 0), 0)
                  )}
                </span>
                <span className="stat-label">Total P&L</span>
              </div>
              <div className="stat-item compact">
                <span className="stat-value">
                  {formatCurrency(
                    positions.reduce((sum, p) => sum + (p.marketValue || 0), 0)
                  )}
                </span>
                <span className="stat-label">Market Value</span>
              </div>
              <div className="stat-item compact">
                <span className="stat-value">{positions.length}</span>
                <span className="stat-label">Positions</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CommonTable
        columns={columns}
        data={tableData}
        filters={filters}
        searchPlaceholder="Search positions by symbol, name, or type..."
        cardRender={cardRender}
        onRowClick={onStockSelect}
        initialSort={{ field: "symbol", direction: "asc" }}
        loading={loading}
        error={error}
        emptyMessage="No positions found."
        pageSizeOptions={PAGE_SIZE_OPTIONS}
      />
    </div>
  );
};

export default Positions;
