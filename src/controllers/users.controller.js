const User = require('../models/User');
const { paginateUsers } = require('../libs/querysUsers');

const getAllUsers = async (req, res) => {
    const page = Number(req.query.page) || 1;
    try {
        const data = await paginateUsers(page)
        res.status(200).json({
            msg: 'respuesta OK',
            data
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
        const user = await User.findById(id, { name: 1, surname: 1, img: 1 }).populate('roles', { name: 1, _id: 0 });
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
    const { facebookUrl, twitterUrl, githubUrl, linkedinUrl } = req.body;
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        // Validar password
        let msgPassword = 'password no updated';
        if (newPassword.length && oldPassword.length) {
            const validPassword = await User.comparePassword(oldPassword, user.password);
            if (!validPassword) {
                return res.status(400).json({
                    error: 'email or password incorrect'
                });
            };
            msgPassword = 'password updated successfully '
        };
        // Validar email
        if (email !== user.email) {
            const emailExist = await User.findOne({ email });
            if (emailExist) {
                return res.status(400).json({
                    error: 'email or password incorrect'
                });
            };
        };
        // Actualizar usuario.
        const updated = await User.findByIdAndUpdate(user._id, {
            name: (name) ? name : user.name,
            surname: (surname) ? surname : user.surname,
            email: (email) ? email : user.email,
            roles: (idRoles) ? idRoles : user.roles,
            password: (newPassword && oldPassword) ? await User.ecryptPassword(newPassword) : user.password,
            facebookUrl: (facebookUrl) ? facebookUrl : user.facebookUrl,
            twitterUrl: (twitterUrl) ? twitterUrl : user.twitterUrl,
            githubUrl: (githubUrl) ? githubUrl : user.githubUrl,
            linkedinUrl: (linkedinUrl) ? linkedinUrl : user.linkedinUrl
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
        await User.findByIdAndUpdate(id, { state: false }, { new: true });
        res.status(200).json({
            msg: 'user deleted'
        });
    } catch (error) {
        res.status(500).json({
            error: 'error in server'
        });
    };
};


const confirmEmail = async (req, res) => {
    const { code } = req.params;
    try {
        const user = await User.findOne({ codeEmail: code });
        if (!user) {
            return res.status(400).json({
                error: 'user not found'
            })
        }
        const updated = await User.findByIdAndUpdate(user._id, {
            codeEmail: '',
            verify: true
        }, { new: true });

        await updated.populate('roles', { name: 1, _id: 0 }).execPopulate();

        res.status(200).json({
            msg: 'email confirmed',
            data: updated
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
    deleteUser,
    confirmEmail
};