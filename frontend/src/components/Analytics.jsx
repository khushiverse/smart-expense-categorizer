import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const COLORS = ['#FF6B6B', '#4D96FF', '#5FD068', '#FFC75F', '#C34A36'];

function Analytics() {
  const [data, setData] = useState([]);
    const [totalSpent, setTotalSpent] = useState(0);
    const [topCategory, setTopCategory] = useState('');
    const [topCategoryAmount, setTopCategoryAmount] = useState(0);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const res = await axios.get('http://localhost:5002/api/expenses');
        const expenses = res.data.expenses;
        console.log("Fetched expenses:", expenses);


        // Count total amount per category
        const categoryTotals = {};
        expenses.forEach((exp) => {
          const cat = exp.category || 'Other';
          categoryTotals[cat] = (categoryTotals[cat] || 0) + exp.amount;
        });

        // Convert to array for Recharts
        const formatted = Object.entries(categoryTotals).map(([key, value]) => ({
          name: key,
          value
        }));

        setData(formatted);
        // Total amount spent
const total = expenses.reduce((acc, curr) => acc + curr.amount, 0);

// Find category with highest spending
let maxCategory = '';
let maxAmount = 0;
for (const [cat, amt] of Object.entries(categoryTotals)) {
  if (amt > maxAmount) {
    maxAmount = amt;
    maxCategory = cat;
  }
}

setTotalSpent(total);
setTopCategory(maxCategory);
setTopCategoryAmount(maxAmount);
        console.log("Formatted data for chart:", formatted);
      } catch (err) {
        console.error('Failed to load analytics:', err);
      }
    };

    fetchExpenses();
  }, []);

  return (
    <div className="analytics">
      <h2>Expense Breakdown</h2>
      <p><strong>Total Spent:</strong> ₹{totalSpent}</p>
<p><strong>Most Spent On:</strong> {topCategory}</p>
<p><strong>Amount:</strong> ₹{topCategoryAmount}</p>
      {data.length === 0 ? (
        <p>No data to show</p>
      ) : (
        <PieChart width={400} height={300}>
          <Pie
            data={data}
            cx={200}
            cy={150}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      )}
    </div>
  );
}

export default Analytics;
