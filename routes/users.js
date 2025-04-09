var express = require('express');
const upload = require('../middleware/upload');
const { createPost, giveLike, addComment } = require('../controller/userController');
var router = express.Router();

router.post('/create_posts',upload, createPost );
router.post('/give_like', giveLike );
router.post('/add_comment', addComment );

module.exports = router;
