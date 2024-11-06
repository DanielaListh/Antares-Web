const jwt = require ("jsonwebtoken");
const bcrypt = require("bcryptjs");
const fs = require('fs'); // proporciona una API que interactua con archivos, puede renombrar archivos, leerlos, darles nombre, eliminarlos, etc.

//controladores del modulo, accede a la base de datos
const db = require("../db/db");
const { error } = require("console");
const { hash } = require("crypto");

//guardar la img en ruta
function saveImage(file) {
    const newPath = `./uploads/${file.originalname}`;
    fs.renameSync(file.path, newPath);// con fs lo renombro
    return newPath; // retorna la nueva ruta
}

//POST crear un usuario REGISTRAR
const crearUsuario = (req, res) => {
    console.log(req.file); // mostrar en consola el archivo enviado a la api
    if (!req.file) {
        return res.status(400).send('No se subió ningún archivo');
    }
    const imagenUrl = saveImage(req.file); // la imagen guardada se va a la constante imagenUrl
    const { nombreUsuario, correoElectronico, password, fechaNacimiento, idRol, idGenero } = req.body; // lo que el body requiere

    // Hashear la contraseña antes de guardarla
    const hash = bcrypt.hashSync(password, 8); // hash sincronico, que hace calculos mat del password
    console.log(hash); //ver el hash por la console

    const sql = "INSERT INTO usuarios (nombre_usuario, correo_electronico, password, fecha_nacimiento, id_rol, imagen_perfil_usuario, id_genero, es_borrado) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    db.query(sql, [nombreUsuario, correoElectronico, hash, fechaNacimiento, idRol, imagenUrl, idGenero, false], (error, result) => {
        if (error) {
            console.log('Error al insertar en la base de datos:', error);
            return res.status(500).json({ error: "Error: intente más tarde" });
        }
        const idUsuario = result.insertId;// el resultado se inserta con el id creado de la query y se guarda en  idUsuario

        // al crear un usuario con el rol 2 creamos automaticamente en la tabla medicos y dejamos por default los demas valores
        if(idRol == 2){ // es para que se vea el rol de los medicos
            const sqlMedico = "INSERT INTO medicos (id_usuario, codigo_medico, biografia_medico) VALUES (?, 'none', 'none')"; // se deja none como valor por default
            db.query(sqlMedico,[idUsuario], (errorMedico) => {
                if(errorMedico){
                    console.log('Error al insertar en la tabla medicos:', errorMedico);
                    return res.status(500).json({error:"Error al crear datos del medico"});
                }
            });
        }
        //si no hay error se procede a general el token JWT y definimos si necesita completar el form de medico
        const token = jwt.sign(
            { id: idUsuario },
            process.env.SECRET_KEY,  // esta en mis variables de entorno .env
            { expiresIn: "1h" } //expira en una hora el token
        );

        const userCreado = { ...req.body, id: result.insertId };
        const necesitaEspecialidad = (idRol == 2); // Si es médico, necesita especialidad
        // Si no es médico, pasa de largo
        res.status(201).json({ userCreado, token, necesitaEspecialidad});
    });
};


//POST login
const loginUsuario = (req, res) => {
    const { correoElectronico, password } = req.body;

    // Consulta a la base de datos para encontrar al usuario por el correo electronico
    const sql = "SELECT * FROM usuarios WHERE correo_electronico = ?";
    db.query(sql, [correoElectronico], (error, results) => {
        if (error) {
            console.error('Error al consultar la base de datos:', error);
            return res.status(500).json({ error: "Error: intente más tarde" });
        }
        //si no hay error
        if (results.length === 0) { // si la longitud del resultado es igual a 0 significa que no encontro nada
            return res.status(404).send("Usuario no encontrado");
        }

        const user = results[0];

        // Verificar la contraseña
        const passwordIsValid = bcrypt.compareSync(password, user.password); //se utiliza compareSync para verificar la password
        if (!passwordIsValid) { // si es falso
            return res.status(401).send({ auth: false, token: null });
        }

        // Generar el token JWT
        const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
            expiresIn: "1h"
        });

        res.status(200).json({ auth: true, token });
    });
};



//metodos get para obtener todos los usuarios GET
const obtenerUsuarios = (req,res) => { // falta el req
    const sql = "SELECT * FROM usuarios";
    db.query(sql,(error,rows) => {
        if(error){ // si hay un error que retorne cual es el error
            return res.status(500).json({error : "Error: intente mas tarde"});
        }
        res.json(rows);// si no hay error que devuelva las filas
    });
};


