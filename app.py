from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app) # Enable CORS for all routes

@app.route('/')
def home():
    return "Backend is running!"

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    # ตรวจสอบว่า username ลงท้ายด้วย '@cook.co.th' และ password ตรงกับ 'Cook@8899.'
    if username and username.endswith('@cook.co.th') and password == 'Cook@8899.':
        return jsonify({"message": "Login successful!", "redirect": "index.html"}), 200
    else:
        return jsonify({"message": "Invalid credentials"}), 401

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)