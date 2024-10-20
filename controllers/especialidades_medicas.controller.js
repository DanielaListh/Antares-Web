//controladores del modulo
const db = require("../db/db");

//metodos get para todos las especialidades
const especialidadesMedicas = (req,res) => { // falta el req
    const sql = "SELECT * FROM especialidades_medicas";
    db.query(sql,(error,rows) => {
        if(error){ // si hay un error que retorne cual es el error
            return res.status(500).json({error : "Error: intente mas tarde"});
        }
        res.json(rows);// si no hay error que devuelva las filas
    });
};


//controlador para un servicio o especialidad
const especialidad = (req,res) => { //aqui le falto al profe el req y res
    const {id_especialidad} = req.params; // aqui el profe coloco id_peliculas, pero a mi no me hizo falta
    const sql = "SELECT * FROM especialidades_medicas WHERE id_especialidad_medica = ?"; // se deja el ? para evitar inyeccciones externas
    db.query(sql,[id_especialidad],(error,rows) => {
        console.log(rows);
        if(error){ // si hay un error que retorne cual es el error
            return res.status(500).json({error : "Error: intente mas tarde"});
        }
        if(rows.length == 0){ // si las filas modificadas son cero significa que no encontro nada
            return res.status(404).send({error : "error: No existe la especialidad buscada"});
        };
        res.json(rows[0]);// si no hay error que devuelva las filas, []muestra el elemento en esa posicion
    });
};

//post
const crearEspecialidad = (req,res) => {
    console.log(req.file);
    //let imageName = "";
    if(req.file){
        return res.status(400).send('no se subio ningun archivo');
    };
    const imagenUrl = `/uploads/${req.file.filename}`;
    const {nombreEspecialidadMedica,descripcionMed} = req.body;// le mandamos body
    const sql = "INSERT INTO especialidades_medicas (nombre_especialidad_med, descripcion_especialidad_med, imagen_especialidad_med) VALUES(?,?,?)";
    db.query(sql,[nombreEspecialidadMedica,descripcionMed, imagenUrl],(error,result) => {
        console.log(result);
        if(error){ // si hay un error que retorne cual es el error
            return res.status(500).json({error : "Error: intente mas tarde"});
        }
        const especialidadM = {...req.body, id: result.insertId, imagenUrl}; // reconstruir el objeto body
        res.status(201).json(especialidadM); // muestra el creado con exito
    });
};


//metodo o controlador put
const actualizarEspecialidad= (req,res) => {
    const {id_especialidad} = req.params; // me pide que requiera el id como parametro
    const {nombreEspecialidadMedica,descripcion} = req.body;// le mandamos body de los datos a modificar
    const sql="UPDATE especialidades_medicas SET nombre_especialidad_medica = ?, descripcion_especialidad_medica = ?  WHERE id_especialidad_medica = ?";
    db.query(sql,[nombreEspecialidadMedica,descripcion, id_especialidad],(error,result) => {
        console.log(result);
        if(error){ // si hay un error que retorne cual es el error
            return res.status(500).json({error : "Error: intente mas tarde"});
        }
        if(result.affectedRows == 0){
            return res.status(404).send({error : "Error: la especialidad medica a modificar no existe"})
        }
        const especialidadM = {...req.body, ...req.params}; // reconstruir el objeto body y los perametros que trae
        res.json(especialidadM);// se muestra el elemento que existe
       
    });

};


//modulo borrar
const borrarEspecialidad = (req,res) => {
    const{id_especialidad} = req.params;
    const sql ="DELETE FROM especialidades_medicas WHERE id_especialidad_medica = ?";
    db.query(sql,[id_especialidad], (error,result) => {
        console.log(result);
        if(error){
            return res.status(500).json({error : "Error: intente mas tarde"});
        }
        if(result.affectedRows == 0){ // si no hay ninguna fila afectada es un error
            return res.status(404).send({error : "Error: la especialidad medica a eliminar no existe "});
        };
        res.json({mensaje : "Especialidad medica eliminada correctamente"});
    });
};

//exportar las funciones del modulo
module.exports = {
    especialidadesMedicas,
    especialidad,
    crearEspecialidad,
    actualizarEspecialidad,
    borrarEspecialidad,
};