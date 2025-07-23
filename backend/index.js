const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const expenseRoutes = require('./routes/expenses'); // No need to add .js

// Connect to MongoDB (make sure your MongoDB URI is correct)
mongoose.connect('mongodb://localhost:27017/expenseDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/expenses', expenseRoutes);

app.get('/', (req, res) => {
  res.send('Express server is running!');
});

// Start server
const PORT = 5002;
app.listen(PORT, () => {
  console.log(`Express server running on http://localhost:${PORT}`);
});
