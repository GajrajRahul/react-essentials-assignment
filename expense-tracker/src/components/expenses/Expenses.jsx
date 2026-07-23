import { useState } from "react";
import Form from "../forms/Form";
import Divider from "../ui/Divider";

const Expenses = ({
  filteredExpenses,
  expenses,
  removeExpense,
  updateExpense,
}) => {
  const [editData, setEditData] = useState(null);

  const handleCancel = () => {
    setEditData(null);
  };

  return (
    <div className="expense-list">
      <Divider title="Expense List" />
      {filteredExpenses.length === 0 ? (
        <p style={{ textAlign: "center", color: "#666", fontStyle: "italic" }}>
          {expenses.length === 0
            ? "No expense yet. Add your first expense above!"
            : "No expenses match your filter. Try adjusting your filter criteria."}
        </p>
      ) : (
        filteredExpenses.map((expense) =>
          editData && editData.id === expense.id ? (
            <Form
              updateExpense={updateExpense}
              {...editData}
              handleCancel={handleCancel}
              key={editData.id}
            />
          ) : (
            <div className="expense-item" key={expense.id}>
              <div className="expense-info">
                <div className="expense-description">{expense.description}</div>
                <div className="expense-category">{expense.category}</div>
                <div style={{ color: "#666", fontSize: "14px" }}>
                  {expense.date}
                </div>
              </div>
              <div className="expense-amount">${expense.amount.toFixed(2)}</div>
              <div className="actions-btn">
                <button
                  className="edit"
                  onClick={() =>
                    setEditData({
                      ...expense,
                      desc: expense.description,
                      amt: expense.amount,
                      cat: expense.category,
                    })
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="2em"
                    height="2em"
                    viewBox="0 0 24 24"
                  >
                    <g className="edit-outline">
                      <g
                        fill="currentColor"
                        fillRule="evenodd"
                        className="Vector"
                        clipRule="evenodd"
                      >
                        <path d="M2 6.857A4.857 4.857 0 0 1 6.857 2H12a1 1 0 1 1 0 2H6.857A2.857 2.857 0 0 0 4 6.857v10.286A2.857 2.857 0 0 0 6.857 20h10.286A2.857 2.857 0 0 0 20 17.143V12a1 1 0 1 1 2 0v5.143A4.857 4.857 0 0 1 17.143 22H6.857A4.857 4.857 0 0 1 2 17.143z" />
                        <path d="m15.137 13.219l-2.205 1.33l-1.033-1.713l2.205-1.33l.003-.002a1.2 1.2 0 0 0 .232-.182l5.01-5.036a3 3 0 0 0 .145-.157c.331-.386.821-1.15.228-1.746c-.501-.504-1.219-.028-1.684.381a6 6 0 0 0-.36.345l-.034.034l-4.94 4.965a1.2 1.2 0 0 0-.27.41l-.824 2.073a.2.2 0 0 0 .29.245l1.032 1.713c-1.805 1.088-3.96-.74-3.18-2.698l.825-2.072a3.2 3.2 0 0 1 .71-1.081l4.939-4.966l.029-.029c.147-.15.641-.656 1.24-1.02c.327-.197.849-.458 1.494-.508c.74-.059 1.53.174 2.15.797a2.9 2.9 0 0 1 .845 1.75a3.15 3.15 0 0 1-.23 1.517c-.29.717-.774 1.244-.987 1.457l-5.01 5.036q-.28.281-.62.487m4.453-7.126s-.004.003-.013.006z" />
                      </g>
                    </g>
                  </svg>
                </button>
                <button
                  className="delete"
                  onClick={() => removeExpense(expense.id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="2em"
                    height="2em"
                    viewBox="0 0 24 24"
                  >
                    <g fill="none">
                      <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                      <path
                        fill="currentColor"
                        d="M14.28 2a2 2 0 0 1 1.897 1.368L16.72 5H20a1 1 0 1 1 0 2l-.003.071l-.867 12.143A3 3 0 0 1 16.138 22H7.862a3 3 0 0 1-2.992-2.786L4.003 7.07L4 7a1 1 0 0 1 0-2h3.28l.543-1.632A2 2 0 0 1 9.721 2zm3.717 5H6.003l.862 12.071a1 1 0 0 0 .997.929h8.276a1 1 0 0 0 .997-.929zM10 10a1 1 0 0 1 .993.883L11 11v5a1 1 0 0 1-1.993.117L9 16v-5a1 1 0 0 1 1-1m4 0a1 1 0 0 1 1 1v5a1 1 0 1 1-2 0v-5a1 1 0 0 1 1-1m.28-6H9.72l-.333 1h5.226z"
                      />
                    </g>
                  </svg>
                </button>
              </div>
            </div>
          ),
        )
      )}
    </div>
  );
};

export default Expenses;
