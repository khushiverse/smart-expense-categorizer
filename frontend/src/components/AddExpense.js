import React, { useState } from 'react';
import axios from 'axios';

const AddExpense = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !amount) return;

    try {
      // Call Flask backend for category prediction
      const response = await axios.post("http://127.0.0.1:5001/predict", {
        description: name,
      });

      const category = response.data.category;

      // Send complete data to parent
      onAdd({ name, amount: parseFloat(amount), category });

      // Reset form
      setName('');
      setAmount('');
    } catch (error) {
      console.error("Error predicting category:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Expense Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default AddExpense;
