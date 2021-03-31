const User = require('../models/User');
const Role = require('../models/Role');


// validar si el user email esta en uso.
const isUserEmail = async (email = '') => {
    const emailExist = await User.findOne({ email });
    if (emailExist) {
        throw new Error(`email: ${email}, already in use`);
    };
};

// validar si el uid existe en la DB.
const isUserId = async (req, res, next) => {
    const uid = req.uid;
    const user = await User.findById(uid);
    if (!user) {
        return res.status(404).json({
            msg: 'User not found'
        });
    } else if (!user.state) {
        return res.status(400).json({
            msg: 'User banned'
        });
    };
    req.user = user;
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
                error: 'id user invalid'
            });
        };
        const userRoles = await Role.find({ _id: { $in: roles } });
        const validUser = userRoles.map(rol => {
            if (rol.name !== 'ADMIN_ROLE' && _id !== paramUser._id) {
                return false;
            };
            return true;
        });
        if (!validUser[0]) {
            return res.status(401).json({
                error: 'require permission to make changes'
            });
        };
        next();
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error: 'problem in server (owner)'
        });
    };
};

module.exports = {
    isUserEmail,
    isUserId,
    isOwnerUser
};