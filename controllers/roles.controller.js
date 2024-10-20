//controladores del modulo
const db = require("../db/db");

//metodos get para todos los roles
const obtenerRoles = (req,res) => { // falta el req
    const sql = "SELECT * FROM roles";
    db.query(sql,(error,rows) => {
        if(error){ // si hay un error que retorne cual es el error
            return res.status(500).json({error : "Error: intente mas tarde"});
        }
        res.json(rows);// si no hay error que devuelva las filas
    });
};


//controlador para un rol
const obtenerRol = (req,res) => { //aqui le falto al profe el req y res
    const {id_rol} = req.params; // aqui el profe coloco id_peliculas, pero a mi no me hizo falta
    const sql = "SELECT * FROM roles WHERE id_rol = ?"; // se deja el ? para evitar inyeccciones externas
    db.query(sql,[id_rol],(error,rows) => {
        console.log(rows);
        if(error){ // si hay un error que retorne cual es el error
            return res.status(500).json({error : "Error: intente mas tarde"});
        }
        if(rows.length == 0){ // si las filas modificadas son cero significa que no encontro nada
            return res.status(404).send({error : "error: No existe el rol buscado"});
        };
        res.json(rows[0]);// si no hay error que devuelva las filas, []muestra el elemento en esa posicion
    });
};

//post
const crearRol = (req,res) => {
    const {nombreRol,descripcionRol} = req.body;// le mandamos a crear el body
    const sql = "INSERT INTO roles (nombre_rol, descripcion_rol) VALUES(?,?)";
    db.query(sql,[nombreRol,descripcionRol],(error,result) => {
        console.log(result);
        if(error){ // si hay un error que retorne cual es el error
            return res.status(500).json({error : "Error: intente mas tarde"});
        }
        const rolCreado = {...req.body, id: result.insertId}; // reconstruir el objeto body
        res.status(201).json(rolCreado); // muestra el creado con exito
    });
    //campos de la tabla especialidades_medicas
    //nombreEspecialidadMedica
    //descripcion
    //fechaAltaEspecialidad // la he quitado porque quiero que por default la fecha sea automatica
};


//metodo o controlador put
const actualizarRol= (req,res) => {
    const {id_rol} = req.params; // me pide que requiera el id como parametro
    const {nombreRol,descripcionRol} = req.body;// le mandamos body de los datos a modificar
    const sql="UPDATE roles SET nombre_rol = ?, descripcion_rol = ?  WHERE id_rol = ?";
    db.query(sql,[nombreRol,descripcionRol, id_rol],(error,result) => {
        console.log(result);
        if(error){ // si hay un error que retorne cual es el error
            return res.status(500).json({error : "Error: intente mas tarde"});
        }
        if(result.affectedRows == 0){
            return res.status(404).send({error : "Error: el rol a modificar no existe"})
        }
        const RolActualizado = {...req.body, ...req.params}; // reconstruir el objeto body y los perametros que trae
        res.json(RolActualizado);// se muestra el elemento que existe
       
    });

};


//modulo borrar
const borrarRol = (req,res) => {
    const{id_rol} = req.params;
    const sql ="DELETE FROM roles WHERE id_rol = ?";
    db.query(sql,[id_rol], (error,result) => {
        console.log(result);
        if(error){
            return res.status(500).json({error : "Error: intente mas tarde"});
        }
        if(result.affectedRows == 0){ // si no hay ninguna fila afectada es un error
            return res.status(404).send({error : "Error: la especialidad medica a eliminar no existe "});
        };
        res.json({mensaje : "Rol eliminado correctamente"});
    });
};

//exportar las funciones del modulo
module.exports = {
    obtenerRoles,
    obtenerRol,
    crearRol,
    actualizarRol,
    borrarRol,
};