const USERS = require('../models/userModel');
const sendOtp=require('../utils/sendEmail')
const crypto = require('crypto');
const bcrypt = require('bcrypt')
const signup = (req, res) => {
    const { firstName, lastName, email, mobileNumber, password } = req.body;
    try {
        bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS, function (err, hash) {
            if (err) {
                console.log('Password is not hashed' + err);

            }
            USERS({
                firstName: firstName,
                lastName: lastName,
                email: email,
                mobileNumber: mobileNumber,
                password: hash
            }).save().then((res) => [
                res.status(200).json({ message: 'user details have been registered' })
            ]).catch((err) => {
                console.log(err);

            })
        }))
    } catch (error) {
        console.log(error);

    }
};

const generateOtp = async (req, res) => {
    const { email } = req.body;
    try {
        const existingUser = await USERS.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({ message: 'user is not found' })
        }
        const otp = crypto.randomInt(100000, 999999).toString();
        USERS.otp = otp;
        USERS.otpExpires = Date.now() + 10 * 60 * 1000;
        sendOtp(email,otp)
    } catch (error) {
        console.log(error);

    }
};

const verifyOtp = () => [

]

const login = (req, res) => {

};

module.exports = { signup, login, generateOtp, verifyOtp }