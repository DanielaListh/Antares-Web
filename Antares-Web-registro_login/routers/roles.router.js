//rutas del modulo
const express = require('express'); // traiga el modulo de expres
const router = express.Router(); // que use la funcion de rutas

//controlador
const controller = require("../controllers/roles.controller");

//metodo get para todas los roles
router.get('/', controller.obtenerRoles);

//para un solo rol
router.get('/:id_rol', controller.obtenerRol);

//metodo post, para crear o actualizar
router.post('/', controller.crearRol);

//metodo put, busca por id y actualizar
router.put('/:id_rol', controller.actualizarRol);

//metodo delete
router.delete('/:id_rol', controller.borrarRol);

//exportar las rutas(routers)
module.exports = router;