//controlador para obtener un usuario GET
const obtenerUsuario = (req,res) => { //aqui le falto al profe el req y res
    const {idUsuario} = req.params; // aqui el profe coloco id_peliculas, pero a mi no me hizo falta
    const sql = "SELECT * FROM usuarios WHERE id_usuario = ?"; // se deja el ? para evitar inyeccciones externas
    db.query(sql,[idUsuario],(error,rows) => {
        console.log(rows);
        if(error){ // si hay un error que retorne cual es el error
            return res.status(500).json({error : "Error: intente mas tarde"});
        }
        if(rows.length == 0){ // si las filas modificadas son cero significa que no encontro nada
            return res.status(404).send({error : "error: No existe el usuario buscado"});
        };
        res.json(rows[0]);// si no hay error que devuelva las filas, []muestra el elemento en esa posicion
    });
};


// Obtener el perfil del usuario autenticado GET
//const obtenerPerfilUsuario = (req, res) => {
   // const {idUsuario} = req.user; // Suponiendo que el ID del usuario autenticado está en req.user
   // const sql = "SELECT * FROM usuarios WHERE id_usuario = ?";
    //db.query(sql, [idUsuario], (error, result) => {
    //    if (error) {
    //        console.error('Error al consultar la base de datos:', error);
    //        return res.status(500).json({ error: "Error: intente más tarde" });
    //    }
    //    if (result.length === 0) {
    //        return res.status(404).send("Usuario no encontrado");
    //    }
    //    res.status(200).json(result[0]);
    //});
//};


//metodo o controlador PUT, actualiza con put un usuario por medio del id
const actualizarUsuario = (req, res) => {
    console.log(req.file); // Mostrar los datos en la consola o terminal
    if (!req.file) {
        return res.status(400).send('No se subió ningún archivo');
    }

    const imagenUrl = saveImage(req.file); // Guardar la imagen subida y almacenar la URL en imagenUrl
    const { idUsuario } = req.params; // Obtener el id del usuario como parámetro para buscar el registro a actualizar
    const { nombreUsuario, correoElectronico, password, fechaNacimiento, nuevoRol, idGenero } = req.body; // Obtener los datos del cuerpo de la solicitud

    // Hashear la contraseña antes de guardarla
    const hash = bcrypt.hashSync(password, 8); // hash sincronico, que hace calculos mat del password
    console.log(hash); //ver el hash por la console

    // Obtener el rol actual del idUsuario
    const sqlBuscarUsuario = "SELECT id_rol FROM usuarios WHERE id_usuario = ?";
    db.query(sqlBuscarUsuario, [idUsuario], (error, result) => {
        if (error) {
            console.log("Error al buscar el usuario:", error);
            return res.status(500).json({ error: "Error de sintaxis, intente más tarde" });
        }
        if (result.length === 0) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }
        // si encuentra el rol lo guarda en idRolActual
        const idRolActual = result[0].id_rol;
        console.log(idRolActual); // lo imprime en consola

        // Si el rol actual es 2 y el nuevo rol es diferente, eliminamos los registros en las tablas medicos y medicos_especialidades
        // comparacion entre el valor del rol actual y el valor del rol que se busca actualizar
        if (idRolActual == 2 && nuevoRol != 2) {// aqui los registros relacionados seran eliminados automaticamente debido a on delete cascade
            // si el rol es dos procedemos a eliminar los registros en medicos y medicos_especialidades, pero esto se hace automatico
            // Actualizamos el rol y los demás campos del usuario
            const sqlActualizarRol = "UPDATE usuarios SET nombre_usuario = ?, correo_electronico = ?, password = ?, fecha_nacimiento = ?, id_rol = ?, imagen_perfil_usuario = ?, id_genero = ? WHERE id_usuario = ?";
            db.query(sqlActualizarRol, [nombreUsuario, correoElectronico, hash, fechaNacimiento, nuevoRol, imagenUrl, idGenero, idUsuario], (error, result) => {
                if (error) {
                    console.log("Error al intentar actualizar el usuario en la tabla Usuarios:", error);
                    return res.status(500).json({ error: "Error al actualizar el usuario A" });
                }
                res.status(200).json({ message: "El usuario se ha actualizado correctamente" });
            });
        } else {
            // Si el rol es 1 o 3, se actualiza el rol y los demás campos del usuario (por los momentos es asi ya que no tengo hecho la parte del admin ni la del paciente, luego sera mas esopecifico)
            const sqlActualizarUsuario = "UPDATE usuarios SET nombre_usuario = ?, correo_electronico = ?, password = ?, fecha_nacimiento = ?, id_rol = ?, imagen_perfil_usuario = ?, id_genero = ?  WHERE id_usuario = ?";
            db.query(sqlActualizarUsuario, [nombreUsuario, correoElectronico, hash, fechaNacimiento, nuevoRol, imagenUrl, idGenero, idUsuario], (error, result) => {
                if (error) {
                    console.log("Error al actualizar el usuario (el id no es 2):", error);
                    return res.status(500).json({ error: "Error: intente más tarde" });
                }
                if (result.affectedRows === 0) {
                    return res.status(404).send({ error: "Error: el usuario a modificar no existe" });
                }
                res.status(200).json({ message: "Rol del usuario ha sido actualizado correctamente" });

                // Obtener el usuario actualizado, pero mostrando el rol
                const sqlSelect = "SELECT * FROM usuarios WHERE id_usuario = ?";
                db.query(sqlSelect, [idUsuario], (error, result) => {
                    if (error) {
                        return res.status(500).json({ error: "Error: intente más tarde" });
                    }
                    const userActualizado = result[0]; // Mostrar el id_rol en la respuesta
                    res.json(userActualizado); // Mostrar el elemento que existe
                });
            });
        }
    });
};



