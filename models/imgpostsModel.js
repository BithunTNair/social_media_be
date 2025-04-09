const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'users',
        required:true,
        index:true
    },
    post: {
        type: String,
    },
    caption: {
        type: String,
        trim: true
    },
    addedOn: {
        type: Date,
        default:Date.now,
        index:true
    },
    likes: [{
        type: mongoose.Types.ObjectId,
        ref: 'users',
        //unique:true
    }],
    likesCount: {
        type: Number,
        default: 0
    },
    // comment:{
    //     type:mongoose.Types.ObjectId,
    //     ref:'comments'
    // }
});

const imgPosts = mongoose.model('img_posts', postSchema);
module.exports = imgPosts