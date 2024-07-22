// routes/user.js
const express = require('express');
const router = express.Router();
const { registerUser, signInUser, refreshToken } = require('../controllers/user');

router.post('/register', registerUser);
router.post('/signin', signInUser);
router.post('/refreshToken', refreshToken);

module.exports = router;
