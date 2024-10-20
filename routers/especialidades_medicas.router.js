//rutas del modulo
const express = require('express'); // traiga el modulo de expres
const router = express.Router(); // que use la funcion de rutas

// MULTER
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination:(req,file, cb) => { //cb=callback se especifica la carpeta de destino // destination como y donde voy a subir esos archivos
        cb(null, 'uploads'); //esta carpeta debe existir en el proyecto (raiz)
    },
    filename : (req,file,cb) => {
        console.log(file);//ver que trae el archivo
        cb(null, Date.now() + path.extname(file.originalname)); // segundos desde 1970 para que el valor de la imagen sea unico
    },
});

//const uploads = multer({storage:"storage"}); // si son iguales se puede escribir como solo 1 storage
const upload = multer({storage});

//controlador
const controller = require("../controllers/especialidades_medicas.controller");

//metodo get para todas las especialidades
router.get('/', controller.especialidadesMedicas);

//para una sola especialidad
router.get('/:id_especialidad', controller.especialidad);

//metodo post, para crear o actualizar
router.post('/', upload.single('imagenUrl'), controller.crearEspecialidad); //video multer hora 1:21:00

//metodo put, busca por id y actualizar
router.put('/:id_especialidad', controller.actualizarEspecialidad);

//metodo delete
router.delete('/:id_especialidad', controller.borrarEspecialidad);

//exportar las rutas(routers)
module.exports = router;
