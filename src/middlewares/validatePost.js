const Post = require('../models/Post');
const Role = require('../models/Role');
const User = require('../models/User');


const isIdValidQuery = async (req, res, next) => {
    try {
        const { author } = req.query;
        if (author) {
            // Validar es mongo id.
            if (!author.match(/^[a-fA-F0-9]{24}$/)) {
                return res.status(400).json({
                    error: 'Id invalid',
                });
            };
            const authorData = await User.findById(author);
            // Validar id existe.
            if (!authorData) {
                return res.status(400).json({
                    error: 'Id user no exist',
                });
            };
            req.author = authorData;
        };
        next();
    } catch (error) {
        return res.status(500).json({
            error: 'problem in server'
        });
    };
};

const isIdValidPost = async (req, res, next) => {
    try {
        const { id } = req.params;
        const idValid = await Post.findById(id);
        if (!idValid) {
            return res.status(400).json({
                error: 'id post no exist'
            });
        };
        next();
    } catch (error) {
        return res.status(500).json({
            error: 'problem in server'
        });
    };
};

// Validar si el usuario es dueño del post o tine rol con permisos.
const isAuthorPost = async (req, res, next) => {
    try {
        const { _id, roles } = req.user;
        const postId = req.params.id;
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(400).json({
                error: 'id post no exist'
            });
        };
        const userRoles = await Role.find({ _id: { $in: roles } });
        const validUser = userRoles.map(rol => {
            if (rol.name === 'USER_ROLE' && toString(_id) !== toString(post.author)) {
                return false;
            };
            return true;
        });
        if (validUser.includes(true)) {
            return next();
        } else {
            return res.status(401).json({
                error: 'require permission to make changes'
            });
        };
    } catch (error) {
        return res.status(500).json({
            error: 'problem in server'
        });
    };
};

module.exports = {
    isIdValidQuery,
    isIdValidPost,
    isAuthorPost
};