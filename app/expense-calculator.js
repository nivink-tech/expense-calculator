"use client";

import { useState } from "react";

const CATEGORIES = ["Food", "Transport", "Housing", "Entertainment", "Other"];

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default function ExpenseCalculator() {
  const [expenses, setExpenses] = useState([]);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [filter, setFilter] = useState("All");

  function addExpense(e) {
    e.preventDefault();
    const value = parseFloat(amount);
    if (!description.trim() || !(value > 0)) return;
    setExpenses((prev) => [
      ...prev,
      { id: crypto.randomUUID(), description: description.trim(), amount: value, category },
    ]);
    setDescription("");
    setAmount("");
  }

  function removeExpense(id) {
    setExpenses((prev) => prev.filter((x) => x.id !== id));
  }

  const visible =
    filter === "All" ? expenses : expenses.filter((x) => x.category === filter);
  const total = visible.reduce((sum, x) => sum + x.amount, 0);

  return (
    <section>
      <form onSubmit={addExpense} className="form">
        <input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="number"
          min="0"
          step="0.01"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {CATEGORIES.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <button type="submit">Add</button>
      </form>

      <label className="filter">
        Filter by category:{" "}
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option>All</option>
          {CATEGORIES.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </label>

      <ul className="list">
        {visible.length === 0 && <li className="empty">No expenses.</li>}
        {visible.map((x) => (
          <li key={x.id}>
            <span>
              {x.description} <small>({x.category})</small>
            </span>
            <span>
              {formatter.format(x.amount)}{" "}
              <button onClick={() => removeExpense(x.id)} aria-label="Remove">
                ×
              </button>
            </span>
          </li>
        ))}
      </ul>

      <p className="total">
        Total{filter !== "All" ? ` (${filter})` : ""}: <strong>{formatter.format(total)}</strong>
      </p>
    </section>
  );
}
