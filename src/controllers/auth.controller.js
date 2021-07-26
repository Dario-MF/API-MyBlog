const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { v4: uuidv4 } = require('uuid');
const md5 = require('md5');
const { getTemplate, sendMail } = require('../libs/configMail');


const refresh = async (req, res) => {
    try {
        const user = req.user;
        // Grabar token
        const token = jwt.sign({ uid: user._id }, process.env.SECRET_JWT, {
            expiresIn: 86400
        });
        res.status(200).json({
            msg: 'refresh correct',
            token,
            user
        });
    } catch (error) {
        res.status(500).json({
            error: 'error in server',
        });
    };
};

const signUp = async (req, res) => {
    try {
        const { name, surname, email, img, password, idRoles } = req.body;

        const gravatarImg = `https://gravatar.com/avatar/${md5(email)}?d=retro`;

        const codeEmail = uuidv4();

        const newUser = new User({
            name,
            surname,
            email,
            img: (img) ? img : gravatarImg,
            roles: idRoles,
            password: await User.ecryptPassword(password),
            codeEmail
        });

        const templateEmail = getTemplate(name, codeEmail);

        const respMail = await sendMail(email, 'Activar cuenta en MyBlog', templateEmail);
        console.log(respMail)

        const savedUser = await newUser.save();

        const token = jwt.sign({ uid: savedUser._id }, process.env.SECRET_JWT, {
            expiresIn: 86400
        });
        res.status(200).json({
            msg: 'Signup correct',
            token,
            user: savedUser
        });
    } catch (error) {
        res.status(500).json({
            error: 'error in server',
        });
    };
};


const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Validar email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                error: 'email or password incorrect'
            });
        }
        if (!user.state) {
            return res.status(400).json({
                error: 'email or password incorrect'
            });
        }
        // validar password.
        const validPassword = await User.comparePassword(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                error: 'email or password incorrect'
            });
        };
        // Grabar token
        const token = jwt.sign({ uid: user._id }, process.env.SECRET_JWT, {
            expiresIn: 86400
        });
        res.status(200).json({
            msg: 'Signin correct',
            token,
            user
        });
    } catch (error) {
        res.status(500).json({
            error: 'error in server ctrl',
        });
    };
};


module.exports = {
    signUp,
    signIn,
    refresh
};