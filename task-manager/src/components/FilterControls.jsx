import { useTaskConext } from "../context/TaskContext";

const FilterControls = () => {
  const { filter, searchText, setFilter, setSearch, undoAction, canUndo } =
    useTaskConext();

  return (
    <div className="filter-controls">
      <div className="search-section">
        <input
          className="search-input"
          type="text"
          placeholder="Search task..."
          value={searchText}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="filter-section">
        <label htmlFor="filter">Filter</label>
        <div className="filter-buttons">
          {["all", "pending", "completed"].map((filterOption) => (
            <button
              key={filterOption}
              className={filter === filterOption ? "active" : ""}
              onClick={() => setFilter(filterOption)}
            >
              {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <button
        className="toggle-btn"
        style={{
          border: "1px solid #e9ecef",
          backgroundColor: canUndo ? "#667eea" : "#e1e8ed",
          color: canUndo ? "" : "#888",
          cursor: canUndo ? "" : "not-allowed",
        }}
        onClick={undoAction}
        disabled={!canUndo}
      >
        Undo
      </button>
    </div>
  );
};

export default FilterControls;
