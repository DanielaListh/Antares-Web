// controladores del modulo
const db = require('../db/db');
const fs = require('fs');
//const path = require('path');

//guardar la img en ruta
function saveImage(file) {
    const newPath = `./uploads/${file.originalname}`;
    fs.renameSync(file.path, newPath);
    return newPath;
}

// Get para todas las especialidades
const especialidadesMedicas = (req, res) => {
    const sql = "SELECT * FROM especialidades_medicas";
    db.query(sql, (error, rows) => {
        if (error) {
            return res.status(500).json({ error: "Error: intente más tarde" });
        }
        res.json(rows);
    });
};

// Get para una especialidad
const especialidad = (req, res) => {
    const { idEspecialidad } = req.params;
    const sql = "SELECT * FROM especialidades_medicas WHERE id_especialidad_medica = ?";
    db.query(sql, [idEspecialidad], (error, rows) => {
        if (error) {
            return res.status(500).json({ error: "Error: intente más tarde" });
            // hay que buscar la manera de mostrar los errores en el dom en forma de notificacion
            //para facilidad del usuario n
        }
        if (rows.length == 0) {
            return res.status(404).send({ error: "Error: No existe la especialidad buscada" });
        }
        res.json(rows[0]);
    });
};


// post
const crearEspecialidad = (req, res) => {
    console.log(req.file); // Mostrar los datos en la consola o terminal
    if (!req.file) {
        return res.status(400).send('No se subió ningún archivo');
    }

    const imagenUrl = saveImage(req.file); // Guardar la imagen subida y almacenar la URL en imagenUrl
    const { nombreEspecialidadMedica, descripcionMed } = req.body; // Obtener los datos del cuerpo de la solicitud
    const sql = "INSERT INTO especialidades_medicas (nombre_especialidad_med, descripcion_especialidad_med, imagen_especialidad_med) VALUES (?, ?, ?)";

    db.query(sql, [nombreEspecialidadMedica, descripcionMed, imagenUrl], (error, result) => {
        if (error) {
            console.log("Error al insertar la especialidad médica:", error);
            return res.status(500).json({ error: "Error: intente más tarde" });
        }
        const especialidadM = { ...req.body, id: result.insertId };
        res.status(201).json(especialidadM);
    });
};


// método o controlador put
const actualizarEspecialidad = (req, res) => {
    console.log(req.file); // mostrar los datos en la consola o terminal
    if (!req.file) {
        return res.status(400).send('No se subió ningún archivo');
    }

    const imagenUrl = saveImage(req.file); // guardar la imagen subida y almacenar la URL en imagenUrl
    const { idEspecialidad } = req.params; // obtener el id de la especialidad como parámetro para buscar el registro a actualizar
    const { nombreEspecialidadMedica, descripcionMed } = req.body; // Obtener los datos del cuerpo de la solicitud
    const sql = "UPDATE especialidades_medicas SET nombre_especialidad_med = ?, descripcion_especialidad_med = ?, imagen_especialidad_med = ? WHERE id_especialidad_medica = ?";

    db.query(sql, [nombreEspecialidadMedica, descripcionMed, imagenUrl, idEspecialidad], (error, result) => {
        if (error) {
            console.log("Error al actualizar la especialidad médica:", error);
            return res.status(500).json({ error: "Error: intente más tarde" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).send({ error: "Error: la especialidad médica a modificar no existe" });
        }
        const especialidadM = { ...req.body, ...req.params };
        res.json(especialidadM);
    });
};


// módulo borrar
const borrarEspecialidad = (req, res) => {
    const { idEspecialidad } = req.params;
    const sql = "DELETE FROM especialidades_medicas WHERE id_especialidad_medica = ?";
    db.query(sql, [idEspecialidad], (error, result) => {
        if (error) {
            return res.status(500).json({ error: "Error: intente más tarde" });
        }
        if (result.affectedRows == 0) {
            return res.status(404).send({ error: "Error: la especialidad medica a eliminar no existe" });
        }
        res.json({ mensaje: "Especialidad medica eliminada correctamente" });
    });
};

// exportar las funciones del modulo
module.exports = {
    especialidadesMedicas,
    especialidad,
    crearEspecialidad,
    actualizarEspecialidad,
    borrarEspecialidad,
};
