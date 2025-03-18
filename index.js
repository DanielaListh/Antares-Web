// esto es un endpoint

const express = require('express');
const cors = require('cors');
require('dotenv').config(); //luego lo veremos pero son las variables de entorno, \se requiere las variables de entorno ejemplo PORT
const app = express();// incicio la applicacion  express
const path =require('path');

app.use(express.json()); // en el cuerpo de la peticion vendra un json y se transforma en un objeto js y asi poder usarlo
//Middleware para transformar el cuerpo de la peticion a Json
app.use(express.urlencoded({ extended: true })); // para datos de formularios


app.use(cors());//ENCABEZADO CORS para el envio o transporte de emails

//se utilizan para servir archivos estaticos en una web
//Esto permite que Express sirva correctamente tus archivos CSS, JavaScript e imágenes.
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/imagenes', express.static(path.join(__dirname, 'css','imagenes')));
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
const usuariosMiddleware = require('./middleware/usuarios.middleware');
app.use('/estados', estadosRouter);

// servir la pagina html cuando se hace una solicitus get a /adminHome
app.get('/adminHome', (req,res) => { // la ruta raiz del proyecto o pag principal del sitio
   res.sendFile(path.join(__dirname,'html', 'adminHome.html'));
});

// servir la pagina html cuando se hace una solicitud
app.get('/loginAdmin', (req,res) => { // ruta cuando se quiere loguear un admin
   res.sendFile(path.join(__dirname,'html', 'LoginAdmin.html'));
});


const PORT = process.env.PORT || 3000;// que coloque en el puerto lo que este definido en el servidor o por default 3000. env=enviroment
app.listen(PORT,()=> console.log(`http://localhost:${PORT}`)); // le pedimos que escuche el puerto