const router = require('express').Router();
const postsRoute = require('./posts/posts.router');


router.use('/posts', postsRoute);



module.exports = router;