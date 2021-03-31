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


// Filtro, si no hay rol se usa user predefinido, si hay se comprueba.
const isValidRole = async (req, res, next) => {
    const roles = req.body.roles;
    if (!roles || !roles.length) {
        const role = await Role.findOne({ name: 'USER_ROLE' });
        req.body.idRoles = [role._id];

    } else if (!roles.includes('USER_ROLE')) {
        return res.status(400).json({
            msg: 'Invalid role'
        });
    } else {
        const role = await Role.findOne({ name: 'USER_ROLE' });
        req.body.idRoles = [role._id];
    };
    next();
};


const updateRole = async (req, res, next) => {
    // Roles para actualizar
    const rolesBody = req.body.roles;
    // Roles del user que realiza la peticion
    const roles = await Role.find({ _id: { $in: req.user.roles } });
    // Validacion de si tiene rol suficionte para modificar el rol a un rango superior.
    if (roles[0].name === 'ADMIN_ROLE') {
        const idRoles = await Role.find({ _id: { $in: rolesBody } })
    }
    console.log(roles);
    req.body.idRoles = roles;
    next();
};





module.exports = {
    isAdminRole,
    isModeratorRole,
    isUserRole,
    isValidRole,
    updateRole
};