// rutas del modulo
const express = require('express'); // trae el módulo de express
const router = express.Router(); // usa la función de rutas
const multer = require('multer'); // requiere multer para manejar la subida de archivos
const path = require('path');


// Configura multer para aceptar solo archivos de imagen
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Solo se permiten archivos de imagen');
    }
};

const upload = multer({ // definimos que siempre subiremos una sola imagen traida de imagenUrl y guardada en upload
    storage: storage,
    fileFilter: fileFilter
}).single('imagenUrl');

// Controlador
const controller = require("../controllers/especialidades_medicas.controller");

// Método GET para todas las especialidades
router.get('/', controller.especialidadesMedicas);

// Método GET para una sola especialidad
router.get('/:idEspecialidad', controller.especialidad); // coincide con el la const busqueda

// Método POST para crear
router.post('/', upload, controller.crearEspecialidad);

// Método PUT para buscar por ID y actualizar
router.put('/:idEspecialidad', upload, controller.actualizarEspecialidad);

// Método DELETE para borrar una especialidad
router.delete('/:idEspecialidad', controller.borrarEspecialidad);

// Exportar las rutas (routers)
module.exports = router;

