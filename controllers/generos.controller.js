//controladores del modulo
const db = require("../db/db");

//metodos get para todos los roles
const obtenerGeneros = (req,res) => { // falta el req
    const sql = "SELECT * FROM generos";
    db.query(sql,(error,rows) => {
        if(error){ // si hay un error que retorne cual es el error
            return res.status(500).json({error : "Error: intente mas tarde"});
        }
        res.json(rows);// si no hay error que devuelva las filas
    });
};


//controlador para un rol
const obtenerGenero = (req,res) => { //aqui le falto al profe el req y res
    const {id_genero} = req.params; // aqui el profe coloco id_peliculas, pero a mi no me hizo falta
    const sql = "SELECT * FROM generos WHERE id_rol = ?"; // se deja el ? para evitar inyeccciones externas
    db.query(sql,[id_genero],(error,rows) => {
        console.log(rows);
        if(error){ // si hay un error que retorne cual es el error
            return res.status(500).json({error : "Error: intente mas tarde"});
        }
        if(rows.length == 0){ // si las filas modificadas son cero significa que no encontro nada
            return res.status(404).send({error : "error: No existe el genero buscado"});
        };
        res.json(rows[0]);// si no hay error que devuelva las filas, []muestra el elemento en esa posicion
    });
};

//post
const crearGenero = (req,res) => {
    const {nombreGenero} = req.body;// le mandamos a crear el body
    const sql = "INSERT INTO generos (nombre_genero) VALUES(?)";
    db.query(sql,[nombreGenero],(error,result) => {
        console.log(result);
        if(error){ // si hay un error que retorne cual es el error
            return res.status(500).json({error : "Error: intente mas tarde"});
        }
        const generoCreado = {...req.body, id: result.insertId}; // reconstruir el objeto body
        res.status(201).json(generoCreado); // muestra el creado con exito
    });
};


//metodo o controlador put
const actualizarGenero= (req,res) => {
    const {idGenero} = req.params; // me pide que requiera el id como parametro
    const {nombreGenero} = req.body;// le mandamos body de los datos a modificar
    const sql="UPDATE generos SET nombre_genero = ?  WHERE id_genero = ?";
    db.query(sql,[nombreGenero, idGenero],(error,result) => {
        console.log(result);
        if(error){ // si hay un error que retorne cual es el error
            return res.status(500).json({error : "Error: intente mas tarde"});
        }
        if(result.affectedRows == 0){
            return res.status(404).send({error : "Error: el genero a modificar no existe"})
        }
        const generoActualizado = {...req.body, ...req.params}; // reconstruir el objeto body y los perametros que trae
        res.json(generoActualizado);// se muestra el elemento que existe
    });
};


//modulo borrar
const borrarGenero = (req,res) => {
    const{idGenero} = req.params;
    const sql ="DELETE FROM generos WHERE id_genero = ?";
    db.query(sql,[idGenero], (error,result) => {
        console.log(result);
        if(error){
            return res.status(500).json({error : "Error: intente mas tarde"});
        }
        if(result.affectedRows == 0){ // si no hay ninguna fila afectada es un error
            return res.status(404).send({error : "Error: el genero a eliminar no existe "});
        };
        res.json({mensaje : "Genero eliminado correctamente"});
    });
};

//exportar las funciones del modulo
module.exports = {
    obtenerGeneros,
    obtenerGenero,
    crearGenero,
    actualizarGenero,
    borrarGenero,
};