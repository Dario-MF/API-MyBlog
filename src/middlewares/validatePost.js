const Post = require('../models/Post');
const Role = require('../models/Role');


const isIdValidPost = async (req, res, next) => {
    const { id } = req.params;
    const idValid = await Post.findById(id);
    if (!idValid) {
        return res.status(400).json({
            error: 'id post invalid'
        });
    };
    next();
};

// Validar si el usuario es dueño del post o tine rol con permisos
const isAuthorPost = async (req, res, next) => {
    try {
        const { _id, roles } = req.user;
        const postId = req.params.id;
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(400).json({
                error: 'id post invalid'
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
        console.log(error)
        return res.status(500).json({
            error: 'problem in server (author)'
        });
    };
};

module.exports = {
    isIdValidPost,
    isAuthorPost
};