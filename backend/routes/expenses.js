const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');

// Add new expense
router.post('/', async (req, res) => {
  const { name, amount, category } = req.body;

  if (!name || !amount || !category) {
    return res.status(400).json({ message: 'All fields are required!' });
  }

  try {
    const newExpense = new Expense({
      name,
      amount,
      category,
      createdAt: new Date()
    });

    const saved = await newExpense.save();
    res.status(201).json({ message: 'Expense added!', expense: saved });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save expense' });
  }
});

// Get all expenses
router.get('/', async (req, res) => {
  try {
    const allExpenses = await Expense.find().sort({ createdAt: -1 });
    res.json({ expenses: allExpenses });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch expenses' });
  }
});

// Delete expense by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Expense.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Expense not found' });
    }
    res.status(200).json({ message: 'Expense deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete expense' });
  }
});

module.exports = router;
