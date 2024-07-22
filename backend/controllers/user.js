// controllers/userController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Generate an access token
const generateToken = (user) => {
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30m' });
};

// Generate a refresh token
const generateRefreshToken = (user) => {
    return jwt.sign({ id: user._id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
};



const registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({ username, email, password: hashedPassword });
        const token = generateToken(user);
        const refreshToken = generateRefreshToken(user);

        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            token,
            refreshToken
        });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error: error.message });
    }
};

const signInUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = generateToken(user);
        const refreshToken = generateRefreshToken(user);

        res.json({
            _id: user._id,
            username: user.username,
            email: user.email,
            token,
            refreshToken
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


// In userController.js
const refreshToken = async (req, res) => {
    console.log("refresh")
    const { refreshToken } = req.body;
    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const newToken = generateToken(user);
        res.json({ token: newToken });
    } catch (error) {
        res.status(401).json({ message: "Invalid refresh token" });
    }
};

module.exports = {
    registerUser,
    signInUser,
    refreshToken
};

