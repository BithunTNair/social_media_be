const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'users'
    },
    img: {
        type: String,
    },
    addedOn: {
        type: Date
    }
});

const imgPosts = mongoose.model('img_posts', postSchema);
module.exports = imgPosts