//rutas del modulo
const express = require('express'); // traiga el modulo de expres
const router = express.Router(); // usa la funcion de rutas
const controller = require("../controllers/usuarios.controller"); // trae el modulo de controller usuarios
const usuariosMiddleware = require("../middleware/usuarios.middleware");


//ruta para crear un nuevo usuaerio
router.post('/register', controller.crearUsuario);// el profe lo nombro como register

//ruta para iniciar sesion
router.post('/login', controller.loginUsuario)

//ruta protejida de ejemplo
router.get("/protected", usuariosMiddleware, (req, res) => {
    res.status(200).send(`Hola Usuario ${req.userName}`); //es la respuesta sin errores del middleware
});

//ruta para encontrar los usuarios registrados
router.get('/', usuariosMiddleware, controller.obtenerUsuarios);

// ruta para ver info de un solo usuario
router.get('/:id_usuario', usuariosMiddleware, controller.obtenerUsuario);

//para obtener el perfil del usuario actual (apto para los egolatras)
router.get('/me', usuariosMiddleware, controller.obtenerPerfilUsuario);


//metodo put, busca por id y actualizar
router.put('/:id_usuario', usuariosMiddleware, controller.actualizarUsuario);

//metodo delete
router.delete('/:id_usuario', usuariosMiddleware, controller.eliminarUsuario);


//exportar las rutas(routers)
module.exports = router;