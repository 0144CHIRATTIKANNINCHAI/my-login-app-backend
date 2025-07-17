// backend/server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 

const app = express();
const PORT = 3000; 

app.use(cors()); 
app.use(bodyParser.json()); 

// *** กำหนดรหัสผ่านตายตัวสำหรับทุกอีเมล @cook.co.th ***
const REQUIRED_PASSWORD = 'Cook@8899.'; // กำหนดรหัสผ่านที่ต้องการ

// *** ไม่จำเป็นต้องมีอาร์เรย์ users อีกต่อไป เพราะเราจะตรวจสอบแค่โดเมนและรหัสผ่านตายตัว ***
// const users = [
//     { email: 'user1@cook.co.th', password: 'password123' },
//     { email: 'user2@cook.co.th', password: 'password456' },
//     { email: 'admin@cook.co.th', password: 'secure_admin_pass' },
//     { email: 'Chirattiakn@cook.oc.th', password: 'your_chosen_password' }, 
// ];


// *** Endpoint สำหรับ Login (API) ***
app.post('/api/login', (req, res) => {
    const { username, password } = req.body; 

    console.log(`Login attempt: Username=${username}, Password=${password}`); 

    // 1. ตรวจสอบว่าอีเมลลงท้ายด้วย @cook.co.th หรือไม่
    if (!username || !username.endsWith('@cook.co.th')) { 
        console.log('Login failed: Invalid email domain.');
        // ส่งสถานะ 400 (Bad Request) ถ้าอีเมลไม่ถูกต้อง
        return res.status(400).json({ status: 'error', message: 'Email must be from @cook.co.th domain.' });
    }

    // 2. ตรวจสอบรหัสผ่านว่าตรงกับ REQUIRED_PASSWORD ที่กำหนดไว้หรือไม่
    if (password === REQUIRED_PASSWORD) {
        // Login สำเร็จ
        const accessToken = `jwt_token_for_${username}_${Date.now()}`; 

        console.log('Login successful for:', username);
        // ส่งสถานะ 200 (OK) และข้อมูลสำเร็จกลับไป Frontend
        return res.status(200).json({ status: 'ok', message: 'Login successful', accessToken: accessToken });
    } else {
        // Login ล้มเหลว (รหัสผ่านไม่ถูกต้อง)
        console.log('Login failed: Invalid password.');
        // ส่งสถานะ 401 (Unauthorized) ถ้ารหัสผ่านไม่สำเร็จ
        return res.status(401).json({ status: 'error', message: 'Invalid password.' });
    }
});

// *** เริ่มต้น Server ***
app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
    console.log(`Login API available at http://localhost:${PORT}/api/login`);
});