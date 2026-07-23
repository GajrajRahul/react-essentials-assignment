import { useState } from "react";

import { CATEGORIES } from "../../utils/constants";

const Form = ({
  desc,
  amt,
  cat,
  date = null,
  addExpense = () => {},
  id = null,
  updateExpense = () => {},
  handleCancel = () => {},
}) => {
  const [description, setDescription] = useState(desc || "");
  const [amount, setAmount] = useState(amt || "");
  const [category, setCategory] = useState(cat || "food");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!description.trim() || !amount) return;

    const data = {
      description: description.trim(),
      amount: parseFloat(amount),
      category,
    };
    if (id) {
      updateExpense({ ...data, id, date });
      handleCancel();
    } else {
      addExpense(data);
    }

    setDescription("");
    setAmount("");
  };

  return (
    <form className={`expense-form ${id ? 'edit-form' : ''}`} onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <input
          type="text"
          name="description"
          id="description"
          placeholder="What did you spend on?"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="amount">Amount</label>
        <input
          type="number"
          name="amount"
          id="amount"
          step="0.01"
          placeholder="0.00"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="category">Category</label>
        <select
          name="category"
          id="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {CATEGORIES.slice(1).map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
      </div>
      <div className="actions-btn">
      <button type="submit">
        {id ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="2.75em"
            height="2.75em"
            viewBox="0 0 24 24"
            className="update"
          >
            <g
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            >
              <rect width="18" height="18" x="3" y="3" rx="4" />
              <path d="m9 12l2.25 2L15 10" />
            </g>
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="3em"
            height="3em"
            viewBox="0 0 24 24"
            className="add"
          >
            <path
              fill="currentColor"
              d="M7.007 12a.75.75 0 0 1 .75-.75h3.493V7.757a.75.75 0 0 1 1.5 0v3.493h3.493a.75.75 0 1 1 0 1.5H12.75v3.493a.75.75 0 0 1-1.5 0V12.75H7.757a.75.75 0 0 1-.75-.75"
            />
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="M7.317 3.769a42.5 42.5 0 0 1 9.366 0c1.827.204 3.302 1.643 3.516 3.48c.37 3.157.37 6.346 0 9.503c-.215 1.837-1.69 3.275-3.516 3.48a42.5 42.5 0 0 1-9.366 0c-1.827-.205-3.302-1.643-3.516-3.48a41 41 0 0 1 0-9.503c.214-1.837 1.69-3.276 3.516-3.48m9.2 1.49a41 41 0 0 0-9.034 0A2.486 2.486 0 0 0 5.29 7.424a39.4 39.4 0 0 0 0 9.154a2.486 2.486 0 0 0 2.193 2.164c2.977.332 6.057.332 9.034 0a2.486 2.486 0 0 0 2.192-2.164a39.4 39.4 0 0 0 0-9.154a2.486 2.486 0 0 0-2.192-2.163"
              clipRule="evenodd"
            />
          </svg>
        )}
      </button>
      {id && (
        <button className="cancel" onClick={handleCancel}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="2.75em"
            height="2.75em"
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M12 21.5c4.478 0 6.718 0 8.109-1.391S21.5 16.479 21.5 12v0c0-4.478 0-6.718-1.391-8.109S16.479 2.5 12 2.5c-4.478 0-6.718 0-8.109 1.391S2.5 7.521 2.5 12c0 4.478 0 6.718 1.391 8.109S7.521 21.5 12 21.5M15 9l-6 6m6 0L9 9"
            />
          </svg>
        </button>
      )}
      </div>
    </form>
  );
};

export default Form;
