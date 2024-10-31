//rutas del modulo
const express = require('express'); // traiga el modulo de expres
const router = express.Router(); // que use la funcion de rutas

//controlador
const controller = require("../controllers/generos.controller");

//metodo get para todas los generos
router.get('/', controller.obtenerGeneros);

//para un solo rol
router.get('/:id_genero', controller.obtenerGenero);

//metodo post, para crear o actualizar
router.post('/', controller.crearGenero);

//metodo put, busca por id y actualizar
router.put('/:id_genero', controller.actualizarGenero);

//metodo delete
router.delete('/:id_genero', controller.borrarGenero);

//exportar las rutas(routers)
module.exports = router;
