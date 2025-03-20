//
const db = require("../db/db");

// Método GET para obtener todos los géneros
const obtenerGeneros = (req, res) => {
    const sql = "SELECT * FROM generos";
    db.query(sql, (error, rows) => {
        if (error) {
            console.error("Error al obtener los géneros:", error);
            return res.status(500).json({ error: "Error: intente más tarde" });
        }
        res.json(rows);
    });
};

// Controlador para obtener un género específico
const obtenerGenero = (req, res) => {
    const { idGenero } = req.params;
    const sql = "SELECT * FROM generos WHERE id_genero = ?";
    db.query(sql, [idGenero], (error, rows) => {
        if (error) {
            console.error("Error al obtener el género:", error);
            return res.status(500).json({ error: "Error: intente más tarde" });
        }
        if (rows.length === 0) {
            return res.status(404).send({ error: "Error: No existe el género buscado" });
        }
        res.json(rows[0]);
    });
};

// Método POST para crear un nuevo género
const crearGenero = (req, res) => {
    const { nombreGenero } = req.body;

    const sql = 'INSERT INTO generos (nombre_genero) VALUES (?)';
    db.query(sql, [nombreGenero], (error, result) => {
        if (error) {
            console.error("Error al crear el género:", error);
            return res.status(500).json({ error: "Error: intente más tarde" });
        }
        const generoCreado = { ...req.body, id: result.insertId };
        res.status(201).json(generoCreado);
    });
};

// Método PUT para actualizar un género existente
const actualizarGenero = (req, res) => {
    const { idGenero } = req.params;
    const { nombreGenero } = req.body;
    const sql = "UPDATE generos SET nombre_genero = ? WHERE id_genero = ?";
    db.query(sql, [nombreGenero, idGenero], (error, result) => {
        if (error) {
            console.error("Error al actualizar el género:", error);
            return res.status(500).json({ error: "Error: intente más tarde" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).send({ error: "Error: El género a modificar no existe" });
        }
        const generoActualizado = { ...req.body, ...req.params };
        res.json(generoActualizado);
    });
};

// Método DELETE para eliminar un género
const borrarGenero = (req, res) => {
    const { idGenero } = req.params;
    const sql = "DELETE FROM generos WHERE id_genero = ?";
    db.query(sql, [idGenero], (error, result) => {
        if (error) {
            console.error("Error al eliminar el género:", error);
            return res.status(500).json({ error: "Error: intente más tarde" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).send({ error: "Error: El género a eliminar no existe" });
        }
        res.json({ mensaje: "Género eliminado correctamente" });
    });
};

// Exportar las funciones del módulo
module.exports = {
    obtenerGeneros,
    obtenerGenero,
    crearGenero,
    actualizarGenero,
    borrarGenero,
};
