const { Router } = require('express');
const { check } = require('express-validator');
const { actualizarImgCloudinary } = require('../../controllers/upload.controller');
const { validateUser, validateToken } = require('../../middlewares');
const validateErrors = require('../../middlewares/validateErrors');
const { validarArchivoSubir, coleccionesPermitidas } = require('../../middlewares/validateUpload');



const router = Router();


router.put('/:coleccion/:id', [
    validarArchivoSubir,
    check('id', 'El id debe ser de Mongo').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c, ['users', 'posts'])),
    validateErrors,
    validateToken,
    validateUser.isUserIdToken,
    validateUser.isUserIdParam,
    validateUser.isOwnerUser,
], actualizarImgCloudinary);


module.exports = router;