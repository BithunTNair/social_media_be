var express = require('express');
var router = express.Router();
const {signup,login}= require('../controller/authController')

router.get('/signup',signup);
router.get('/login',login);

module.exports = router;

