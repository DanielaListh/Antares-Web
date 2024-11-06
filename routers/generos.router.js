//rutas del modulo
const express = require('express'); // traiga el modulo de expres
const router = express.Router(); // que use la funcion de rutas

//controlador
const controller = require("../controllers/generos.controller");

//metodo get para todas los generos
router.get('/', controller.obtenerGeneros);

//para un solo rol
router.get('/:idGenero', controller.obtenerGenero);

//metodo post, para crear o actualizar
router.post('/', controller.crearGenero);

//metodo put, busca por id y actualizar
router.put('/:idGenero', controller.actualizarGenero);

//metodo delete
router.delete('/:idGenero', controller.borrarGenero);

//exportar las rutas(routers)
module.exports = router;
