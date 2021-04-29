const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL);

const Post = require("../models/Post");
const User = require("../models/User");



const actualizarImgCloudinary = async (req, res) => {
    const { coleccion, id } = req.params;
    let modelo;
    try {
        switch (coleccion) {
            case 'users':
                modelo = await User.findById(id);
                if (!modelo) {
                    res.status(400).json({
                        error: 'Usuario id no existe'
                    });
                }
                break;
            case 'posts':
                modelo = await Post.findById(id);
                if (!modelo) {
                    res.status(400).json({
                        error: 'Post id no existe'
                    });
                }
                break;

            default:
                res.status(500).json({ error: 'coleccion no contemplada' })
                break;
        };
        if (modelo.img) {
            const nombreArr = modelo.img.split('/');
            const nombre = nombreArr[nombreArr.length - 1];
            const [public_id] = nombre.split('.');
            cloudinary.uploader.destroy(public_id);
        }
        const { tempFilePath } = req.files.archivo;
        const { secure_url } = await cloudinary.uploader.upload(tempFilePath)

        modelo.img = secure_url;

        await modelo.save();

        res.json({
            msg: 'peticion OK',
            data: modelo
        });
    } catch (error) {
        res.status(500).json({
            error: 'error in server'
        });
    };
};

module.exports = {
    actualizarImgCloudinary
};