const router = require('express').Router();

const postsRouter = require('./posts/posts.router');
const authRouter = require('./auth/auth.router');
const usersRouter = require('./users/users.router');
const commentsRouter = require('./comments/comments.router');



router.use('/auth', authRouter);
router.use('/users', usersRouter);
router.use('/posts', postsRouter);
router.use('/comments', commentsRouter);



module.exports = router;