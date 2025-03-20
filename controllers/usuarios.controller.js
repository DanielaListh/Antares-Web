const express = require('express');
const app  = express();
////const router = expres.Router();
const jwt = require ("jsonwebtoken");
const bcrypt = require("bcryptjs");
//const multer = require('multer');
const fs = require('fs'); // proporciona una API que interactua con archivos, puede renombrar archivos, leerlos, darles nombre, eliminarlos, etc.
const nodemailer = require('nodemailer');
const cors = require('cors');

app.use(express.json());
app.use(cors());

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

//configuracion de transporte de correo electronico, se utiliza variables de entorno para seguridad
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASS
    }
});


//POST crear un usuario REGISTRAR
const crearUsuario = async (req, res) => {
    try {
        console.log(req.file);//muestra los detalles del archibo que se ha subido

        let imagenUrl = req.file ? saveImage(req.file) : null;// si no se proporciona una img en la bbdd queda como null
        const { nombreUsuario, correoElectronico, password, fechaNacimiento, idGenero } = req.body;// datos traidas de req.body almacenados en las constantes
        const idRol = parseInt(req.body.idRol, 10);// pasamos el dato idRol de la bbdd a constante idRol 

        //utiliza la desestructuración de objetos de JavaScript para extraer varias propiedades del objeto 
        //req.body y almacenarlas en constantes separadas.Esto es muy útil para acceder directamente a estos 
        // valores sin tener que escribir req.body.nombreUsuario, req.body.correoElectronico, etc.

        const hash = bcrypt.hashSync(password, 8);//hace que el la bbdd se almacena la contraseña como un hash
        console.log(hash);

        // Insertar usuario en la base de datos
        const sql = "INSERT INTO usuarios (nombre_usuario, correo_electronico, password, fecha_nacimiento, id_rol, imagen_perfil_usuario, id_genero, es_borrado) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        const [result] = await db.promise().query(sql, [nombreUsuario, correoElectronico, hash, fechaNacimiento, idRol, imagenUrl, idGenero, false]);
        //es una consulta a la base de datos usando un método que retorna una promesa.
        //En JavaScript, usar corchetes[] con const es una técnica conocida como desestructuración de arrays. Permite extraer valores de 
        // un array y asignarlos a variables individuales de una manera más concisa y legible.
        //Valor de result: Generalmente, query retorna un array donde el primer elemento es el conjunto de filas que coinciden con la consulta 
        // SQL. Por lo tanto, result contendrá ese conjunto de filas.

        const idUsuario = result.insertId;// el resultado de la consulta trae el id de la fila insertada
        const tareas = [];//array vacio

        if (idRol === 2) {
            tareas.push(db.promise().query("INSERT INTO medicos (id_usuario, codigo_medico, biografia_medico) VALUES (?, 'none', 'none')", [idUsuario]));
            // ejemplo de manejo de resolve inplicitamente
            //las llamadas a db.promise().query(...) retornan promesas. Cuando estas consultas se completan exitosamente, las promesas se 
            // resuelven, es decir, se llama a resolve internamente dentro de la implementación de la función query.
        }

        if (idRol === 3) {
            tareas.push(db.promise().query("INSERT INTO administradores (id_usuario, permisos, estado_conexion, ultima_conexion) VALUES (?, 'none', ?, ?)", [idUsuario, 0, new Date()])); //estado_conexion se establecerá en 0, que es el equivalente a false en MySQL.
            //tareas.push(...): El resultado de la consulta (que es una promesa) se añade al final del array tareas utilizando el método push(). 
            // Esto significa que tareas ahora contiene una promesa que se resolverá cuando la consulta a la base de datos se complete.
        }


        // Esperar a que todas las tareas terminen de cumplir
        await Promise.all(tareas);

        // Generar token JWT
        const token = jwt.sign({ id: idUsuario }, process.env.SECRET_KEY, { expiresIn: "1h" });
        //Cuando jwt.sign(...) genera el token exitosamente, la operación se considera resuelta tambien.

        // Configurar opciones del correo
        const mailOptions = {
            from: 'tuemail@ejemplo.com',
            to: correoElectronico,
            subject: 'Bienvenido a la plataforma',
            text: `Hola ${nombreUsuario}, tu cuenta ha sido creada exitosamente.`
        };

        // Enviar correo
        await transporter.sendMail(mailOptions);
        //retorna una promesa que se RESUELVE cuando el correo se envía exitosamente.

        res.status(201).json({
            userCreado: { id: idUsuario, ...req.body },
            token,
            necesitaEspecialidad: idRol === 2
        });

    } catch (error) {
        console.error('Error en la creación del usuario:', error);
        res.status(500).json({ error: "Error al crear el usuario" });
    }
    // El bloque catch en tu función async maneja cualquier error que ocurra en las operaciones anteriores. 
    // Si cualquiera de las promesas se RECHAZA, se lanzará un error y se ejecutará el bloque catch, 
    // manejando el REJECT de esas promesas.
};




