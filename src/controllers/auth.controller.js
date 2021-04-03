const jwt = require('jsonwebtoken');
const User = require('../models/User');
const md5 = require('md5');


const signUp = async (req, res) => {
    const { name, surname, email, img_avatar, password, idRoles } = req.body;
    const newUser = new User({
        name,
        surname,
        email,
        img_avatar: (img_avatar) ? img_avatar : md5(email),
        roles: idRoles,
        password: await User.ecryptPassword(password)
    });
    const savedUser = await newUser.save();
    const token = jwt.sign({ uid: savedUser._id }, process.env.SECRET_JWT, {
        expiresIn: 86400
    });
    res.status(200).json({
        msg: 'Signup correct',
        token
    });
};


const signIn = async (req, res) => {
    const { email, password } = req.body;
    // Validar email
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({
            msg: 'email or password incorrect'
        });
    }
    if (!user.state) {
        return res.status(400).json({
            msg: 'email or password incorrect'
        });
    }
    // validar password.
    const validPassword = await User.comparePassword(password, user.password);
    if (!validPassword) {
        return res.status(400).json({
            msg: 'email or password incorrect'
        });
    };
    // Grabar token
    const token = jwt.sign({ uid: user._id }, process.env.SECRET_JWT, {
        expiresIn: 86400
    });
    res.status(200).json({
        msg: 'Signin correct',
        token
    });
};


module.exports = {
    signUp,
    signIn
};