const User = require('../models/User');
const Role = require('../models/Role');
const { check } = require('express-validator');


// validar si el user email esta en uso.
const isUserEmail = async (email = '') => {
    const emailExist = await User.findOne({ email });
    if (emailExist) {
        throw new Error(`email: ${email}, already in use`);
    };
};

// validar si el uid del token existe en la DB.
const isUserId = async (req, res, next) => {
    const uid = req.uid;
    const user = await User.findById(uid);
    if (!user) {
        return res.status(404).json({
            msg: 'User not found'
        });
    } else if (!user.state) {
        return res.status(400).json({
            msg: 'User banned or deleted'
        });
    };
    req.user = user;
    next();
};

const isUserIdParam = async (req, res, next) => {
    const { author } = req.query.author;
    const user = await User.findById(author);
    if (!user) {
        return res.status(404).json({
            msg: 'User not found'
        });
    } else if (!user.state) {
        return res.status(400).json({
            msg: 'User banned or deleted'
        });
    };
    next();
};

// Validar si el usuario es dueño de la cuenta sobre la que quiere actuar o tine rol administrador.
const isOwnerUser = async (req, res, next) => {
    try {
        const { _id, roles } = req.user;
        const paramId = req.params.id;
        const paramUser = await User.findById(paramId);
        if (!paramUser) {
            return res.status(400).json({
                error: 'User not found'
            });
        };
        const userRoles = await Role.find({ _id: { $in: roles } });
        const validUser = userRoles.map(rol => {
            if (rol.name !== 'ADMIN_ROLE' && toString(_id) !== toString(paramUser._id)) {
                return false;
            };
            return true;
        });
        if (validUser.includes(true)) {
            return next()
        } else {
            return res.status(401).json({
                error: 'require permission to make changes'
            });
        };
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error: 'problem in server'
        });
    };
};

const checkPassword = (password = null) => {
    if (password) {
        if (password.length < 6 || password.length > 20) {
            console.log(password)
            return new Error();
        }
        if (password.match(/\d/)) {
            return new Error();
        }
    };
    return
};



module.exports = {
    isUserEmail,
    isUserId,
    isUserIdParam,
    isOwnerUser,
    checkPassword
};