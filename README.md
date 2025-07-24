#  Smart Expense Categorizer 💰
A smart web application that lets users log, visualize, and categorize their daily expenses with ease. Includes color-coded categories, a pie chart for analytics, and a smooth dark mode toggle — all designed to make budgeting feel less boring ✨

---

## 🌟 Features
- 🧾 Add expenses with name, amount, and category

- 🎨 Color-coded categories:
  - Food → Red
  - Transport → Blue
  - Beverages → Orange
  - Others → Green

- 🌘 Light / Dark mode toggle

- 📊 Pie chart visualization

- 🧠 Backend microservice using Python + Flask to intelligently categorize based on description

- 💾 Expenses persist with MongoDB

---

## 🛠 Tech Stack
**Frontend**: React, CSS

**Backend**: Flask (Python), REST API

**Database**: MongoDB (via Atlas or local)

**Libraries**: Chart.js (or Recharts), Axios, Node.js, Express

---

## 📸 Screenshots

### 🧾 Dashboard View  
This is the main interface where users can enter expenses and see them listed by category.

![Dashboard](./screenshots/sec_dashboard.png)

---

### 🌘 Dark Mode Toggle  
A smooth toggle lets users switch to dark mode for a sleek, low-light experience.

![Dark Mode](./screenshots/sec_darkmode.png)

---

### 📊 Analytics Pie Chart  
Visual breakdown of spending across categories, helping users stay mindful of habits.

![Pie Chart](./screenshots/sec_piechart.png)


---


## 🚀 How to Run Locally  
```bash
# Clone the repository
git clone https://github.com/khushiverse/your-repo-name.git

# Set up Frontend
cd client
npm install
npm start

# Set up Backend (in a new terminal)
cd server
pip install -r requirements.txt
python app.py
```

Make sure MongoDB is running and Flask API is served on a separate port!

## 💡 Future Improvements
 - 🔐 Add authentication (Login / Signup)

 - 📥 Export expense data as CSV

 - 📱 Mobile responsive version

 - 🧠 More intelligent category prediction using NLP

## 🤝 Connect

Started with “this should be easy,” ended with “who needs sleep.” Proud it exists.
Created with ☕ caffeine, and silent screaming by Khushi 👩‍💻

GitHub: @khushiverse

LinkedIn: https://www.linkedin.com/in/khushi-venkatesh





