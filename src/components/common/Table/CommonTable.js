import React, { useState, useEffect } from "react";
import "./CommonTable.css";

const DEFAULT_PAGE_SIZE_OPTIONS = [10, 20, 50];

function CommonTable({
  columns, // [{ key, label, sortable, renderCell }]
  data, // array of objects
  filters = [], // [{ key, label, options }]
  searchPlaceholder = "Search...",
  cardRender, // function(item): JSX for mobile card
  pageSizeOptions = DEFAULT_PAGE_SIZE_OPTIONS,
  onRowClick,
  initialSort = { field: "", direction: "asc" },
  loading = false,
  error = "",
  emptyMessage = "No data found.",
}) {
  // State
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState(
    initialSort.field || columns[0]?.key || ""
  );
  const [sortDirection, setSortDirection] = useState(
    initialSort.direction || "asc"
  );
  const [filterValues, setFilterValues] = useState(
    filters.reduce((acc, f) => ({ ...acc, [f.key]: f.options[0] || "All" }), {})
  );
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(pageSizeOptions[0]);

  // Filtering
  const filteredData = data.filter((item) => {
    // Search
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch =
      !searchTerm ||
      columns.some((col) => {
        const value = item[col.key];
        return (
          (typeof value === "string" &&
            value.toLowerCase().includes(searchLower)) ||
          (typeof value === "number" && value.toString().includes(searchLower))
        );
      });
    // Filters
    const matchesFilters = filters.every((f) => {
      const filterVal = filterValues[f.key];
      return filterVal === "All" || item[f.key] === filterVal;
    });
    return matchesSearch && matchesFilters;
  });

  // Sorting
  const sortedData = [...filteredData].sort((a, b) => {
    let aValue = a[sortField];
    let bValue = b[sortField];
    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
    }
    if (typeof aValue === "string" && typeof bValue === "string") {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
      return sortDirection === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
    if (aValue === undefined || aValue === null) aValue = "";
    if (bValue === undefined || bValue === null) bValue = "";
    return sortDirection === "asc"
      ? String(aValue).localeCompare(String(bValue))
      : String(bValue).localeCompare(String(aValue));
  });

  // Pagination
  const totalPages = Math.ceil(sortedData.length / pageSize) || 1;
  const paginatedData = sortedData.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  // Reset page on filter/search/pageSize change
  useEffect(() => {
    setPage(1);
  }, [searchTerm, filterValues, pageSize]);

  // Handlers
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };
  const getSortIcon = (field) => {
    if (sortField !== field) return "↕";
    return sortDirection === "asc" ? "↑" : "↓";
  };
  const handleFilterChange = (key, value) => {
    setFilterValues((fv) => ({ ...fv, [key]: value }));
  };
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) setPage(newPage);
  };

  // Responsive: show table on desktop, cards on mobile
  // Use CSS media queries for display

  return (
    <div className="common-table-container">
      {/* Controls */}
      <div className="control-bar">
        <div className="search-input-wrapper">
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <span className="search-icon">🔍</span>
        </div>
        <div className="filter-group">
          {filters.map((f) => (
            <select
              key={f.key}
              value={filterValues[f.key]}
              onChange={(e) => handleFilterChange(f.key, e.target.value)}
              className="filter-select"
            >
              {f.options.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          ))}
          <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            className="filter-select"
          >
            {pageSizeOptions.map((size) => (
              <option key={size} value={size}>
                Show {size}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table View (desktop) */}
      <div className="common-table-desktop">
        <table className="common-table">
          <thead>
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`${col.sortable ? "sortable" : ""} ${
                    col.className || ""
                  }`}
                  onClick={col.sortable ? () => handleSort(col.key) : undefined}
                >
                  {col.label} {col.sortable && getSortIcon(col.key)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr className="text-center">
                <td colSpan={columns.length}>Loading...</td>
              </tr>
            ) : error ? (
              <tr className="text-center">
                <td colSpan={columns.length} className="error">
                  {error}
                </td>
              </tr>
            ) : paginatedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length}>{emptyMessage}</td>
              </tr>
            ) : (
              paginatedData.map((item, idx) => (
                <tr
                  key={item.id || idx}
                  onClick={onRowClick ? () => onRowClick(item) : undefined}
                  style={{ cursor: onRowClick ? "pointer" : undefined }}
                >
                  {columns.map((col) => (
                    <td key={col.key} className={col.className || ""}>
                      {col.renderCell ? col.renderCell(item) : item[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Card View (mobile) */}
      <div className="common-table-mobile">
        {loading ? (
          <div className="loading">Loading...</div>
        ) : error ? (
          <div className="error">{error}</div>
        ) : paginatedData.length === 0 ? (
          <div className="empty">{emptyMessage}</div>
        ) : (
          paginatedData.map((item, idx) => (
            <div
              key={item.id || idx}
              className="common-table-card"
              onClick={onRowClick ? () => onRowClick(item) : undefined}
              style={{ cursor: onRowClick ? "pointer" : undefined }}
            >
              {cardRender ? (
                cardRender(item)
              ) : (
                <pre>{JSON.stringify(item, null, 2)}</pre>
              )}
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="pagination-bar">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
        >
          &lt;
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            className={page === i + 1 ? "active" : ""}
            onClick={() => handlePageChange(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
        >
          &gt;
        </button>
      </div>
    </div>
  );
}

export default CommonTable;
