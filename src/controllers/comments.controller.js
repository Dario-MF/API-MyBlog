const Comment = require('../models/Comment');
const { paginateComments } = require('../libs/querysComments');


// Buscar comentarios por Id del post.
const getCommentsPostId = async (req, res) => {
    const { id } = req.params;
    const page = Number(req.query.page) || 1;
    try {
        const data = await paginateComments(page, id);
        //const comments = await Comment.find({ post: id }).populate('author', { _id: 0, name: 1, surname: 1 });

        res.status(200).json({
            msg: 'response OK',
            data
        });
    } catch (error) {
        res.status(500).json({
            error: 'error en el servidor',
            error
        });
    };
};


// Crear comentario y enlazarlo a post.
const createComment = async (req, res) => {
    const author = req.user;
    const idPost = req.params.id;
    const { comment } = req.body;
    try {
        const newComment = await Comment.create({ post: idPost, author, comment });
        await newComment.populate('author', { name: 1, surname: 1 }).execPopulate();
        res.status(200).json({
            msg: 'comment created: OK',
            data: newComment
        });
    } catch (error) {
        res.status(500).json({
            error: 'error en el servidor',
            error
        });
    };
};


// Modificar comentario.
const updateComment = async (req, res) => {
    const { comment } = req.body;
    const { id } = req.params;
    try {
        const commentUpdated = await Comment.findByIdAndUpdate(id, { comment }, { new: true });
        await commentUpdated.populate('author', { name: 1, surname: 1 }).execPopulate();
        res.status(200).json({
            msg: 'comment updated: OK',
            data: commentUpdated
        });
    } catch (error) {
        res.status(500).json({
            error: 'error en el servidor',
            error
        });
    };
};


// Eliminar comentario
const deleteComment = async (req, res) => {
    const { id } = req.params;
    try {
        await Comment.findByIdAndDelete(id);
        res.status(200).json({
            msg: 'comment deleted OK'
        });
    } catch (error) {
        res.status(500).json({
            error: 'error en el servidor',
            error
        });
    };
};



module.exports = {
    getCommentsPostId,
    createComment,
    updateComment,
    deleteComment
};