const User = require('../models/User');

const getAllUsers = async (req, res) => {
    const page = Number(req.query.page) || 1;
    try {
        const perPage = 9;
        const [total, users] = await Promise.all([
            User.countDocuments(),
            User.find({ state: true }, { name: 1, surname: 1, img_avatar: 1 })
                .sort({ 'updatedAt': -1 })// Orden por fecha ascendiente.
                .skip(perPage * page - perPage)//Calculo para paginación.
                .limit(perPage)
                .populate('roles', { name: 1, _id: 0 })
        ]);
        const pages = Math.ceil(total / perPage);// Calculo paginas totales.
        const next_page = (page >= pages)
            ? 'No more pages'
            : `${process.env.PATH_API}/users?page=${page + 1}`
        res.status(200).json({
            msg: 'respuesta OK',
            page,
            pages,
            next_page,
            total_users: total,
            users: (users.length) ? users : ['the post list is empty']
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
        const user = await User.findById(id, { name: 1, surname: 1, img_avatar: 1 }).populate('roles', { name: 1, _id: 0 });
        if (!user) {
            return res.status(404).json({
                msg: 'User not found'
            });
        } else if (!user.state) {
            return res.status(400).json({
                msg: 'User banned or deleted'
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
    console.log('paso')
    const { name, surname, email, idRoles, newPassword, oldPassword } = req.body;
    const { id } = req.params;
    try {
        // Validar usuario
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({
                msg: 'User not found'
            });
        } else if (!user.state) {
            return res.status(400).json({
                msg: 'User banned or deleted'
            });
        };
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
            msg: 'user deleted'
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