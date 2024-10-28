//controladores del modulo
const db = require("../db/db");

//metodos get para todos los medicos
const obtenerMedicos = (req,res) => { // falta el req
    const sql = "SELECT * FROM medicos";
    db.query(sql,(error,rows) => {
        if(error){ // si hay un error que retorne cual es el error
            return res.status(500).json({error : "Error: intente mas tarde"});
        }
        res.json(rows);// si no hay error que devuelva las filas
    });
};


//controlador para un rol
const obtenerMedico = (req,res) => { //aqui le falto al profe el req y res
    const {id_usuario} = req.params; // aqui el profe coloco id_peliculas, pero a mi no me hizo falta
    const sql = "SELECT * FROM medicos WHERE id_usuario = ?"; // se deja el ? para evitar inyeccciones externas
    db.query(sql,[id_usuario],(error,rows) => {
        console.log(rows);
        if(error){ // si hay un error que retorne cual es el error
            return res.status(500).json({error : "Error: intente mas tarde"});
        }
        if(rows.length == 0){ // si las filas modificadas son cero significa que no encontro nada
            return res.status(404).send({error : "error: No existe el medico buscado"});
        };
        res.json(rows[0]);// si no hay error que devuelva las filas, []muestra el elemento en esa posicion
    });
};

//post solo se puede crear un medico a traves del registro eligiendo el rol de medico. Aqui no se da el alta del user medico
// sino que se da de alta los datos que son propios del rol medico
//const crearDatosMedico = (req,res) => {
    //const {codigoMedico,biografiaMedico} = req.body;// le mandamos a crear el body
    //const sql = "INSERT INTO medicos (codigo_medico, biografia_medico) VALUES(?,?)";
    //db.query(sql,[codigoMedico,biografiaMedico],(error,result) => {
        //if(error){ // si hay un error que retorne cual es el error
           // return res.status(500).json({error : "Error: intente mas tarde"});
        //}
       // console.log(result); //resultado despues de verificar si hay errores

       // const DatosMedicoCreado = {...req.body, id: result.insertId}; // reconstruir el objeto body
       // res.status(201).json(DatosMedicoCreado); // muestra el creado con exito
   // });
//};


//PUT, actualiza los datos del rol medico
const actualizarDatosMedico = (req,res) => {
    const {id_usuario} = req.params; // me pide que requiera el id como parametro
    const {codigoMedico,biografiaMedico} = req.body;// le mandamos body de los datos a modificar
    const sql="UPDATE medicos SET codigo_medico = ?, biografia_medico = ?  WHERE id_usuario = ?";
    db.query(sql,[codigoMedico,biografiaMedico, id_usuario],(error,result) => {
        console.log(result);
        if(error){ // si hay un error que retorne cual es el error
            return res.status(500).json({error : "Error: intente mas tarde"});
        }
        if(result.affectedRows == 0){
            return res.status(404).send({error : "Error: los datos del medico a modificar no existen."})
        }
        const DatosMedicosActualizado = {...req.body, ...req.params}; // reconstruir el objeto body y los perametros que trae
        res.json(DatosMedicosActualizado);// se muestra el elemento que existe
    });
};


//modulo borrar los datos del medico
const borrarDatosMedico = (req,res) => {
    const{id_usuario} = req.params;
    const sql ="DELETE FROM medicos WHERE id_usuario = ?";
    db.query(sql,[id_usuario], (error,result) => {
        console.log(result);
        if(error){
            return res.status(500).json({error : "Error: intente mas tarde"});
        }
        if(result.affectedRows == 0){ // si no hay ninguna fila afectada es un error
            return res.status(404).send({error : "Error: la especialidad medica a eliminar no existe "});
        };
        res.json({mensaje : "Datos medicos eliminados correctamente"});
    });
};

//exportar las funciones del modulo
module.exports = {
    obtenerMedicos,
    obtenerMedico,
    //crearDatosMedico,
    actualizarDatosMedico,
    borrarDatosMedico,
};