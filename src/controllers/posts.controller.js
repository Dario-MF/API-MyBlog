const { paginatePosts, authorPosts } = require('../libs/querysPost');
const Post = require('../models/Post');



const getAllPosts = async (req, res) => {
    const page = Number(req.query.page) || 1;
    const { author } = req.query;
    try {
        let data;
        if (author) {
            // busqueda por author y pagina.
            data = await authorPosts(author, page);
            data.author = req.author;
        } else {
            // busqueda normal por pagina.
            data = await paginatePosts(page);
        };
        if (data.page > data.pages) {
            return res.status(400).json({
                error: `page param max: ${data.pages}`,
            })
        }
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
        const post = await Post.findById(id).populate('author', { _id: 0, name: 1, surname: 1 });
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
    const { title, subtitle, article } = req.body;
    const { _id } = req.user;
    const img = req.img;
    try {
        const newPost = await Post.create({ author: _id, title, subtitle, img, article });
        await newPost.populate('author', { name: 1, surname: 1 }).execPopulate();

        res.status(200).json({
            msg: 'post created: OK',
            data: newPost
        });
    } catch (error) {
        res.status(500).json({
            error: 'error en el servidor',
            error
        });
    };
};


const updatePost = async (req, res) => {
    const { title, subtitle = '', img, article } = req.body;
    const { id } = req.params;

    try {
        const post = await Post.findByIdAndUpdate(id, { title, subtitle, img, article }, { new: true });
        await post.populate('author', { name: 1, surname: 1 }).execPopulate();

        res.status(200).json({
            msg: 'post updated: OK',
            data: post
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
        await Post.findByIdAndDelete(id);
        res.status(200).json({
            msg: 'post deleted OK'
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