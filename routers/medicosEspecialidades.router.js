//rutas del modulo
const express = require('express'); // traiga el modulo de expres
const router = express.Router(); // que use la funcion de rutas

//controlador
const controller = require("../controllers/medicosEspecialidades.controller");

//metodo get para todas los medicos
router.get('/', controller.obtenerMedicosEspecialidades);

//para un solo medico
router.get('/:idMedicoEspecialidad', controller.obtenerMedicosEspecialidad);

//metodo post, para crear o actualizar
router.post('/', controller.crearMedicoEspecialidad);

//metodo put, busca por id y actualizar
router.put('/:idMedicoEspecialidad', controller.actualizarMedicoEspecialidad);

//metodo delete
router.delete('/:idMedicoEspecialidad', controller.borrarMedicoEspecialidad);

//exportar las rutas(routers)
module.exports = router;
