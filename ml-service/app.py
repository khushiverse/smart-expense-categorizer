
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # allow requests from your React frontend

@app.route('/')
def home():
    return "Python ML Microservice is running!"

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    expense_description = data.get('description', '')

    # Dummy logic for now: categorize based on keywords
    if 'food' in expense_description.lower():
        category = 'Food'
    elif 'uber' in expense_description.lower() or 'ola' in expense_description.lower():
        category = 'Transport'
    elif 'book' in expense_description.lower():
        category = 'Education'
    else:
        category = 'Other'

    return jsonify({'category': category})

if __name__ == '__main__':
    app.run(port=5001, debug=True)
