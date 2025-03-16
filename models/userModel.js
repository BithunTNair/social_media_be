const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        // required: true,
        // unique: true
    },
    password: {
        type: String,
        required: true,
        min: 4,
        max: 8
    },
    mobileNumber: {
        type: String,
        required: true,
        unique: true,
    },
    otp: {
        type: String,

    },
    otpExpires: {
        type: Date
    },
    role: {
        type: Number,
        default: 2
        // users  2,
        // admin 1
    },
    createdOn: {
        type: Date,
        default: new Date()
    },
    active: {
        type: Boolean,
        default: true
    }
});

const users = mongoose.model('users', userSchema);
module.exports = users