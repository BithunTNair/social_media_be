const POSTS = require('../models/imgpostsModel')
const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRETE_KEY
});
const createPost = (req, res) => {
    try {
        if (!req.file) {
            res.send('File is not visible')
        }
        const post = cloudinary.uploader.upload(req.file.path, async (err, result) => {
            if (err) {
                res.status(500).json({ message: 'something went wrong' })
            }
            const imgUrl = result.url;
            const { caption } = req.body;
            const { userId } = req.params;
            const setPost = await POSTS({
                user: userId,
                caption: caption,
                img: imgUrl
            }).save();
            res.status(200).json({ message: 'post created successfully', setPost })
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'something went wrong' })
    }
};

const giveLike = async (req, res) => {
    try {
        const { userId } = req.body;
        const setLike = await POSTS({
            likes: userId
        }).save();
        res.status(200).json({ message: 'liked successfully'})
    } catch (error) {
        console.log(error);
        
        res.status(500).json({ message: 'something went wrong' })
    }
}

module.exports = { createPost ,giveLike}