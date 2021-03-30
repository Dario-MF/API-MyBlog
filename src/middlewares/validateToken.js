const jwt = require('jsonwebtoken');
const dayjs = require('dayjs');
const User = require('../models/User');



// verificar token: Existe, expirado, usuario valido, usuario activo.
const isTokenValid = async (req, res, next) => {
    const token = req.headers['authorization'];  
    if (token) {
        jwt.verify(token, process.env.SECRET_JWT, function(err, decoded){
            if (err){
                return res.status(401).json({
                    error: 'Unauthorized access.' 
                });
            };
            req.uid = decoded.uid;
            next();
        });
    } else {
        return res.status(403).json({
                    error: 'No token provaided'
        });
    };
};

module.exports = isTokenValid;
