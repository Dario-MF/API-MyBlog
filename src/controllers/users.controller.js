const User = require('../models/User');

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({ state: true }).populate('roles', { name: 1, _id: 0 });
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
        const user = await User.findById(id).populate('roles', { name: 1, _id: 0 });
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
        // Validar password
        let msgPassword = 'password no updated';
        if (newPassword && oldPassword) {
            const validPassword = await User.comparePassword(oldPassword, user.password);
            if (!validPassword) {
                return res.status(400).json({
                    msg: 'email or password incorrect'
                });
            };
            msgPassword = 'password updated successfully '
        };
        // Validar email
        if (email !== user.email) {
            const emailExist = await User.findOne({ email });
            if (emailExist) {
                return res.status(400).json({
                    msg: 'email or password incorrect'
                });
            };
        };
        // Actualizar usuario.
        const updated = await User.findByIdAndUpdate(user._id, {
            name: (name) ? name : user.name,
            surname: (surname) ? surname : user.surname,
            email: (email) ? email : user.email,
            roles: (idRoles) ? idRoles : user.roles,
            password: (newPassword && oldPassword) ? await User.ecryptPassword(newPassword) : user.password
        }, { new: true });

        await updated.populate('roles', { name: 1, _id: 0 }).execPopulate();

        res.status(200).json({
            msg: 'user updated',
            msgPassword,
            data: updated
        });
    } catch (error) {
        res.status(500).json({
            error: 'error in server ctrller'
        });
    };
};


const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await User.findByIdAndUpdate(id, { state: false }, { new: true });
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