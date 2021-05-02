const { paginatePosts, authorPosts, searchPosts } = require('../libs/querysPost');
const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL);
const Post = require('../models/Post');



const getAllPosts = async (req, res) => {
    const page = Number(req.query.page) || 1;
    const { author } = req.query;
    const { search } = req.query;

    try {
        let data;
        if (author) {
            // busqueda por author y pagina.
            data = await authorPosts(author, page);
            data.author = req.author;
        } else if (search) {
            // busqueda por palabra.
            data = await searchPosts(search, page);
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
            error: 'error en el servidor'
        });
    };
};

const getPostById = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await Post.findById(id).populate('author');
        res.status(200).json({
            msg: 'post finded OK',
            data: post
        });
    } catch (error) {
        res.status(500).json({
            error: 'error en el servidor'
        });
    };

};


const createPost = async (req, res) => {
    const { title, subtitle, article } = req.body;
    const { _id } = req.user;
    const img = req.img;
    try {
        const newPost = await Post.create({ author: _id, title, subtitle, img, article });
        await newPost.populate('author').execPopulate();

        res.status(200).json({
            msg: 'post created: OK',
            data: newPost
        });
    } catch (error) {
        res.status(500).json({
            error: 'error en el servidor'
        });
    };
};


const updatePost = async (req, res) => {
    const { title, subtitle, article } = req.body;
    const { id } = req.params;

    try {
        let post;
        if (!req.files || !req.files.archivo || Object.keys(req.files).length === 0) {
            post = await Post.findByIdAndUpdate(id, { title, subtitle, article }, { new: true });

        } else {
            const { tempFilePath } = req.files.archivo;
            const { secure_url } = await cloudinary.uploader.upload(tempFilePath)
            const img = secure_url;

            post = await Post.findByIdAndUpdate(id, { title, subtitle, article, img }, { new: true });
        }

        await post.populate('author').execPopulate();
        res.status(200).json({
            msg: 'post updated: OK',
            data: post
        });
    } catch (error) {
        res.status(500).json({
            error: 'error en el servidor'
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
            error: 'error en el servidor'
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