// controladores del modulo
const multer = require('multer');
const db = require('../db/db');
const fs = require('fs');
const path = require('path');

// métodos get para todas las especialidades
const especialidadesMedicas = (req, res) => {
    const sql = "SELECT * FROM especialidades_medicas";
    db.query(sql, (error, rows) => {
        if (error) {
            return res.status(500).json({ error: "Error: intente más tarde" });
        }
        res.json(rows);
    });
};

// controlador para una especialidad
const especialidad = (req, res) => {
    const { id_especialidad } = req.params;
    const sql = "SELECT * FROM especialidades_medicas WHERE id_especialidad_medica = ?";
    db.query(sql, [id_especialidad], (error, rows) => {
        if (error) {
            return res.status(500).json({ error: "Error: intente más tarde" });
        }
        if (rows.length == 0) {
            return res.status(404).send({ error: "Error: No existe la especialidad buscada" });
        }
        res.json(rows[0]);
    });
};

//guardar la img en ruta
function saveImage(file) {
    const newPath = `./uploads/${file.originalname}`;
    fs.renameSync(file.path, newPath);
    return newPath;
}

// validación de multer para solo recibir img
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

//el tipo de archivos que va a permitir
const fileFilter = (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const mimetype = filetypes.test(file.mimetype); //ayuda a identificar el tipo de archivo
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase()); // ayuda a identificar el archivo basado en su .png o .jpg
    if (mimetype && extname) { // si lo identifica con ambos identificadores
        return cb(null, true); //cn null no hay error y es verdadero el segundo param
    } else {
        cb('Error: solo se permiten archivos de imagen');
    }
};

// post
const crearEspecialidad = (req, res) => {
    console.log(req.file);
    if (!req.file) {
        return res.status(400).send('No se subió ningún archivo');
    }
    const imagenUrl = saveImage(req.file);
    const { nombreEspecialidadMedica, descripcionMed } = req.body;
    const sql = "INSERT INTO especialidades_medicas (nombre_especialidad_med, descripcion_especialidad_med, imagen_especialidad_med) VALUES (?, ?, ?)";
    db.query(sql, [nombreEspecialidadMedica, descripcionMed, imagenUrl], (error, result) => {
        if (error) {
            return res.status(500).json({ error: "Error: intente más tarde" });
        }
        const especialidadM = { ...req.body, id: result.insertId, imagenUrl };
        res.status(201).json(especialidadM);
    });
};

// método o controlador put
const actualizarEspecialidad = (req, res) => {
    const { id_especialidad } = req.params;
    const { nombreEspecialidadMedica, descripcion } = req.body;
    const sql = "UPDATE especialidades_medicas SET nombre_especialidad_medica = ?, descripcion_especialidad_medica = ? WHERE id_especialidad_medica = ?";
    db.query(sql, [nombreEspecialidadMedica, descripcion, id_especialidad], (error, result) => {
        if (error) {
            return res.status(500).json({ error: "Error: intente más tarde" });
        }
        if (result.affectedRows == 0) {
            return res.status(404).send({ error: "Error: la especialidad medica a modificar no existe" });
        }
        const especialidadM = { ...req.body, ...req.params };
        res.json(especialidadM);
    });
};

// módulo borrar
const borrarEspecialidad = (req, res) => {
    const { id_especialidad } = req.params;
    const sql = "DELETE FROM especialidades_medicas WHERE id_especialidad_medica = ?";
    db.query(sql, [id_especialidad], (error, result) => {
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
