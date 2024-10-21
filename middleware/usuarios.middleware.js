const jwt = require("jsonwebtoken");
const db =  require("../db/db");

module.exports = (req, res, next) => { 
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
        return res.status(403).send({ auth: false, message: "No se proporcionó un token" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
        return res.status(403).send({ auth: false, message: "Token malformado" });
    }

    jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
        if (error) {
            return res.status(500).send({ auth: false, message: "Falló la autenticación del token." });
        }
        req.userId = decoded.id;

        //consultamos el nombre del usuario
        const sql = "SELECT nombre_usuario FROM usuarios WHERE id_usuario = ?";
        db.query(sql, [req.userId], (err,results) => {
            if(err){
                return res.status(500).send({auth: false, message:"Error al consultar el nombre del usuario"});    
            }
            if(results.length === 0){
                return res.status(404).send({ auth: false, message: "Usuario no encontrado" });
        }
        req.userName = results[0].nombre_usuario;
        next();
        });
    });

};



