const router = require('express').Router();
const { check } = require('express-validator');
const { getAllUsers, getUserWithId, updateUser, deleteUser } = require('../../controllers/users.controller');
const { validateToken, validateUser, validateErrors, validateRol } = require('../../middlewares');



router.get('/', getAllUsers);

router.get('/:id', [
    check('id')
        .isMongoId()
        .withMessage('No es id valido'),
    validateErrors
], getUserWithId);

router.put('/:id', [
    check('id')
        .isMongoId()
        .withMessage('No es id valido'),
    validateToken,
    validateUser.isUserId,
    validateUser.isOwnerUser,
    validateRol.updateRole,
    validateErrors
], updateUser);

router.delete('/:id', [
    check('id')
        .isMongoId()
        .withMessage('No es id valido'),
    validateToken,
    validateUser.isUserId,
    validateUser.isOwnerUser,
    validateErrors
], deleteUser);



module.exports = router;