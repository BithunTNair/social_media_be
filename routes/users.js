var express = require('express');
const upload = require('../middleware/upload');
const { createPost, giveLike } = require('../controller/userController');
var router = express.Router();

router.post('/create_posts',upload, createPost );
router.post('/give_like', giveLike );

module.exports = router;
