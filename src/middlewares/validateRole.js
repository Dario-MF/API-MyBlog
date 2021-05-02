const Role = require('../models/Role');


// Autentificar ruta por roles pasados por parametro.
const authenticateRole = (authorizedRoles = []) => async (req, res, next) => {
    if (!req.user) {
        return res.status(500).json({
            error: 'problem in server, need validate role after token'
        });
    };
    let rolesReq = await Role.find({ _id: { $in: req.user.roles } });
    rolesReq = rolesReq.map(rolReq => rolReq.name);

    const authorized = authorizedRoles.map(roleAuth => {
        return rolesReq.includes(roleAuth);
    });

    if (authorized.includes(true)) {
        return next();
    };
    return res.status(401).json({
        success: false,
        message: ` Unauthorized, need rol: ${authorizedRoles}`,
    });
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

// Validacion de si tiene rol admin, para modificar roles,
// en caso contrario no se permite el cambio
const updateRole = async (req, res, next) => {
    try {
        let rolesUpdate = req.body.roles;

        let rolesReq = await Role.find({ _id: { $in: req.user.roles } });
        rolesReq = rolesReq.map(rolReq => rolReq.name);

        const authorized = rolesReq.includes('ADMIN_ROLE');
        if (authorized) {
            rolesUpdate = await Role.find({ name: { $in: rolesUpdate } });
            req.body.idRoles = (rolesUpdate.length) ? rolesUpdate.map(rol => rol._id) : null
            return next();

        } else {
            req.body.idRoles = null;
            return next();
        };
    } catch (error) {
        return res.status(500).json({
            error: 'error in server'
        });
    };
};


module.exports = {
    authenticateRole,
    isValidRole,
    updateRole
};