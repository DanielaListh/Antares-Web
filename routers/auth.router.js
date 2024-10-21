//rutas del modulo
const express = require('express'); // traiga el modulo de expres
const router = express.Router(); // que use la funcion de rutas

//auth
const controller = require("../controllers/auth.controller");
const authMiddleware = require("../middleware/usuarios.middleware");

//metodo post, para crear o actualizar
router.post('/register', controller.crearRegistro);// el profe lo nombro como register
router.post('/login', controller.login)

//metodo get para todas los registros
router.get("/protected", authMiddleware, (req, res) => {
    res.status(200).send(`Hola Usuario ${req.userID}`);// NO SE QUE ES ESE USER ID, CAPAZ ES MI id_registro
});

//metodo put, busca por id y actualizar
router.put('/:id_registro', controller.actualizarRegistro); // editar correo o contraseña del registro

//metodo delete
router.delete('/:id_registro', controller.borrarRegistro); // eliminar un usuario?


//exportar las rutas(routers)
module.exports = router;