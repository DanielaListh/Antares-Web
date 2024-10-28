const jwt = require ("jsonwebtoken");
const bcrypt = require("bcryptjs");

//controladores del modulo, accede a la base de datos
const db = require("../db/db");

//, genero_usuario, imagen_perfil_usuario
//post crear un usuario REGISTRAR
const crearUsuario = (req, res) => {
    const { nombreUsuario, correoElectronico, password, fechaNacimiento, idRol, generoUsuario, imagenPerfilUsuario } = req.body;

    // Hashear la contraseña antes de guardarla
    const hash = bcrypt.hashSync(password, 8); // hash sincronico, que hace calculos mat del password
    console.log(hash); //ver el hash por la console

    const sql = "INSERT INTO usuarios (nombre_usuario, correo_electronico, password, fecha_nacimiento, id_rol, genero_usuario, imagen_perfil_usuario) VALUES (?, ?, ?, ?, ?, ?, ?)";
    db.query(sql, [nombreUsuario, correoElectronico, hash, fechaNacimiento, idRol, generoUsuario, imagenPerfilUsuario], (error, result) => {
        if (error) {
            console.log('Error al insertar en la base de datos:', error);
            return res.status(500).json({ error: "Error: intente más tarde" });
        }
        if(idRol===2){
            const idUsuario = result.insertId;
            const sqlMedico = "INSERT INTO medicos (id_usuario, codigo_medico, biografia_medico) VALUES (?, 'none', 'none')";

            db.query(sqlMedico,[idUsuario], (errorMedico) => {
                if(errorMedico){
                    return res.status(500).json({error:"Error al crear datos del medico"});
                }
            });
        }
        //si no hay error se procede a general el token JWT
        const token = jwt.sign(
            { id: result.insertId },
            process.env.SECRET_KEY,  // esta en mis variables de entorno .env
            { expiresIn: "1h" } //expira en una hora el token
        );
        const userCreado = { ...req.body, id: result.insertId };
        res.status(201).json({ userCreado, token }); // Devuelve el usuario creado y el token
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



//metodos get para obtener todos los usuarios
const obtenerUsuarios = (req,res) => { // falta el req
    const sql = "SELECT * FROM usuarios";
    db.query(sql,(error,rows) => {
        if(error){ // si hay un error que retorne cual es el error
            return res.status(500).json({error : "Error: intente mas tarde"});
        }
        res.json(rows);// si no hay error que devuelva las filas
    });
};


//controlador para obtener un usuario
const obtenerUsuario = (req,res) => { //aqui le falto al profe el req y res
    const {id_usuario} = req.params; // aqui el profe coloco id_peliculas, pero a mi no me hizo falta
    const sql = "SELECT * FROM usuarios WHERE id_usuario = ?"; // se deja el ? para evitar inyeccciones externas
    db.query(sql,[id_usuario],(error,rows) => {
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


// Obtener el perfil del usuario autenticado
const obtenerPerfilUsuario = (req, res) => {
    const { id } = req.user; // Suponiendo que el ID del usuario autenticado está en req.user
    const sql = "SELECT * FROM usuarios WHERE id = ?";
    db.query(sql, [id], (error, result) => {
        if (error) {
            console.error('Error al consultar la base de datos:', error);
            return res.status(500).json({ error: "Error: intente más tarde" });
        }
        if (result.length === 0) {
            return res.status(404).send("Usuario no encontrado");
        }
        res.status(200).json(result[0]);
    });
};


//metodo o controlador PUT, actualiza con put un usuario por medio del id
const actualizarUsuario= (req,res) => {
    const {idUsuario} = req.params; // me pide que requiera el id como parametro
    const {nombreUsuario, correoElectronico, password, fechaNacimiento} = req.body;// le mandamos body de los datos a modificar
    const sql="UPDATE usuarios SET nombre_usuario = ?, correo_electronico = ?, password = ?, fecha_nacimiento = ?, genero_usuario = ?, imagen_perfil_usuario = ?  WHERE id_usuario = ?";
    db.query(sql,[nombreUsuario, correoElectronico, password, fechaNacimiento, generoUsuario, imagenPerfilUsuario, idUsuario],(error,result) => {
        console.log(result);
        if(error){ // si hay un error que retorne cual es el error
            return res.status(500).json({error : "Error: intente mas tarde"});
        }
        if(result.affectedRows == 0){
            return res.status(404).send({error : "Error: el usuario a modificar no existe"})
        }

        // obtener el usuario actualizado, pero mostrando el rol, ya que no quiero que el rol se cambie
        const sqlSelect = "SELECT * FROM usuarios WHERE id_usuario = ?";
        db.query(sqlSelect, [idUsuario], (errorSelect, resultSelect) => {
            if(errorSelect){
                return res.status(500).json({error : "Error: intente mas tarde"});
            }
            const userActualizado = resultSelect[0]; // ayuda a mostrar el id_rol en la respuesta
            res.json(userActualizado);// se muestra el elemento que existe
        })

        //const userActualizado = {...req.body, ...req.params}; // reconstruir el objeto body y los perametros que trae
        //res.json(userActualizado);// se muestra el elemento que existe
    });
};


//modulo borrar usuario
const eliminarUsuario = (req, res) => {
    const { idUsuario } = req.params;
    const sql = "DELETE FROM usuarios WHERE id_usuario = ?";
    db.query(sql, [idUsuario], (error, result) => {
        if (error) {
            console.error('Error al eliminar el usuario:', error);
            return res.status(500).json({ error: "Error: intente más tarde" });
        }
        res.status(200).json({ message: "Usuario eliminado correctamente" });
    });
};

//exportar las funciones del modulo
module.exports = {
    crearUsuario,
    loginUsuario,
    obtenerUsuarios,
    obtenerUsuario,
    obtenerPerfilUsuario,
    actualizarUsuario,
    eliminarUsuario,
};