const router = require('express').Router();

const postsRouter = require('./posts/posts.router');
const authRouter = require('./auth/auth.router');
const usersRouter = require('./users/users.router');
const commentsRouter = require('./comments/comments.router');
const uploadsRouter = require('./uploads/uploads.router');



router.use('/auth', authRouter);
router.use('/users', usersRouter);
router.use('/posts', postsRouter);
router.use('/comments', commentsRouter);
router.use('/uploads', uploadsRouter);



module.exports = router;