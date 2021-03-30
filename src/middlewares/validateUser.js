const User = require('../models/User');


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

module.exports = {
    isUserEmail,
    isUserId
};