var express = require('express');
var router = express.Router();
const { signup, login, generateOtp, verifyOtp } = require('../controller/authController')

router.post('/signup', signup);
router.post('/generate_otp', generateOtp);
router.post('/verify_otp', verifyOtp);
router.post('/login', login);

module.exports = router;

