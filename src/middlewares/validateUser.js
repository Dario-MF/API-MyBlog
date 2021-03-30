const User = require('../models/User');


// validar si el user email esta en uso.
const isUserEmail = async (email = '') => {
    const emailExist = await User.findOne({ email });
    if (emailExist) {
        throw new Error(`email: ${email}, already in use`);
    };
};

// validar si el uid existe en la DB.
const isUserId = async (id = '') => {
    const userExist = await User.findById(id);
    if (!userExist) {
        throw new Error(`user with id: ${id}, not exist`);
    };
};

module.exports = {
    isUserEmail,
    isUserId
};