const Post = require("../models/Post");
const User = require("../models/User");


// Busqueda de post por pagina.
const paginatePosts = async (page) => {
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
    const next_page = (page == pages)
        ? 'No more pages'
        : `${process.env.PATH_API}/posts?page=${page + 1}`
    return {
        page,
        pages,
        next_page,
        total_posts: total,
        posts: (posts.length) ? posts : ['the post list is empty']
    };
};
// Busqueda de post por author y pagina
const authorPosts = async (authorId, page) => {
    const userExist = await User.findById(authorId, { name: 1, surname: 1, img_avatar: 1 });
    if (!userExist) {
        res.status(400).json({
            error: 'id author no is user id'
        });
        return
    };
    const perPage = 9;
    const [total, posts] = await Promise.all([
        Post.countDocuments({ author: authorId }),
        Post.find({ author: authorId })
            .sort({ 'updatedAt': -1 })
            .skip(perPage * page - perPage)//Calculo para paginación.
            .limit(perPage)
    ]);
    const pages = Math.ceil(total / perPage);// Calculo paginas totales.
    const next_page = (page >= pages)
        ? 'No more pages'
        : `${process.env.PATH_API}/posts?author=${authorId}&page=${page + 1}`
    return {
        page,
        pages,
        next_page,
        total_posts: total,
        posts: (posts.length) ? posts : ['the post list is empty'],
        author: userExist
    };
};


module.exports = {
    paginatePosts,
    authorPosts
};