import React, { useState, useEffect } from "react";
import "./Holdings.css";
import CommonTable from "../../components/common/Table/CommonTable";
import { getHoldings } from "../../api/mockApi";

const PAGE_SIZE_OPTIONS = [10, 20, 50];

const Holdings = ({ onStockSelect, onStocksUpdate }) => {
  const [holdings, setHoldings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchHoldings();
  }, []);

  useEffect(() => {
    if (onStocksUpdate && holdings.length > 0) {
      onStocksUpdate(holdings);
    }
  }, [holdings, onStocksUpdate]);

  const fetchHoldings = async () => {
    try {
      setLoading(true);
      const response = await getHoldings();
      if (response.status === 200) {
        setHoldings(response.data);
      } else {
        setError("Failed to fetch holdings");
      }
    } catch (err) {
      setError("Error loading holdings data");
    } finally {
      setLoading(false);
    }
  };

  // Summary calculations
  const totalValue = holdings.reduce(
    (sum, holding) => sum + (holding.marketValue || 0),
    0
  );
  const totalPnl = holdings.reduce(
    (sum, holding) => sum + (holding.pnl || 0),
    0
  );
  const totalPnlPercent =
    totalValue > 0 ? (totalPnl / (totalValue - totalPnl)) * 100 : 0;
  const positiveHoldings = holdings.filter((h) => (h.pnl || 0) > 0).length;
  const negativeHoldings = holdings.filter((h) => (h.pnl || 0) < 0).length;
  const topPerformer = holdings.reduce(
    (top, holding) =>
      (holding.pnlPercent || 0) > (top.pnlPercent || 0) ? holding : top,
    holdings[0]
  );
  const worstPerformer = holdings.reduce(
    (worst, holding) =>
      (holding.pnlPercent || 0) < (worst.pnlPercent || 0) ? holding : worst,
    holdings[0]
  );
  const totalVolume = holdings.reduce(
    (sum, holding) => sum + (holding.volume || 0),
    0
  );
  const avgVolume = totalVolume / holdings.length || 0;
  const totalMarketCap = holdings.reduce(
    (sum, holding) => sum + (holding.marketCap || 0),
    0
  );
  const stocksNear52WeekHigh = holdings.filter((h) => {
    const currentPrice = h.currentPrice || 0;
    const weekHigh52 = h.weekHigh52 || 0;
    return weekHigh52 > 0 && currentPrice / weekHigh52 >= 0.95;
  }).length;
  const stocksNear52WeekLow = holdings.filter((h) => {
    const currentPrice = h.currentPrice || 0;
    const weekLow52 = h.weekLow52 || 0;
    return weekLow52 > 0 && currentPrice / weekLow52 <= 1.05;
  }).length;
  const sectorBreakdown = holdings.reduce((acc, holding) => {
    const sector = holding.sector || "Other";
    acc[sector] = (acc[sector] || 0) + (holding.marketValue || 0);
    return acc;
  }, {});
  const topSector = Object.entries(sectorBreakdown).reduce(
    (top, [sector, value]) => (value > top.value ? { sector, value } : top),
    { sector: "N/A", value: 0 }
  );

  // Table config for CommonTable
  const sectorOptions = [
    "All",
    ...Array.from(new Set(holdings.map((h) => h.sector).filter(Boolean))),
  ];
  const columns = [
    {
      key: "symbol",
      label: "Stock",
      className: "text-left",
      sortable: true,
      renderCell: (h) => (
        <div className="stock-info">
          <div className="stock-symbol">{h.symbol}</div>
          <div className="stock-name">{h.name}</div>
        </div>
      ),
    },
    { key: "sector", label: "Sector", sortable: true },
    { key: "quantity", label: "Qty", sortable: true, className: "text-center" },
    {
      key: "avgPrice",
      label: "Avg Price",
      sortable: true,
      className: "text-right",
      renderCell: (h) => formatCurrency(h.avgPrice),
    },
    {
      key: "currentPrice",
      label: "Current",
      sortable: true,
      className: "text-right",
      renderCell: (h) => formatCurrency(h.currentPrice),
    },
    {
      key: "weekHigh52",
      label: "52W High",
      sortable: true,
      className: "text-right",
      renderCell: (h) => (
        <span
          className={`week-high ${
            h.currentPrice / (h.weekHigh52 || 1) >= 0.95 ? "near-high" : ""
          }`}
        >
          {formatCurrency(h.weekHigh52)}
        </span>
      ),
    },
    {
      key: "weekLow52",
      label: "52W Low",
      sortable: true,
      className: "text-right",
      renderCell: (h) => (
        <span
          className={`week-low ${
            h.currentPrice / (h.weekLow52 || 1) <= 1.05 ? "near-low" : ""
          }`}
        >
          {formatCurrency(h.weekLow52)}
        </span>
      ),
    },
    {
      key: "marketValue",
      label: "Market Value",
      sortable: true,
      className: "text-right",
      renderCell: (h) => formatCurrency(h.marketValue),
    },
    {
      key: "pnl",
      label: "P&L",
      sortable: true,
      className: "text-right",
      renderCell: (h) => (
        <span className={(h.pnl || 0) >= 0 ? "positive" : "negative"}>
          {formatCurrency(h.pnl)}
        </span>
      ),
    },
    {
      key: "pnlPercent",
      label: "P&L %",
      sortable: true,
      className: "text-right",
      renderCell: (h) => (
        <span className={(h.pnlPercent || 0) >= 0 ? "positive" : "negative"}>
          {formatPercentage(h.pnlPercent)}
        </span>
      ),
    },
  ];
  const filters = [
    { key: "sector", label: "Sector", options: sectorOptions },
    {
      key: "pnlFilter",
      label: "P&L",
      options: ["All", "Profitable", "Losing"],
    },
  ];
  const tableData = holdings.map((h) => ({
    ...h,
    pnlFilter:
      (h.pnl || 0) > 0 ? "Profitable" : (h.pnl || 0) < 0 ? "Losing" : "All",
  }));
  const cardRender = (holding) => {
    const weekHigh52 = holding.weekHigh52 || 0;
    const weekLow52 = holding.weekLow52 || 0;
    const currentPrice = holding.currentPrice || 0;
    const highRatio = weekHigh52 > 0 ? currentPrice / weekHigh52 : 0;
    const lowRatio = weekLow52 > 0 ? currentPrice / weekLow52 : 0;
    return (
      <div className="holding-card">
        <div className="card-header">
          <div className="stock-info">
            <h3 className="stock-symbol">{holding.symbol}</h3>
            <p className="stock-name">{holding.name}</p>
          </div>
          <div className="stock-price">
            <span className="current-price">
              {formatCurrency(holding.currentPrice)}
            </span>
            <span
              className={`price-change ${
                (holding.pnlPercent || 0) >= 0 ? "positive" : "negative"
              }`}
            >
              {formatPercentage(holding.pnlPercent)}
            </span>
          </div>
        </div>
        <div className="card-details">
          <div className="detail-grid">
            <div className="detail-item">
              <span className="detail-label">Quantity</span>
              <span className="detail-value">{holding.quantity}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Avg Price</span>
              <span className="detail-value">
                {formatCurrency(holding.avgPrice)}
              </span>
            </div>
            <div className="detail-item">
              <span className="detail-label">52W High</span>
              <span
                className={`detail-value ${
                  highRatio >= 0.95 ? "near-high" : ""
                }`}
              >
                {formatCurrency(weekHigh52)}
              </span>
            </div>
            <div className="detail-item">
              <span className="detail-label">52W Low</span>
              <span
                className={`detail-value ${lowRatio <= 1.05 ? "near-low" : ""}`}
              >
                {formatCurrency(weekLow52)}
              </span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Market Value</span>
              <span className="detail-value">
                {formatCurrency(holding.marketValue)}
              </span>
            </div>
            <div className="detail-item">
              <span className="detail-label">P&L</span>
              <span
                className={`detail-value ${
                  (holding.pnl || 0) >= 0 ? "positive" : "negative"
                }`}
              >
                {formatCurrency(holding.pnl)}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };
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
  function formatNumber(num) {
    if (num === undefined || num === null) return "0";
    if (num >= 1e9) return (num / 1e9).toFixed(1) + "B";
    if (num >= 1e6) return (num / 1e6).toFixed(1) + "M";
    if (num >= 1e3) return (num / 1e3).toFixed(1) + "K";
    return num.toString();
  }
  const handleStockSelect = (holding) => {
    if (holding && holding.symbol && holding.name) {
      onStockSelect(holding);
    }
  };

  return (
    <div className="holdings-container">
      {/* Premium Eye-Catching Header */}
      <div className="holdings-header">
        <div className="header-main">
          <div className="header-title">
            <h2>Holdings</h2>
            <span className="stock-count">{holdings.length} positions</span>
          </div>
          <div className="header-stats">
            <div className="stat-group">
              <div className="stat-item primary">
                <span className="stat-value">{formatCurrency(totalValue)}</span>
                <span className="stat-label">Portfolio Value</span>
              </div>
              <div className="stat-item">
                <span
                  className={`stat-value ${
                    totalPnl >= 0 ? "positive" : "negative"
                  }`}
                >
                  {formatCurrency(totalPnl)}
                </span>
                <span
                  className={`stat-label ${
                    totalPnl >= 0 ? "positive" : "negative"
                  }`}
                >
                  {formatPercentage(totalPnlPercent)}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="summary-indicators">
          <div className="indicator">
            <div className="indicator-icon"></div>
            <span>{positiveHoldings} profitable</span>
          </div>
          <div className="indicator">
            <div className="indicator-icon warning"></div>
            <span>{negativeHoldings} losing</span>
          </div>
          {topPerformer && (
            <div className="indicator">
              <div className="indicator-icon"></div>
              <span>
                Top: {topPerformer.symbol}{" "}
                {formatPercentage(topPerformer.pnlPercent)}
              </span>
            </div>
          )}
          {worstPerformer && (
            <div className="indicator">
              <div className="indicator-icon danger"></div>
              <span>
                Worst: {worstPerformer.symbol}{" "}
                {formatPercentage(worstPerformer.pnlPercent)}
              </span>
            </div>
          )}
        </div>
        <div className="market-metrics">
          <div className="metric-row">
            <div className="metric-item">
              <span className="metric-label">Avg Vol:</span>
              <span className="metric-value">{formatNumber(avgVolume)}</span>
            </div>
            <div className="metric-item">
              <span className="metric-label">Market Cap:</span>
              <span className="metric-value">
                {formatCurrency(totalMarketCap)}
              </span>
            </div>
            <div className="metric-item">
              <span className="metric-label">52W High:</span>
              <span className="metric-value positive">
                {stocksNear52WeekHigh}
              </span>
            </div>
            <div className="metric-item">
              <span className="metric-label">52W Low:</span>
              <span className="metric-value negative">
                {stocksNear52WeekLow}
              </span>
            </div>
            {topSector.sector !== "N/A" && (
              <div className="metric-item">
                <span className="metric-label">Top Sector:</span>
                <span className="metric-value">{topSector.sector}</span>
              </div>
            )}
          </div>
        </div>
      </div>
      <CommonTable
        columns={columns}
        data={tableData}
        filters={filters}
        searchPlaceholder="Search stocks by symbol, name, or sector..."
        cardRender={cardRender}
        onRowClick={handleStockSelect}
        initialSort={{ field: "symbol", direction: "asc" }}
        loading={loading}
        error={error}
        emptyMessage="No holdings found."
        pageSizeOptions={PAGE_SIZE_OPTIONS}
      />
    </div>
  );
};

export default Holdings;
