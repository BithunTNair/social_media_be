const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
    postId: {
        type: mongoose.Types.ObjectId,
        ref: 'img_posts',
        required:true
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'users',
        required:true
    },
    comment: {
        type: String,

    },
    createdOn: {
        type: Date,
        default: Date.now
    }
});
const comments = mongoose.model('comments', CommentSchema);
module.exports = comments;