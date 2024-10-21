//controladores del modulo
const db = require("../db/db");

//metodos get para todos los registros
const obtenerRegistros = (req,res) => { // falta el req
    const sql = "SELECT * FROM registros";
    db.query(sql,(error,rows) => {
        if(error){ // si hay un error que retorne cual es el error
            return res.status(500).json({error : "Error: intente mas tarde"});
        }
        res.json(rows);// si no hay error que devuelva las filas
    });
};


//controlador para un registro
const obtenerRegistro = (req,res) => { //aqui le falto al profe el req y res
    const {idRegistro} = req.params; // aqui el profe coloco id_peliculas, pero a mi no me hizo falta
    const sql = "SELECT * FROM registros WHERE id_registro = ?"; // se deja el ? para evitar inyeccciones externas
    db.query(sql,[idRegistro],(error,rows) => {
        console.log(rows);
        if(error){ // si hay un error que retorne cual es el error
            return res.status(500).json({error : "Error: intente mas tarde"});
        }
        if(rows.length == 0){ // si las filas modificadas son cero significa que no encontro nada
            return res.status(404).send({error : "error: No existe el registro buscado"});
        };
        res.json(rows[0]);// si no hay error que devuelva las filas, []muestra el elemento en esa posicion
    });
};

//post
const crearRegistro = (req,res) => {
    const {correoElectronico, password} = req.body;// le mandamos a crear el body
    const sql = "INSERT INTO registros (correo_electronico, password) VALUES(?,?)";
    db.query(sql,[correoElectronico,password],(error,result) => {
        console.log(result);
        if(error){ // si hay un error que retorne cual es el error
            return res.status(500).json({error : "Error: intente mas tarde"});
        }
        const registroCreado = {...req.body, id: result.insertId}; // reconstruir el objeto body
        res.status(201).json(registroCreado); // muestra el creado con exito
    });
};


//metodo o controlador put
const actualizarRegistro= (req,res) => {
    const {idRegistro} = req.params; // me pide que requiera el id como parametro
    const {correoElectronico, password} = req.body;// le mandamos body de los datos a modificar
    const sql="UPDATE registros SET correo_electronico = ?, password = ?  WHERE id_registro = ?";
    db.query(sql,[correoElectronico,password, idRegistro],(error,result) => {
        console.log(result);
        if(error){ // si hay un error que retorne cual es el error
            return res.status(500).json({error : "Error: intente mas tarde"});
        }
        if(result.affectedRows == 0){
            return res.status(404).send({error : "Error: el registro a modificar no existe"})
        }
        const registroModif = {...req.body, ...req.params}; // reconstruir el objeto body y los perametros que trae
        res.json(registroModif);// se muestra el elemento que existe
       
    });

};


//modulo borrar
const borrarRegistro = (req,res) => {
    const{idRegistro} = req.params;
    const sql ="DELETE FROM registros WHERE id_registro = ?";
    db.query(sql,[idRegistro], (error,result) => {
        console.log(result);
        if(error){
            return res.status(500).json({error : "Error: intente mas tarde"});
        }
        if(result.affectedRows == 0){ // si no hay ninguna fila afectada es un error
            return res.status(404).send({error : "Error: el registro a eliminar no existe "});
        };
        res.json({mensaje : "Registro eliminado correctamente"});
    });
};

//exportar las funciones del modulo
module.exports = {
    obtenerRegistros,
    obtenerRegistro,
    crearRegistro,
    actualizarRegistro,
    borrarRegistro,
};