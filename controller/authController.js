const USERS = require('../models/userModel');
const sendOtp = require('../utils/sendEmail')
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const register = (req, res) => {
    const { firstName, lastName,email, mobileNumber } = req.body;
    try {
     const user=   USERS({
            firstName: firstName,
            lastName: lastName,
            email:email,
            mobileNumber: mobileNumber,
        }).save().then((response) => {
           res.status(200).json({ message: 'user details have been registered' });
            console.log(response);

        }).catch((err) => {
            console.log(err);
            if(err.code===11000  && err.errmsg.includes('mobileNumber') ){
                return  res.status(400).json({ message: 'This mobile number is already exist' });
            }else if(err.code===11000  && err.errmsg.includes('email') ){
                return  res.status(405).json({ message: 'This email is exist' });
            }
            return  res.status(500).json({ message: 'something went wrong' });
        })
    } catch (error) {
        console.log(error);
        return  res.status(500).json({ message: 'something went wrong' });
    }
};

const generateOtp = async (req, res) => {
    const { mobileNumber, email } = req.body;
    try {
        const existingUser = await USERS.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({ message: 'user is not found' })
        }

        // const currentUser = await USERS.findOne({ mobileNumber });
        const otp = crypto.randomInt(100000, 999999).toString();
        console.log(otp);

        currentUser.otp = otp;
        currentUser.otpExpires = Date.now() + 10 * 60 * 1000;
        await currentUser.save()
        sendOtp(email, otp);
        return res.status(200).json({ message: 'OTP has been sent to your entered Gmail account' })
    } catch (error) {
        console.log(error);

    }
};

const verifyOtp = async (req, res) => {
    try {
        const { email, mobileNumber, otp ,password} = req.body;
        const currentUser = await USERS.findOne({ mobileNumber });
        console.log(currentUser);


        if (otp != currentUser.otp || currentUser.otpExpires < Date.now()) {
            return res.status(400).json({ message: 'OTP is not valid' })
        }
        console.log('hitted');
        bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS), function (err, hash) {
            if (err) {
                console.log('Password is not hashed' + err)

            }
            currentUser.password= hash;
            currentUser.save();
        })

        currentUser.otp = null;
        currentUser.otpExpires = null;
        currentUser.email = email;
       
        await currentUser.save();
        return res.status(200).json({ message: "You have been signed up successfully" })
    } catch (error) {
        console.log(error);

    }
};

const setPassword= (req,res)=>{
    const {password}=req.body;
    try {
        bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS), function (err, hash) {
            if (err) {
                console.log('Password is not hashed' + err)

            }


            USERS({
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
}



const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await USERS.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'user is not found' })
        }
        bcrypt.compare(password, user.password, function (err, result) {
            if (result) {
                user.password = undefined;
                const options = {
                    expiresIn: '1d'
                };
                const token = jwt.sign({ ...user }, process.env.SECRET_KEY, options);
                // console.log(token);
                
                return  res.status(200).json({ user: user })
            } else if (err) {
                return res.status(401).json({ message: 'Invalid Credentials' })
            }

        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Server error' })

    }
};

module.exports = { register, login, generateOtp, verifyOtp }