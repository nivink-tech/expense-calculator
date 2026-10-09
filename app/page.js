"use client";

import { useState } from "react";

const CATEGORIES = ["Food", "Transport", "Housing", "Entertainment", "Health", "Other"];

const money = (n) =>
  n.toLocaleString(undefined, { style: "currency", currency: "USD" });

export default function Home() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);

  const total = items.reduce((sum, i) => sum + i.amount, 0);

  const byCategory = CATEGORIES.map((c) => ({
    category: c,
    total: items.filter((i) => i.category === c).reduce((s, i) => s + i.amount, 0),
  })).filter((c) => c.total > 0);

  function addItem(e) {
    e.preventDefault();
    const value = parseFloat(amount);
    if (!name.trim() || !Number.isFinite(value) || value <= 0) return;
    setItems([...items, { id: Date.now(), name: name.trim(), amount: value, category }]);
    setName("");
    setAmount("");
  }

  const removeItem = (id) => setItems(items.filter((i) => i.id !== id));

  return (
    <main>
      <h1>Expense Calculator</h1>

      <form onSubmit={addItem} className="form">
        <input
          placeholder="Description"
          value={name}
          onChange={(e) => setName(e.target.value)}
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

      {items.length === 0 ? (
        <p className="muted">No expenses yet. Add one above.</p>
      ) : (
        <ul className="list">
          {items.map((i) => (
            <li key={i.id}>
              <span>
                {i.name} <small className="muted">{i.category}</small>
              </span>
              <span>
                {money(i.amount)}
                <button className="remove" onClick={() => removeItem(i.id)} aria-label="Remove">
                  ×
                </button>
              </span>
            </li>
          ))}
        </ul>
      )}

      <div className="total">
        <span>Total</span>
        <strong>{money(total)}</strong>
      </div>

      {byCategory.length > 0 && (
        <section>
          <h2>By category</h2>
          {byCategory.map((c) => (
            <div key={c.category} className="cat">
              <div className="cat-row">
                <span>{c.category}</span>
                <span>
                  {money(c.total)} ({Math.round((c.total / total) * 100)}%)
                </span>
              </div>
              <div className="bar">
                <div style={{ width: `${(c.total / total) * 100}%` }} />
              </div>
            </div>
          ))}
        </section>
      )}
    </main>
  );
}
