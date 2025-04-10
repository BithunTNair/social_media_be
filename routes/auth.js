var express = require('express');
var router = express.Router();
const {  register,login, generateOtp, verifyOtp } = require('../controller/authController')

router.post('/register_user', register);
router.post('/generate_otp', generateOtp);
router.post('/verify_otp', verifyOtp);
router.post('/login', login);

module.exports = router;

