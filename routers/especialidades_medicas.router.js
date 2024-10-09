//rutas del modulo
const express = require('express'); // traiga el modulo de expres
const router = express.Router(); // que use la funcion de rutas

//controlador
const controller = require("../controllers/especialidades_medicas.controller");

//metodo get para todas las especialidades
router.get('/', controller.especialidadesMedicas);

//para una sola especialidad
router.get('/:id_especialidad', controller.especialidad);

//metodo post, para crear o actualizar
router.post('/', controller.crearEspecialidad);

//metodo put, busca por id y actualizar
router.put('/:id_especialidad', controller.actualizarEspecialidad);

//metodo delete
router.delete('/:id_especialidad', controller.borrarEspecialidad);

//exportar las rutas(routers)
module.exports = router;
