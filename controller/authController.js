const USERS = require('../models/userModel');
const sendOtp = require('../utils/sendEmail')
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const signup = (req, res) => {
    const { firstName, lastName, mobileNumber, password } = req.body;
    try {
        bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS), function (err, hash) {
            if (err) {
                console.log('Password is not hashed' + err)

            }


            USERS({
                firstName: firstName,
                lastName: lastName,
                mobileNumber: mobileNumber,
                password: hash
            }).save().then((response) => {
                res.status(200).json({ message: 'user details have been registered' });
                console.log(response);
                
            }).catch((err) => {
                console.log(err);
            })
        })
    } catch (error) {
        console.log(error);

    }
};

const generateOtp = async (req, res) => {
    const { mobileNumber,email } = req.body;
    try {
        // const existingUser = await USERS.findOne({ email });
        // if (!existingUser) {
        //     return res.status(400).json({ message: 'user is not found' })
        // }

        const currentUser= await USERS.findOne({mobileNumber});
        const otp = crypto.randomInt(100000, 999999).toString();
        console.log(otp);

        currentUser.otp = otp;
        currentUser.otpExpires = Date.now() + 10 * 60 * 1000;
        await currentUser.save()
        sendOtp(email, otp);
        res.status(200).json({ message: 'OTP has been sent to your entered Gmail account' })
    } catch (error) {
        console.log(error);

    }
};

const verifyOtp = async (req, res) => {
  try {
    const {email, mobileNumber,otp } = req.body;
    const currentUser= await USERS.findOne({mobileNumber});
    console.log(currentUser);
    
   
    if (otp != currentUser.otp || currentUser.otpExpires < Date.now()) {
        return res.status(400).json({ message: 'OTP is not valid' })
    }
    console.log('hitted');
    
    currentUser.otp = null;
    currentUser.otpExpires = null;
    currentUser.email=email;
    await currentUser.save();
   return res.status(200).json({message:"You have been signed up successfully"})
  } catch (error) {
    console.log(error);
    
  }
}



const login = (req, res) => {

};

module.exports = { signup, login, generateOtp, verifyOtp }