const { paginatePosts, authorPosts } = require('../libs/querysPost');
const Post = require('../models/Post');



const getAllPosts = async (req, res) => {
    const page = Number(req.query.page) || 1;
    try {
        let data;
        if (req.query.author) {
            // busqueda por author y pagina.
            data = await authorPosts(req.query.author, page);
        } else {
            // busqueda normal por pagina.
            data = await paginatePosts(page);
        };
        res.status(200).json({
            msg: 'get posts OK',
            data
        });
    } catch (error) {
        res.status(500).json({
            error: 'error en el servidor',
            error
        });
    };
};

const getPostById = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await Post.findById(id).populate('author', { _id: 0, name: 1, surname: 1, img: 1 });
        res.status(200).json({
            msg: 'post finded OK',
            data: post
        });
    } catch (error) {
        res.status(500).json({
            error: 'error en el servidor',
            error
        });
    };

};


const createPost = async (req, res) => {
    const { title, subtitle, img_path = '', article } = req.body;
    const { _id } = req.user;
    try {
        const newPost = await Post.create({ author: _id, title, subtitle, img_path, article });
        res.status(200).json({
            msg: 'post created: OK',
            newPost
        });
    } catch (error) {
        res.status(500).json({
            error: 'error en el servidor',
            error
        });
    };
};


const updatePost = async (req, res) => {
    const { title, subtitle = '', img_path = '', article } = req.body;
    const { id } = req.params;
    try {
        const post = await Post.findByIdAndUpdate(id, { title, subtitle, img_path, article }, { new: true });
        res.status(200).json({
            msg: 'post updated: OK',
            post
        });
    } catch (error) {
        res.status(500).json({
            error: 'error en el servidor',
            error
        });
    };
};


const deletePost = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await Post.findByIdAndDelete(id);
        res.status(200).json({
            msg: 'post deleted OK',
            post
        });
    } catch (error) {
        res.status(500).json({
            error: 'error en el servidor',
            error
        });
    };
};



module.exports = {
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost
};