//modulo borrar usuario
const eliminarUsuario = (req, res) => {
    const { idUsuario } = req.params; // captura el valor de la ruta y se almacena en idUsuario

    //buscamos al usuario para obtener el idRol
    const sqlBuscarUsuario = "SELECT id_rol FROM usuarios WHERE id_usuario = ?";
    db.query(sqlBuscarUsuario, [idUsuario], (error, result) => {
        if (error) {
            console.error('Error al buscar el usuario:', error);
            return res.status(500).json({ error: "Error: intente más tarde" }); // imprime en result del postman 
        }

        if (result.length === 0) { // si el largo del resultado es 0 (no encontro nada)
            return res.status(404).json({ error: "Usuario no encontrado" }); // entonces no encontro el user
        }

        const idRol = result[0].id_rol; //el result encuentra en la bbdd el objeto 1 de fila id_rol(bbdd) y toma su valor, y es ahora la const idRol
        
        //si el rol es 2, eliminamos de medicos primero
        if (idRol == 2) {
            const sqlEliminarMedicoEspecialidades = "DELETE FROM medicos_especialidades WHERE id_usuario = ?";
            db.query(sqlEliminarMedicoEspecialidades, [idUsuario], (errorMedicoEsp) => {
                if (errorMedicoEsp) {
                    console.error('Error al eliminar el médico de especialidades:', errorMedicoEsp);
                    return res.status(500).json({ error: "Error: intente más tarde" });
                }

            const sqlEliminarMedico = "DELETE FROM medicos WHERE id_usuario = ?";
            db.query(sqlEliminarMedico, [idUsuario], (errorMedico) => {
                if (errorMedico) {
                    console.error('Error al eliminar el médico:', errorMedico);
                    return res.status(500).json({ error: "Error: intente más tarde" });
                }

                //luego eliminamos el usuario
                const sqlEliminarUsuario = "DELETE FROM usuarios WHERE id_usuario = ?";
                db.query(sqlEliminarUsuario, [idUsuario], (errorUsuario, resultUsuario) => {
                    if (errorUsuario) {
                        console.error('Error al eliminar el usuario:', errorUsuario);
                        return res.status(500).json({ error: "Error: intente más tarde" });
                    }
                    res.status(200).json({ message: "Usuario, médico y su/s especialidad/es fueron eliminados correctamente" });
                });
            });

        });

        } else {
            //si el rol no es 2, solo eliminamos el usuario
            const sqlEliminarUsuario = "DELETE FROM usuarios WHERE id_usuario = ?";
            db.query(sqlEliminarUsuario, [idUsuario], (errorUsuario, resultUsuario) => {
                if (errorUsuario) {
                    console.error('Error al eliminar el usuario:', errorUsuario);
                    return res.status(500).json({ error: "Error: intente más tarde" });
                }
                res.status(200).json({ message: "Usuario eliminado correctamente" });
            });
        }
    });
};


//exportar las funciones del modulo
module.exports = {
    crearUsuario,
    loginUsuario,
    obtenerUsuarios,
    obtenerUsuario,
    //obtenerPerfilUsuario,
    actualizarUsuario,
    eliminarUsuario,
};