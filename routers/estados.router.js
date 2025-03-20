//rutas del modulo
const express = require('express'); // traiga el modulo de expres
const router = express.Router(); // que use la funcion de rutas

//controlador
const controller = require("../controllers/estados.controller");

//metodo get para todas los roles
router.get('/', controller.obtenerEstados);

//para un solo rol
router.get('/:idEstado', controller.obtenerEstado);

//metodo post, para crear o actualizar
router.post('/', controller.crearEstado);

//metodo put, busca por id y actualizar
router.put('/:idEstado', controller.actualizarEstado);

//metodo delete
router.delete('/:idEstado', controller.borrarEstado);

//exportar las rutas(routers)
module.exports = router;