const User = require('../models/User');

const paginateUsers = async (page) => {
    try {
        const perPage = 9;
        const [total, users] = await Promise.all([
            User.countDocuments(),
            User.find({ state: true }, { name: 1, surname: 1, img_avatar: 1 })
                .sort({ 'updatedAt': -1 })// Orden por fecha ascendiente.
                .skip(perPage * page - perPage)//Calculo para paginación.
                .limit(perPage)
                .populate('roles', { name: 1, _id: 0 })
        ]);
        const pages = Math.ceil(total / perPage);// Calculo paginas totales.
        const next_page = (page >= pages)
            ? null
            : `${process.env.PATH_API}/users?page=${page + 1}`
        const prev_page = (page <= pages && page > 1)
            ? `${process.env.PATH_API}/users?page=${page - 1}`
            : null
        return {
            page: (pages == 0) ? 0 : page,
            pages,
            next_page,
            prev_page,
            total_users: total,
            users: (users.length) ? users : ['the users list is empty']
        };
    } catch (error) {
        throw new Error(error);
    };
};


module.exports = {
    paginateUsers
}