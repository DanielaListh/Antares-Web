require("dotenv").config(); //luego lo veremos pero son las variables de entorno, \se requiere las variables de entorno ejemplo PORT

const express = require("express");
const app = express();

app.use(express.json()); // en el cuerpo de la peticion vendra un json y se transforma en un objeso js y asi poder usarlo

const especialidadesMedicasRouter = require('./routers/especialidades_medicas.router'); // que coloque en esta constante lo que hay en ese modulo
app.use('/especialidades', especialidadesMedicasRouter); // prefijo de la ruta especialidades

const rolesRouter = require('./routers/roles.router'); // que coloque en esta constante lo que hay en ese modulo
app.use('/roles', rolesRouter); // prefijo de la ruta roles

const usuariosRouter = require('./routers/usuarios.router'); // que coloque en esta constante lo que hay en ese modulo
app.use('/usuarios', usuariosRouter); // prefijo de la ruta usuarios

app.use("/auth", require("./routers/auth.router"));// auth es el prefijo de autenticacion

app.get('/', (req,res) => { // la ruta raiz del proyecto o pag principal del sitio
    res.send("Hola Antares");
});


const PORT = process.env.PORT || 3000;// que coloque en el puerto lo que este definido en el servidor o por default 3000. env=enviroment
app.listen(PORT,()=> console.log(`http://localhost:${PORT}`)); // le pedimos que escuche el puerto