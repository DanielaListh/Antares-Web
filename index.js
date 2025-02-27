// esto es un middleware?

const express = require('express');
const cors= require('cors');
require('dotenv').config(); //luego lo veremos pero son las variables de entorno, \se requiere las variables de entorno ejemplo PORT
const app = express();// incicio la applicacion  express
const path =require('path');

app.use(express.json()); // en el cuerpo de la peticion vendra un json y se transforma en un objeto js y asi poder usarlo
//Middleware para transformar el cuerpo de la peticion a Json

app.use(cors());

//servir archivos estaticos desde la carpeta 'uploads'
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const especialidadesMedicasRouter = require('./routers/especialidades_medicas.router'); // que coloque en esta constante lo que hay en ese modulo
app.use('/especialidades', especialidadesMedicasRouter); // prefijo de la ruta especialidades

const rolesRouter = require('./routers/roles.router'); // que coloque en esta constante lo que hay en ese modulo
app.use('/roles', rolesRouter); // prefijo de la ruta roles

const usuariosRouter = require('./routers/usuarios.router'); // que coloque en esta constante lo que hay en ese modulo
app.use('/usuarios', usuariosRouter); // prefijo de la ruta usuarios

const medicosRouter = require('./routers/medicos.router');
app.use('/medicos', medicosRouter); // que la app expres utilice el /medicos como ruta

const medicosEspecialidadesRouter =  require('./routers/medicosEspecialidades.router');
app.use('/medicosEspecialidades', medicosEspecialidadesRouter);

const generoRouter = require('./routers/generos.router');
app.use('/generos', generoRouter);

const estadosRouter = require('./routers/estados.router');
app.use('/estados', estadosRouter);

app.get('/', (req,res) => { // la ruta raiz del proyecto o pag principal del sitio
    res.send("Hola Agape");
});


const PORT = process.env.PORT || 3000;// que coloque en el puerto lo que este definido en el servidor o por default 3000. env=enviroment
app.listen(PORT,()=> console.log(`http://localhost:${PORT}`)); // le pedimos que escuche el puerto