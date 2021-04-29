const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL);


const uploadImg = async (req, res, next) => {
    try {
        const { tempFilePath } = req.files.archivo;
        const { secure_url } = await cloudinary.uploader.upload(tempFilePath)

        req.img = secure_url;
        next();
    } catch (error) {
        res.status(500).json({
            error: 'error in server'
        })
    };
};


module.exports = {
    uploadImg
};