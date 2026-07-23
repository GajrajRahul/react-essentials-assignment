import useExpenses from "./hooks/useExpenses";
import useFilters from "./hooks/useFilters";
import Form from "./components/forms/Form";
import Filters from "./components/filters/Filters";
import Expenses from "./components/expenses/Expenses";
import Divider from "./components/ui/Divider";

const App = () => {
  const { expenses, addExpense, updateExpense, removeExpense, getTotalAmount } =
    useExpenses();

  const {
    filters,
    updateFilter,
    clearFilters,
    filterSummary,
    filteredData: filteredExpenses,
  } = useFilters(expenses);

  return (
    <div className="App">
      <h1>Personal Expense Tracker</h1>

      <Form addExpense={addExpense} />

      <Divider title="Filters" />

      <Filters
        filters={filters}
        updateFilter={updateFilter}
        clearFilters={clearFilters}
        filterSummary={filterSummary}
        filteredExpenses={filteredExpenses}
      />

      <Expenses
        filteredExpenses={filteredExpenses}
        expenses={expenses}
        removeExpense={removeExpense}
        updateExpense={updateExpense}
      />
      <div className="total-section">
        <h2>Total Expenses</h2>
        <div className="total-amount">${getTotalAmount.toFixed(2)}</div>
        {filterSummary.hasActiveFilters && (
          <div style={{ fontSize: "16px", color: "#666", marginTop: "10px" }}>
            Filtered Total:{" "}
            {filteredExpenses
              .reduce((sum, expense) => sum + expense.amount, 0)
              .toFixed(2)}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
