const Post = require('../models/Post');



const getAllPosts = async (req, res) => {
    const perPage = 9;
    const page = Number(req.query.page) || 1;
    try {
        const [total, posts] = await Promise.all([
            Post.countDocuments(),
            Post.find()
                .skip(perPage * page - perPage)//Calculo para paginación.
                .limit(perPage)
        ]);
        const pages = Math.ceil(total / perPage);
        const next_page = `http://localhost:3000/api/posts?page=${page + 1}`
        res.status(200).json({
            msg: 'get posts OK',
            page,
            pages,
            next_page,
            total_posts: total,
            data: posts
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
        const post = await Post.findById(id);
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
    const author = req.user;
    try {
        const newPost = await Post.create({ author: author._id, title, subtitle, img_path, article });
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