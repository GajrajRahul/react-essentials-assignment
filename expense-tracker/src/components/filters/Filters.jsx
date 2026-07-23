import { CATEGORIES } from "../../utils/constants";

const Filters = ({
  filters,
  updateFilter,
  clearFilters,
  filterSummary,
  filteredExpenses,
}) => {
  return (
    <div className="filters">
      <div className="form-group">
        <label>Filter By Category</label>
        <select
          value={filters.category}
          onChange={(e) => updateFilter("category", e.target.value)}
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat === "all"
                ? "All Categories"
                : cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Search Description</label>
        <input
          type="text"
          value={filters.searchText}
          onChange={(e) => updateFilter("searchText", e.target.value)}
          placeholder="Search expenses..."
        />
      </div>

      <div className="form-group">
        <label>Min Amount</label>
        <input
          type="number"
          step="0.01"
          value={filters.minAmount}
          onChange={(e) => updateFilter("minAmount", e.target.value)}
          placeholder="0.00"
        />
      </div>

      <div className="form-group">
        <label>Max Amount</label>
        <input
          type="number"
          step="0.01"
          value={filters.maxAmount}
          onChange={(e) => updateFilter("maxAmount", e.target.value)}
          placeholder="999.99"
        />
      </div>

      {filterSummary.hasActiveFilters && (
        <button
          type="button"
          onClick={clearFilters}
          style={{ background: "#6c757d" }}
        >
          Clear Filters ({filterSummary.activeCount})
        </button>
      )}

      <div
        style={{
          padding: "14px",
          background: "#f8f9fa",
          borderRadius: "8px",
        }}
      >
        <p>
          Showing {filterSummary.totalResult} of {filteredExpenses.length}{" "}
          expenses.{" "}
          {filterSummary.hasActiveFilters &&
            `(${filterSummary.activeCount}) filter${filterSummary.activeCount !== "1" ? "s" : ""}`}
        </p>
      </div>
    </div>
  );
};

export default Filters;
