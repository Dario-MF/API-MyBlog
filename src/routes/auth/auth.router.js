const router = require('express').Router();
const { check } = require('express-validator');
const { validateErrors, validateRol, validateUser } = require('../../middlewares');
const { signUp, signIn } = require('../../controllers/users.controller');


router.post('/signup', [
    check('name', 'name is required').notEmpty(),
    check('surname', 'surname is required').notEmpty(),
    check('email')
        .notEmpty()
        .withMessage('email is required')
        .isEmail()
        .withMessage('email is invalid')
        .custom(validateUser.isUserEmail),
    check('password')
        .notEmpty()
        .withMessage('password is required')
        .isLength({ min: 6 })
        .withMessage('password must contain at least 6 characters')
        .isLength({ max: 20 })
        .withMessage("password can contain max 20 characters")
        .matches(/\d/)
        .withMessage('password must contain a number'),
    validateRol.isValidRole,
    validateErrors
], signUp);


router.post('/signin', [
    check('email')
        .notEmpty()
        .withMessage('email is required')
        .isEmail()
        .withMessage('email is invalid'),
    check('password')
        .notEmpty()
        .withMessage('password is required'),
    validateErrors
], signIn);


module.exports = router;