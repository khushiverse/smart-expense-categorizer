import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Analytics from './components/Analytics';

function App() {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [expenses, setExpenses] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  const categoryColors = {
    Food: '#ff7f7f',
    Transport: '#7fafff',
    Other: '#7fff7f',
    Beverages: '#c48fff'
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const res = await axios.get('http://localhost:5002/api/expenses');
      setExpenses(res.data.expenses);
    } catch (err) {
      console.error('Failed to fetch expenses:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5002/api/expenses', {
        name,
        amount,
        category
      });
      setExpenses([res.data.expense, ...expenses]);
      setName('');
      setAmount('');
      setCategory('');
    } catch (err) {
      console.error('Error saving expense:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5002/api/expenses/${id}`);
      setExpenses(expenses.filter((e) => e._id !== id));
    } catch (err) {
      console.error('Error deleting expense:', err);
    }
  };

  return (
    <div className={`App ${darkMode ? 'dark' : ''}`}>
      <button
        className="toggle-button"
        onClick={() => setDarkMode(!darkMode)}
        aria-label="Toggle dark mode"
      >
        {darkMode ? '🌞' : '🌙'}
      </button>
      <h1 className="header">
        Smart Expense Categorizer<span className="money-emoji" role="img" aria-label="money">💰</span>
      </h1>

      <form onSubmit={handleSubmit} className="expense-form">
        <input
          type="text"
          className="expense-input"
          placeholder="Expense Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          className="expense-input"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <select
          className="expense-input"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Select Category</option>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Beverages">Beverages</option>
          <option value="Other">Other</option>
        </select>
        <button type="submit" className="add-btn">Add</button>
      </form>

      <div className="analytics-expenses-container">
        <div className="expense-list">
          {expenses.map((expense) => {
            const bgColor =
              categoryColors[expense.category] || categoryColors['Other'];
            return (
              <div
                key={expense._id}
                className={`expense-entry category-${expense.category.toLowerCase()}`}
                style={{
                  borderLeft: `6px solid ${bgColor}`,
                  backgroundColor: darkMode ? '#23232a' : '#fff',
                  color: darkMode ? '#f3f4f6' : '#1a1a1a'
                }}
              >
                <span className="expense-details">
                  <span className="expense-name">{expense.name}</span>
                  <span className="expense-amount">₹{expense.amount}</span>
                  <span className="expense-category">{expense.category}</span>
                </span>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(expense._id)}
                  aria-label="Delete"
                >
                  ❌
                </button>
              </div>
            );
          })}
        </div>
        {/* ✅ Updated Analytics call */}
        <Analytics darkMode={darkMode} expenses={expenses} />
      </div>
    </div>
  );
}

export default App;
