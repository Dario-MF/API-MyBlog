const Post = require('../models/Post');


const isIdValidPost = async (id = '') => {
    const idValid = await Post.findById(id);
    if (!idValid) {
        throw new Error('id invalid');
    };
    return;
};

module.exports = {
    isIdValidPost
};