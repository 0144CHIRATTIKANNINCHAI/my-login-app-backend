from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app) # Enable CORS for all routes

# Simple route for the root URL
@app.route('/')
def home():
    return "Backend is running!"

# Login endpoint
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    # Basic authentication (replace with actual database/auth logic)
    if username == 'user@example.com' and password == 'password':
        # In a real app, generate a proper JWT token
        # For simplicity, we'll just return a dummy token
        access_token = "dummy_jwt_token_for_user@example.com"
        return jsonify({
            "status": "ok",
            "message": "Login Success",
            "accessToken": access_token
        }), 200
    else:
        return jsonify({
            "status": "error",
            "message": "Invalid username or password"
        }), 401

from waitress import serve # บรรทัดนี้ควรอยู่ด้านบนของไฟล์แล้ว

from waitress import serve # บรรทัดนี้ควรอยู่ด้านบนของไฟล์แล้ว

if __name__ == '__main__':
    # app.run(host='127.0.0.1', port=5000, debug=True) # คอมเมนต์บรรทัดนี้ไป (หรือลบทิ้ง)
    serve(app, host='0.0.0.0', port=5000) # ใช้ waitress ในการรัน (0.0.0.0 ทำให้เครื่องอื่นเข้าถึงได้)