const router = require('express').Router();
const { check } = require('express-validator');
const commentCtrl = require('../../controllers/comments.controller');
const { validateErrors, validatePost, validateToken, validateUser, validateRol, validateComments } = require('../../middlewares')


// Obtener comentarios por id del post.
router.get('/:id', [
    check('id')
        .isMongoId()
        .withMessage('No is id valid'),
    validateErrors,
    validatePost.isIdValidPost
], commentCtrl.getCommentsPostId);

// crear comentario en post pasado por id.
router.post('/:id', [
    check('id')
        .isMongoId()
        .withMessage('No is id valid'),
    check('comment')
        .notEmpty()
        .withMessage('comment is required')
        .isLength({ max: 5000 })
        .withMessage('The value specified comment exceeds the maximum field length 5000'),
    validateErrors,
    validatePost.isIdValidPost,
    validateToken,
    validateUser.isUserIdToken,
    validateRol.authenticateRole(['USER_ROLE', 'MODERATOR_ROLE', 'ADMIN_ROLE']),
], commentCtrl.createComment);

// Actualizar comentario pasado por id
router.put('/:id', [
    check('id')
        .isMongoId()
        .withMessage('No is id valid'),
    check('comment')
        .notEmpty()
        .withMessage('comment is required')
        .isLength({ max: 5000 })
        .withMessage('The value specified comment exceeds the maximum field length 5000'),
    validateErrors,
    validateComments.isCommentId,
    validateToken,
    validateUser.isUserIdToken,
    validateRol.authenticateRole(['USER_ROLE', 'MODERATOR_ROLE', 'ADMIN_ROLE']),
    validateComments.isAuthorComment
], commentCtrl.updateComment);

// Eliminar comentario pasado por id
router.delete('/:id', [
    check('id')
        .isMongoId()
        .withMessage('No is id valid'),
    validateErrors,
    validateComments.isCommentId,
    validateToken,
    validateUser.isUserIdToken,
    validateRol.authenticateRole(['USER_ROLE', 'MODERATOR_ROLE', 'ADMIN_ROLE']),
    validateComments.isAuthorComment
], commentCtrl.deleteComment);






module.exports = router;