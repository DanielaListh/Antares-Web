//controladores del modulo
const db = require("../db/db");

//Esto es un formulario que llenan los doctores en su perfil, son dirigidos a el luego de realizar el registro, se usa para recopilar esos datos en una misma tabla

//vista para el formulario
const renderizarFormularioEspecialidades = (req, res) => {
    res.render('formulario_especialidades'); // renderiza la vista del formulario
};

//metodos get para todos los medicos_especialidades (tabla intermedia entre medicos y especialidades donde se ve las especialidades de cada medico)
const obtenerMedicosEspecialidades = (req,res) => { // falta el req
    const sql = "SELECT * FROM medicos_especialidades";
    db.query(sql,(error,rows) => {
        if(error){ // si hay un error que retorne cual es el error
            return res.status(500).json({error : "Error: intente mas tarde"});
        }
        res.json(rows);// si no hay error que devuelva las filas
    });
};


//controlador para un medico con especialidad
const obtenerMedicosEspecialidad = (req,res) => {
    const {idMedicoEspecialidad} = req.params;
    const sql = "SELECT * FROM medicos_especialidades WHERE id_medico_especialidad = ?"; // se deja el ? para evitar inyeccciones externas
    db.query(sql,[idMedicoEspecialidad],(error,rows) => { ////////////////ver mas adelante si esta bien la consulta
        console.log(rows);
        if(error){ // si hay un error que retorne cual es el error
            return res.status(500).json({error : "Error: intente mas tarde"});
        }
        if(rows.length === 0){ // si las filas modificadas son cero significa que no encontro nada
            return res.status(404).send({error : "error: No existe el la especialidad del medico buscado"});
        };
        res.json(rows[0]);// si no hay error que devuelva las filas, []muestra el elemento en esa posicion
    });
    //SELECT especialidades_medicas.nombre_especialidad FROM medicos_especialidades medicos JOIN especialidades e ON medicos.id_especialidad = e.id_especialidad WHERE me.id_usuario = ?
};

//POST se crea la especialida que posee un medico y su experiencia en esa misma 
const agregarMedicoEspecialidad = (req, res) => { // el IdUsuario debe autocompletarse al crearse en el registro
    const {idEspecialidadMedica, fechaExperiencia} = req.body;
    const idUsuario = req.user.id; //asumiendo que tiene el token autenticado
    const sql = "INSERT INTO medicos_especialidades (id_usuario, id_especialidad_medica, fecha_experiencia) VALUES(?,?,?)";
    db.query(sql, [idUsuario, idEspecialidadMedica, fechaExperiencia], (error, result) => {
        console.log(result);
        if (error) { 
            console.log(error);
            // Si hay un error que retorne cual es el error
            return res.status(500).json({ error: "Error: intente más tarde" });
        } 
        // Si la inserción es exitosa
        const medicoEspecialidad = { id: result.insertId, idUsuario, idEspecialidadMedica, fechaExperiencia };
        res.status(201).json(medicoEspecialidad); // Muestra el creado con éxito
    });
};



//PUT, actualiza los datos 
const actualizarMedicoEspecialidad = (req,res) => {
    const {idMedicoEspecialidad} = req.params; // me pide que requiera el id como parametro
    const {idUsuario, idEspecialidadMedica, fechaExperiencia} = req.body;// le mandamos body de los datos a modificar
    const sql="UPDATE medicos_especialidades SET id_usuario = ?, id_especialidad_medica = ?, fecha_experiencia = ?  WHERE id_medico_especialidad = ?";
    db.query(sql,[idUsuario, idEspecialidadMedica, fechaExperiencia, idMedicoEspecialidad],(error,result) => {
        console.log(result);
        if(error){ // si hay un error que retorne cual es el error
            return res.status(500).json({error : "Error: intente mas tarde"});
        }
        if(result.affectedRows == 0){
            return res.status(404).send({error : "Error: los datos a modificar no existen."})
        }
        const MedicosEspecialidadActualizado = {...req.body, ...req.params}; // reconstruir el objeto body y los perametros que trae
        res.json(MedicosEspecialidadActualizado);// se muestra el elemento que existe
    });
};


//modulo borrar los datos del medico
const borrarMedicoEspecialidad = (req,res) => {
    const{idMedicoEspecialidad} = req.params;
    const sql ="DELETE FROM medicos_especialidades WHERE id_medico_especialidad = ?";
    db.query(sql,[idMedicoEspecialidad], (error,result) => {
        console.log(result);
        if(error){
            return res.status(500).json({error : "Error: intente mas tarde"});
        }
        if(result.affectedRows == 0){ // si no hay ninguna fila afectada es un error
            return res.status(404).send({error : "Error: el medico con las especialidades a eliminar no existe "});
        };
        res.json({mensaje : "Especialidades del medico eliminados correctamente"});
    });
};

//exportar las funciones del modulo
module.exports = {
    renderizarFormularioEspecialidades,
    obtenerMedicosEspecialidades,
    obtenerMedicosEspecialidad,
    agregarMedicoEspecialidad,
    actualizarMedicoEspecialidad,
    borrarMedicoEspecialidad
};