const User = require('../models/User');

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({ state: true });
        res.status(200).json({
            msg: 'respuesta OK',
            data: users
        });
    } catch (error) {
        res.status(500).json({
            error: 'error in server'
        });
    };
};

const getUserWithId = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) {
            res.status(400).json({
                error: `user with id: ${id} not exist`
            });
        };
        res.status(200).json({
            msg: 'respuesta OK',
            data: user
        });
    } catch (error) {
        res.status(500).json({
            error: 'error in server'
        });
    };
};

const updateUser = async (req, res) => {
    const { name, surname, email, idRoles, newPassword, oldPassword } = req.body;
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        const validPassword = await User.comparePassword(oldPassword, user.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'email or password incorrect'
            });
        };
        const updated = await User.findByIdAndUpdate(user._id, {
            name,
            surname,
            email,
            roles: idRoles,
            password: await User.ecryptPassword(newPassword)
        }, { new: true });
        res.status(200).json({
            msg: 'user updated',
            data: updated
        });
    } catch (error) {
        res.status(500).json({
            error: 'error in server'
        });
    };
};


const deleteUser = async (req, res) => {
    const { uid } = req.user;
    try {
        const deleted = await User.findByIdAndUpdate(uid, { state: false }, { new: true });
        res.status(200).json({
            msg: 'user deleted',
            data: deleted
        });
    } catch (error) {
        res.status(500).json({
            error: 'error in server'
        });
    };
};


module.exports = {
    getAllUsers,
    getUserWithId,
    updateUser,
    deleteUser
};