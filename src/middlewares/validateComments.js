const Comment = require('../models/Comment');
const Role = require('../models/Role');


const isCommentId = async (req, res, next) => {
    const { id } = req.params;
    const idValid = await Comment.findById(id);
    if (!idValid) {
        return res.status(400).json({
            error: 'id comment no exist'
        });
    };
    next();
};

// Validar si el usuario es dueño del commentario o tine rol con permisos.
const isAuthorComment = async (req, res, next) => {
    try {
        const { _id, roles } = req.user;
        const commentId = req.params.id;
        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(400).json({
                error: 'id comment no exist'
            });
        };
        const userRoles = await Role.find({ _id: { $in: roles } });
        const validUser = userRoles.map(rol => {
            if (rol.name === 'USER_ROLE' && String(_id) !== String(commentId)) {
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
    isCommentId,
    isAuthorComment
};