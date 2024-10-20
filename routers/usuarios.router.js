//rutas del modulo
const express = require('express'); // traiga el modulo de expres
const router = express.Router(); // que use la funcion de rutas

//controlador
const controller = require("../controllers/usuarios.controller");

//metodo get para todas los roles
router.get('/', controller.obtenerUsuarios);

//para un solo rol
router.get('/:id_usuario', controller.obtenerUsuario);

//metodo post, para crear o actualizar
router.post('/', controller.crearUsuario);

//metodo put, busca por id y actualizar
router.put('/:id_usuario', controller.actualizarUsuario);

//metodo delete
router.delete('/:id_usuario', controller.borrarUsuario);

//exportar las rutas(routers)
module.exports = router;