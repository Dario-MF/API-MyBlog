const { validationResult } = require('express-validator');


// validar errores
const validateErrors = (req, res, next) => {
    const errorFormatter = ({ msg }) => {
        return msg;
    };
    const result = validationResult(req).formatWith(errorFormatter);
    if (!result.isEmpty()) {
        return res.status(400).json({
            error: result.array()
        });
    };
    next();
};

module.exports = validateErrors;