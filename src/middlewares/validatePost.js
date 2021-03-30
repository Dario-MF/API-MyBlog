const Post = require('../models/Post');
const Role = require('../models/Role');


const isIdValidPost = async (id = '') => {
    const idValid = await Post.findById(id);
    if (!idValid) {
        throw new Error('id invalid');
    };
    return;
};

// Validar si el usuario es dueño del post o tine rol con permisos
const isAuthorPost = async (req, res, next) => {
    const{ uid, roles} = req.user;
    const postId = req.params.id;
    try {
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(400).json({
                error: 'id post invalid'
            });
        };
        const roles = await Role.find({ _id: { $in: roles } });
        roles.map(rol => {
            if(rol.name === 'USER_ROLE' && uid !== post.author){
                return res.status(401).json({
                    error: 'require permission to make changes'
                });
            };
        }); 
    next(); 
    } catch (error) {
        return res.status(500).json({
            error: 'problem in server'
        });
    };
};

module.exports = {
    isIdValidPost,
    isAuthorPost
};