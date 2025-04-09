const POSTS = require('../models/imgpostsModel');
const COMMENTS= require('../models/commentsModel');
const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRETE_KEY
});
const createPost = (req, res) => {
    try {
        console.log('hitted');

        if (!req.file) {
            return res.send('File is not visible')
        }
        const post = cloudinary.uploader.upload(req.file.path, async (err, result) => {
            if (err) {
                console.log(err);

                return res.status(500).json({ message: 'something went wrong' })
            }
            const imgUrl = result.url;
            const { caption } = req.body;
            const userId = '67d6e4b525da9a33b1ff5a87';
            const setPost = await POSTS({
                user: userId,
                caption: caption,
                post: imgUrl
            }).save();
            return res.status(200).json({ message: 'post created successfully', setPost })
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'something went wrong' })
    }
};

const giveLike = async (req, res) => {
    try {
        const { userId, postId } = req.body;
        const post = await POSTS.findById(postId);
        if (!post.likes.includes(userId)) {
            await POSTS.findByIdAndUpdate(postId, {
                $addToSet: { likes: userId },
                $inc: { likesCount: 1 }
            });
            return res.status(200).json({ message: 'liked successfully' })
        }
        return res.status(406).json({ message: 'you have already liked this post' })
    } catch (error) {
        console.log(error);

        return res.status(500).json({ message: 'something went wrong' })
    }
};

const addComment= async(req,res)=>{
    const {postId,comment,userId}= req.body;
    try {
        if(user){
            const comments= await COMMENTS({
                postId:postId,
                user:userId,
                comment:comment,
            }).save();
            return res.status(200).json({ message: 'comment was added successfully' ,comments})
        }
        return res.status(400).json({ message: 'user is not found' });
       
    } catch (error) {
        console.log(error);

        return res.status(500).json({ message: 'something went wrong' })
    }
}

module.exports = { createPost, giveLike ,addComment}