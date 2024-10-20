//controladores del modulo
const db = require("../db/db");

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

//post crea un usuario
const crearUsuario = (req,res) => {
    const {nombreUsuario, apellidoUsuario, correoElectronico, password, documentoIdentidad, numeroTelefono, fechaNacimiento, sexoUsuario, idRol} = req.body;// le mandamos a crear el body
    const sql = "INSERT INTO usuarios (nombre_usuario, apellido_usuario, correo_electronico, password, documento_identidad, numero_telefono, fecha_nacimiento, sexo_usuario, id_rol) VALUES(?,?,?,?,?,?,?,?,?)";
    db.query(sql,[nombreUsuario, apellidoUsuario, correoElectronico, password, documentoIdentidad, numeroTelefono, fechaNacimiento, sexoUsuario, idRol],(error,result) => {
        console.log(result);
        if(error){ // si hay un error que retorne cual es el error
            return res.status(500).json({error : "Error: intente mas tarde"});
        }
        const userCreado = {...req.body, id: result.insertId}; // reconstruir el objeto body
        res.status(201).json(userCreado); // muestra el creado con exito
    });

    //fecha_alta_sistema // la he quitado porque quiero que por default la fecha sea automatica cuando se cree
};


//metodo o controlador put, actualiza con put un usuario por medio del id
const actualizarUsuario= (req,res) => {
    const {id_usuario} = req.params; // me pide que requiera el id como parametro
    const {nombreUsuario, apellidoUsuario, correoElectronico, password, documentoIdentidad, numeroTelefono, fechaNacimiento, sexoUsuario} = req.body;// le mandamos body de los datos a modificar
    const sql="UPDATE usuarios SET nombre_usuario = ?, apellido_usuario = ?, correo_electronico = ?, password = ?, documento_identidad = ?, numero_telefono = ?, fecha_nacimiento = ?, sexo_usuario = ?  WHERE id_usuario = ?";
    db.query(sql,[nombreUsuario, apellidoUsuario, correoElectronico, password, documentoIdentidad, numeroTelefono, fechaNacimiento, sexoUsuario, id_usuario],(error,result) => {
        console.log(result);
        if(error){ // si hay un error que retorne cual es el error
            return res.status(500).json({error : "Error: intente mas tarde"});
        }
        if(result.affectedRows == 0){
            return res.status(404).send({error : "Error: el usuario a modificar no existe"})
        }

        // obtener el usuario actualizado, pero mostrando el rol
        const sqlSelect = "SELECT * FROM usuarios WHERE id_usuario = ?";
        db.query(sqlSelect, [id_usuario], (errorSelect, resultSelect) => {
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


//modulo borrar
const borrarUsuario = (req,res) => {
    const{id_usuario} = req.params;
    const sql ="DELETE FROM usuarios WHERE id_usuario = ?";
    db.query(sql,[id_usuario], (error,result) => {
        console.log(result);
        if(error){
            return res.status(500).json({error : "Error: intente mas tarde"});
        }
        if(result.affectedRows == 0){ // si no hay ninguna fila afectada es un error
            return res.status(404).send({error : "Error: El usuario a eliminar no existe "});
        };
        res.json({mensaje : "usuario eliminado correctamente"});
    });
};

//exportar las funciones del modulo
module.exports = {
    obtenerUsuarios,
    obtenerUsuario,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario,
};