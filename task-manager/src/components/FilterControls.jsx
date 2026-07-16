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
        <label htmlFor="filter">Filter:</label>
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

      <div className="action-section">
        <button
          className="undo-btn"
          onClick={undoAction}
          disabled={!canUndo}
        >Undo</button>
      </div>
    </div>
  );
};

export default FilterControls;
