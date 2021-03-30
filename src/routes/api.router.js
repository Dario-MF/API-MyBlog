const router = require('express').Router();

const postsRouter = require('./posts/posts.router');
const authRouter = require('./auth/auth.router');


router.use('/auth', authRouter);
router.use('/posts', postsRouter);



module.exports = router;