const emailValidator = require('deep-email-validator');



const isEmailValid = async (req, res, next) => {
    const { email } = req.body;
    const { valid, reason, validators } = await emailValidator.validate(email);
    if (!valid) {
        return res.status(400).json({
            message: "Please provide a valid email address.",
            reason: validators[reason].reason
        })
    }
    next();
};

module.exports = isEmailValid;