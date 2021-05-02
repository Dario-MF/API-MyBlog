const router = require('express').Router();
const { check } = require('express-validator');
const { getAllUsers, getUserWithId, updateUser, deleteUser } = require('../../controllers/users.controller');
const { validateToken, validateUser, validateErrors, validateRol } = require('../../middlewares');


// todos los usuarios
router.get('/', getAllUsers);


// usuario por id
router.get('/:id', [
    check('id')
        .isMongoId()
        .withMessage('No es id valido'),
    validateErrors,
    validateUser.isUserIdParam,
], getUserWithId);


// actualizar usuario
router.put('/:id', [
    check('id')
        .isMongoId()
        .withMessage('Not is id valid'),
    check('name')
        .notEmpty()
        .withMessage('name is required')
        .isLength({ min: 2, max: 20 })
        .withMessage("name can contain max 20 characters"),
    check('surname')
        .notEmpty()
        .withMessage('surname is required')
        .isLength({ min: 2, max: 40 })
        .withMessage("surname can contain max 20 characters"),
    check('email')
        .notEmpty()
        .withMessage('email is required')
        .isEmail()
        .withMessage('email is invalid')
        .isLength({ min: 6, max: 30 })
        .withMessage("email can contain max 30 characters"),
    validateErrors,
    validateToken,
    validateUser.isUserIdToken,
    validateUser.isUserIdParam,
    validateUser.isOwnerUser,
    validateRol.updateRole,
], updateUser);


// eliminar usuario
router.delete('/:id', [
    check('id')
        .isMongoId()
        .withMessage('No es id valido'),
    validateErrors,
    validateToken,
    validateUser.isUserIdToken,
    validateUser.isUserIdParam,
    validateUser.isOwnerUser,
], deleteUser);



module.exports = router;