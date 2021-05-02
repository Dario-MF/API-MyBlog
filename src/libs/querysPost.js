const Post = require("../models/Post");


// Busqueda de post por pagina.
const paginatePosts = async (page) => {
    try {
        const perPage = 9;
        const [total, posts] = await Promise.all([
            Post.countDocuments(),
            Post.find({})
                .sort({ 'updatedAt': -1 })// Orden por fecha ascendiente.
                .skip(perPage * page - perPage)//Calculo para paginación.
                .limit(perPage)
                .populate('author', { name: 1, surname: 1, img: 1 })
        ]);
        const pages = Math.ceil(total / perPage);// Calculo paginas totales.
        const next_page = (page >= pages)
            ? null
            : `${process.env.PATH_API}/posts?page=${page + 1}`
        const prev_page = (page <= pages && page > 1)
            ? `${process.env.PATH_API}/posts?page=${page - 1}`
            : null

        return {
            page: (pages == 0) ? 0 : page,
            pages,
            next_page,
            prev_page,
            total_posts: total,
            posts: (posts.length) ? posts : []
        };
    } catch (error) {
        throw new Error(error);
    };
};


// Busqueda de post por author y pagina
const authorPosts = async (authorId, page) => {
    try {
        const perPage = 9;
        const [total, posts] = await Promise.all([
            Post.countDocuments({ author: authorId }),
            Post.find({ author: authorId })
                .sort({ 'updatedAt': -1 })
                .skip(perPage * page - perPage)//Calculo para paginación.
                .limit(perPage)
                .populate('author')
        ]);
        const pages = Math.ceil(total / perPage);// Calculo paginas totales.
        const next_page = (page >= pages)
            ? null
            : `${process.env.PATH_API}/posts?page=${page + 1}`
        const prev_page = (page <= pages && page > 1)
            ? `${process.env.PATH_API}/posts?page=${page - 1}`
            : null
        return {
            page: (pages == 0) ? 0 : page,
            pages,
            next_page,
            prev_page,
            total_posts: total,
            posts: (posts.length) ? posts : []
        };
    } catch (error) {
        throw new Error(error);
    };
};


module.exports = {
    paginatePosts,
    authorPosts
};