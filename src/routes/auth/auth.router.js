const router = require('express').Router();
const { check } = require('express-validator');
const { validateErrors, validateRol, validateUser } = require('../../middlewares');
const { signUp, signIn } = require('../../controllers/auth.controller');


router.post('/signup', [
    check('name')
        .notEmpty()
        .withMessage('name is required')
        .isLength({ min: 2, max: 20 })
        .withMessage("name can contain max 20 characters"),
    check('surname')
        .notEmpty()
        .withMessage('surname is required')
        .isLength({ min: 2, max: 40 })
        .withMessage("surname can contain max 40 characters"),
    check('email')
        .notEmpty()
        .withMessage('email is required')
        .isEmail()
        .withMessage('email is invalid')
        .isLength({ min: 6, max: 30 })
        .withMessage("email can contain max 30 characters")
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