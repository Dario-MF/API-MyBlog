const Role = require('../models/Role');



// Filtro de rol Administrador.
const isAdminRole = async (req, res, next) => {
    if (!req.user) {
        return res.status(500).json({
            error: 'problem in server, need validate role after token'
        });
    };
    try {
        const roles = await Role.find({ _id: { $in: req.user.roles } });
        const isRoleValid = roles.map(rol => {
            if (rol.name === 'ADMIN_ROLE') {
                return true
            };
        });
        if (!isRoleValid[0]) {
            return res.status(403).json({
                error: 'Forbidden, access denied: role valid required.'
            });
        };
    } catch (error) {
        return res.status(500).json({
            error: 'problem in server.(rol)'
        });
    };
    next();
};

// Filtro rol ventas.
const isModeratorRole = async (req, res, next) => {
    if (!req.user) {
        return res.status(500).json({
            error: 'problem in server, need validate role after token'
        });
    };
    try {
        const roles = await Role.find({ _id: { $in: req.user.roles } });
        const isRoleValid = roles.map(rol => {
            if (rol.name === 'MODERATOR_ROLE' || rol.name === 'ADMIN_ROLE') {
                return true
            };
        });
        if (!isRoleValid[0]) {
            return res.status(403).json({
                error: 'Forbidden, access denied: role valid required.'
            });
        }
    } catch (error) {
        return res.status(500).json({
            error: 'problem in server.(rol)'
        });
    };
    next();
};

// Filtro rol usuario.
const isUserRole = async (req, res, next) => {
    if (!req.user) {
        return res.status(500).json({
            error: 'problem in server, need validate role after token'
        });
    };
    try {
        const roles = await Role.find({ _id: { $in: req.user.roles } });
        const isRoleValid = roles.map(rol => {
            if (rol.name === 'USER_ROLE' || rol.name === 'MODERATOR_ROLE' || rol.name === 'ADMIN_ROLE') {
                return true
            };
        });
        if (!isRoleValid[0]) {
            return res.status(403).json({
                error: 'Forbidden, access denied: role valid required.'
            });
        }
    } catch (error) {
        return res.status(500).json({
            error: 'problem in server.(rol)'
        });
    };
    next();
};


// Filtro, si no hay rol se usa user predefinido, si hay se comprueban.
const isValidRole = async (req, res, next) => {

    if (!req.body.roles || !req.body.roles.length) {
        const role = await Role.findOne({ name: 'USER_ROLE' });
        req.body.idRoles = [role._id];

    } else {
        const roles = await Role.find({ name: { $in: req.body.roles } });
        if (!roles.length) {
            return res.status(400).json({
                msg: 'Invalid role'
            });
        };
        req.body.idRoles = roles.map(rol => rol._id);
    };
    next();
};

module.exports = {
    isAdminRole,
    isModeratorRole,
    isUserRole,
    isValidRole
};