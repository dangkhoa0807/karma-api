const express = require('express');
const session = require('express-session');
const User = require('../model/User');
const cors = require('cors');
const app = express();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const SECRET_KEY= require('../config/secret_key');
const expiresIn = '1h';
// Sử dụng express-session middleware
const corsOptions = {
    origin: 'http://localhost:4200', // Thay thế bằng domain của client
    credentials: true // Để gửi và nhận cookies
};
app.use(cors(corsOptions));
app.use(cookieParser());
// Create token
function createToken(payload) {
    return jwt.sign(payload, SECRET_KEY, { expiresIn });
  }
  // Middleware kiểm tra JWT token
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}
class LoginController {
    getLogin(req, res) {
        res.render("page/login");
    }

    getSignup(req, res) {
        res.render("page/signup");
    }
    // handle sign up
    handleSignup(req, res) {
        const formdata = req.body;
        const user = new User(formdata);
        user.save()
            .then((savedUser) => {
                res.status(200).json({ message: "Đăng ký thành công", user: savedUser });
            })
            .catch((err) => {
                console.error("Lỗi khi đăng ký:", err);
                res.status(500).json({ error: "Lỗi khi đăng ký" });
            });
    }
    
    async checkExistence(req, res){
        const { email, name } = req.body;

    try {
        const userByEmail = await User.findOne({ email });
        const userByName = await User.findOne({ name });

        if (userByEmail || userByName) {
            return res.status(200).json({ 
                message: 'Email hoặc tên đã tồn tại',
                emailExists: !!userByEmail,
                nameExists: !!userByName 
            });
        }

        res.status(200).json({ message: 'Email và tên hợp lệ' });
    } catch (error) {
        console.error("Lỗi khi kiểm tra:", error);
        res.status(500).json({ error: 'Lỗi khi kiểm tra' });
    }
    }

    async handlelogin(req, res) {
        const { name, password } = req.body;
        try {
            const user = await User.findOne({ name, password });
            if (!user) {
                return res.status(404).json({ message: 'Không tìm thấy người dùng' });
            }

            const token = createToken({ _id: user._id, email: user.email });

            // Set token in cookie
             res.cookie('auth_token', token, { 
                httpOnly: true, 
                secure: false, // Đặt là true nếu bạn sử dụng HTTPS
                sameSite: 'None', // Để cookie có thể được gửi cross-site
                maxAge: 3600000 // 1 hour
            }); // 1 hour
            res.status(200).json({ token });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Đã xảy ra lỗi' });
        }
    }
}

module.exports = new LoginController();
