
// Validar si el archivo existe.
const validarArchivoSubir = (req, res, next) => {
    if (!req.files || !req.files.archivo || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            error: 'no hay archivos mandados en: header/archivo(file)/su archivo'
        });
    };
    next();
};

// Validar colecciones permitidas
const coleccionesPermitidas = (coleccion = '', colecciones) => {
    if (!colecciones.includes(coleccion)) {
        throw new Error(`La coleccion: ${coleccion} no esta permitida, colecciones: ${colecciones}`);
    };
    return true;
};


module.exports = {
    validarArchivoSubir,
    coleccionesPermitidas
};