const Comment = require('../models/Comment');

const paginateComments = async (page, post) => {
    try {
        const perPage = 9;
        const [total, comments] = await Promise.all([
            Comment.countDocuments(),
            Comment.find({ post })
                .sort({ 'updatedAt': -1 })// Orden por fecha ascendiente.
                .skip(perPage * page - perPage)//Calculo para paginación.
                .limit(perPage)
                .populate('author', { name: 1, surname: 1, img: 1 })
        ]);
        const pages = Math.ceil(total / perPage);// Calculo paginas totales.
        const next_page = (page >= pages)
            ? null
            : `${process.env.PATH_API}/comments/${post}?page=${page + 1}`
        const prev_page = (page <= pages && page > 1)
            ? `${process.env.PATH_API}/comments/${post}?page=${page - 1}`
            : null

        return {
            page: (pages == 0) ? 0 : page,
            pages,
            next_page,
            prev_page,
            total_comments: total,
            comments: (comments.length) ? comments : ['the comments list is empty']
        };
    } catch (error) {
        throw new Error(error);
    };
};

module.exports = {
    paginateComments
};