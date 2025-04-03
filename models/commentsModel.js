const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'users'
    },
    comment: {
        type: String,

    },
    createdOn: {
        type: Date,
        default: new Date 
    }
});
const comments = mongoose.model('comments', CommentSchema);
module.exports = comments;