//rutas del modulo
const express = require('express'); // traiga el modulo de expres
const router = express.Router(); // que use la funcion de rutas

//controlador
const controller = require("../controllers/medicos.controller");

//metodo get para todas los medicos
router.get('/', controller.obtenerMedicos);

//para un solo medico
router.get('/:id_usuario', controller.obtenerMedico);

//metodo post, para crear o actualizar
router.post('/', controller.crearDatosMedico);

//metodo put, busca por id y actualizar
router.put('/:id_usuario', controller.actualizarDatosMedico);

//metodo delete
router.delete('/:id_usuario', controller.borrarDatosMedico);

//exportar las rutas(routers)
module.exports = router;
