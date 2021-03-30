const { validationResult } = require('express-validator');


// validar errores
const validateErrors = (req, res, next) => {
    const errorFormatter = ({ msg }) => {
        return `msg: ${msg}`;
    };
    const result = validationResult(req).formatWith(errorFormatter);
    if (!result.isEmpty()) {
        return res.status(400).json({
            errors: result.array()
        });
    };
    next();
};

module.exports = validateErrors;