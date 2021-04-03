const router = require('express').Router();
const { check } = require('express-validator');
const { getAllPosts, getPostById, createPost, updatePost, deletePost } = require('../../controllers/posts.controller');
const { validateErrors, validatePost, validateToken, validateRol, validateUser } = require('../../middlewares');


router.get('/', getAllPosts);


router.get('/:id', [
    check('id')
        .isMongoId()
        .withMessage('No is id valid'),
    validateErrors,
    validatePost.isIdValidPost
], getPostById);


router.post('/', [
    check('title')
        .notEmpty()
        .withMessage('title is required')
        .isLength({ max: 40 })
        .withMessage('The value specified tilte exceeds the maximum field length 40'),
    check('subtitle')
        .notEmpty()
        .withMessage('subtitle is required')
        .isLength({ max: 100 })
        .withMessage('The value specified subtilte exceeds the maximum field length 100'),
    check('article')
        .notEmpty()
        .withMessage('article is required')
        .isLength({ max: 2800 })
        .withMessage('The value specified article exceeds the maximum field length 2800'),
    validateErrors,
    validateToken,
    validateUser.isUserId,
    validateRol.authenticateRole(['USER_ROLE', 'MODERATOR_ROLE', 'ADMIN_ROLE']),
], createPost);


router.put('/:id', [
    check('id')
        .isMongoId()
        .withMessage('No is id valid'),
    check('title')
        .notEmpty()
        .withMessage('title is required')
        .isLength({ max: 40 })
        .withMessage('The value specified tilte exceeds the maximum field length 40'),
    check('subtitle')
        .notEmpty()
        .withMessage('subtitle is required')
        .isLength({ max: 100 })
        .withMessage('The value specified subtilte exceeds the maximum field length 100'),
    check('article')
        .notEmpty()
        .withMessage('article is required')
        .isLength({ max: 2800 })
        .withMessage('The value specified article exceeds the maximum field length 2800'),
    validateErrors,
    validatePost.isIdValidPost,
    validateToken,
    validateUser.isUserId,
    validateRol.authenticateRole(['USER_ROLE', 'MODERATOR_ROLE', 'ADMIN_ROLE']),
    validatePost.isAuthorPost,
], updatePost);


router.delete('/:id', [
    check('id')
        .isMongoId()
        .withMessage('No is id valid'),
    validateErrors,
    validatePost.isIdValidPost,
    validateToken,
    validateUser.isUserId,
    validateRol.authenticateRole(['USER_ROLE', 'MODERATOR_ROLE', 'ADMIN_ROLE']),
    validatePost.isAuthorPost,
], deletePost);


module.exports = router;