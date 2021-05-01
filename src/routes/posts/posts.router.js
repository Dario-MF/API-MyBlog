const router = require('express').Router();
const { check } = require('express-validator');
const { getAllPosts, getPostById, createPost, updatePost, deletePost } = require('../../controllers/posts.controller');
const { validateErrors, validatePost, validateToken, validateRol, validateUser, uploadClodinary } = require('../../middlewares');
const { validarArchivoSubir } = require('../../middlewares/validateUpload');


router.get('/', [
    validatePost.isIdValidQuery
], getAllPosts);


router.get('/:id', [
    check('id')
        .isMongoId()
        .withMessage('No is id valid'),
    validateErrors,
    validatePost.isIdValidPost
], getPostById);


router.post('/', [
    validarArchivoSubir,
    uploadClodinary.uploadImg,
    check('title')
        .notEmpty()
        .withMessage('title is required')
        .isLength({ max: 150 })
        .withMessage('The value specified tilte exceeds the maximum field length 150'),
    check('subtitle')
        .notEmpty()
        .withMessage('subtitle is required')
        .isLength({ max: 150 })
        .withMessage('The value specified subtilte exceeds the maximum field length 150'),
    check('article')
        .notEmpty()
        .withMessage('article is required'),
    validateErrors,
    validateToken,
    validateUser.isUserIdToken,
    validateRol.authenticateRole(['USER_ROLE', 'MODERATOR_ROLE', 'ADMIN_ROLE'])
], createPost);


router.put('/:id', [
    check('id')
        .isMongoId()
        .withMessage('No is id valid'),
    check('title')
        .notEmpty()
        .withMessage('title is required')
        .isLength({ max: 150 })
        .withMessage('The value specified tilte exceeds the maximum field length 150'),
    check('subtitle')
        .notEmpty()
        .withMessage('subtitle is required')
        .isLength({ max: 150 })
        .withMessage('The value specified subtilte exceeds the maximum field length 150'),
    check('article')
        .notEmpty()
        .withMessage('article is required'),
    validateErrors,
    validatePost.isIdValidPost,
    validateToken,
    validateUser.isUserIdToken,
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
    validateUser.isUserIdToken,
    validateRol.authenticateRole(['USER_ROLE', 'MODERATOR_ROLE', 'ADMIN_ROLE']),
    validatePost.isAuthorPost,
], deletePost);


module.exports = router;