const mongoose=require('mongoose')

const userSchema= mongoose.Schema({
    firstName:{
        type:String,
    },
    lastName:{
        type:String,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        min:4,
        max:8
    },
    mobileNumber:{
        type:String,
        unique:true,
    },
    role:{
        type:Number,
        default:3
        // users  3,
        // restaurant owners 2,
        // admin 1
    },
    createdOn:{
        type:Date,
        default:new Date()
    },
    active:{
        type:Boolean,
        default:true
    }
});

const users= mongoose.model('users',userSchema);
module.exports=users