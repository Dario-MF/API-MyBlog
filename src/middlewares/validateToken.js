const jwt = require('jsonwebtoken');
const dayjs = require('dayjs');
const User = require('../models/User');



// verificar token: Existe, expirado, usuario valido, usuario activo.
const isTokenValid = async (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).json({
            msg: 'No token provaided'
        });
    };
    const { uid, exp } = jwt.verify(token, process.env.SECRET_JWT);
    if (dayjs().unix() > exp) {
        return res.status(403).json({
            msg: 'token expired'
        });
    };
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
    isTokenValid
};