//POST login
const loginUsuario = async (req, res) => {

    console.log("Datos recibidos desde el frontend: ", req.body);

    if(!req.body || !req.body.correoElectronico || !req.body.password){ // si el req.body es distinto del recibido con email o password
        //significa que no estan llegando los datos al backend desde el fronted
        return res.status(400).json({error: "Respuesta del backend: Correo electronico y contraseña son requeridos"});
    }


    try {
        let { correoElectronico, password } = req.body;

        correoElectronico = correoElectronico.trim();// trim elimina espacios en blancos antes y despues

        console.log("Correo recibido:", correoElectronico); // Depuración


        // Consulta a la base de datos para encontrar al usuario por el correo electronico
        const sql = "SELECT id_usuario, nombre_usuario, correo_electronico, password, id_rol FROM usuarios WHERE LOWER(correo_electronico) = LOWER(?)";
        const [results] = await db.promise().query(sql, [correoElectronico]);

        console.log("Resultado de consulta: ", results);//depuracion
     
            //si no hay error
            if (results.length === 0) { // si la longitud del resultado es igual a 0 significa que no encontro nada
                console.log("Usuario no encontrado en la bbdd");
                return res.status(404).send("Usuario no encontrado");
                }
                const user = results[0];

            // Verificar la contraseña
            const passwordIsValid = bcrypt.compareSync(password, user.password); //se utiliza compareSync para verificar la password
            if (!passwordIsValid) { // si es falso
                //return res.status(401).send({ auth: false, token: null });
                return res.status(401).json({error: "Credenciales invalidas"});
            }

            // Generar el token JWT con id y rol
            const token = jwt.sign(
                { id: user.id_usuario, idRol:user.id_rol }, 
                process.env.SECRET_KEY, 
                { expiresIn: "1h"}
            );

            console.log("respuesta enviada al front: ", {token, user});
            
            //res.json({token, user});// se debe enviar solo una respuesta

            res.status(200).json({ // ENVIO DE RESPUESTA UNICA
                 token,
                 user: {
                    id_usuario: user.id_usuario,
                    nombre_usuario: user.nombreUsuario,
                    id_rol: user.id_rol
                 }
                });
    }
    catch(error) {
        console.error("Error en el Login: ", error);
        res.status(500).json({ error: "Error al inicioar sesion"});
    }
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


// Obtener el perfil del usuario autenticado GET, mas adelante
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
    const { nombreUsuario, correoElectronico, password, fechaNacimiento, idRol, idGenero } = req.body; // Obtener los datos del cuerpo de la solicitud
     //antes nuevoRol
    // Hashear la contraseña antes de guardarla
    const hash = bcrypt.hashSync(password, 8); // hash sincronico, que hace calculos mat del password
    console.log(hash); //ver el hash por la console


    const sql = "UPDATE usuarios SET nombre_usuario = ?, correo_electronico = ?, password = ?, fecha_nacimiento = ?, id_rol = ?, imagen_perfil_usuario = ?, id_genero = ? WHERE id_usuario = ?";
    db.query(sql, [nombreUsuario, correoElectronico, hash, fechaNacimiento, idRol, imagenUrl, idGenero, idUsuario], (error, result) => {
        if (error) {
            console.log("Error al intentar actualizar el usuario en la tabla Usuarios:", error);
            return res.status(500).json({ error: `Error al actualizar el usuario ${idUsuario}` });
        }
        // como estaba dando dos respuestas al metodo me crasheaba el server, tenia dos res.status para la misma funcion
        //res.status(200).json({ message: "El usuario se ha actualizado correctamente" });

        // Obtener el usuario actualizado, pero mostrando el rol
        const sqlSelect = "SELECT * FROM usuarios WHERE id_usuario = ?";
        db.query(sqlSelect, [idUsuario], (error, result) => {
            if (error) {
                return res.status(500).json({ error: "Error: intente más tarde" });
            }
            const userActualizado = result[0]; // Mostrar el id_rol en la respuesta
            res.status(200).json({ message: "El usuario se ha actualizado correctamente", user: userActualizado });
        });
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