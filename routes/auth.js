var express = require('express');
var router = express.Router();
const {  register,login, generateOtp, verifyOtp, createPassword } = require('../controller/authController')

router.post('/register_user', register);
router.post('/generate_otp', generateOtp);
router.post('/verify_otp', verifyOtp);
router.post('/create_password/:id', createPassword);
router.post('/login', login);

module.exports = router;

