const jwt = require("jsonwebtoken");
const db =  require("../db/db");

// este middleware solo verifica la autorizacion del nombre del usaurio

// es probable que mas adelante se implementen los roles.

module.exports = (req, res, next) => { // se podra exportar el modulo
    const authHeader = req.headers["authorization"];// Obtiene el token desde los headers (Authorization)
    if (!authHeader) {//Si no existe, bloquea el acceso (401 Unauthorized)
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
        //si el token es valido, extrae los datos y los guarda en req.user para usarlos en las rutas protegidas
        req.userName = results[0].nombre_usuario;// toma el nombre de usuario del primer resultado de una búsqueda y lo asigna a userName del obj req
        next();
        });
    });

};



