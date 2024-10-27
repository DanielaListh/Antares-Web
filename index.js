const express = require('express');
const path = require('path');
require('dotenv').config(); //luego lo veremos pero son las variables de entorno, \se requiere las variables de entorno ejemplo PORT
const app = express();// incicio la applicacion  express
const multer = require('multer');
const fs = require('node:fs');
const upload= multer({dest: 'uploads/'});// resividor de archivos


////////////////////////
// con un metodo post mandamos
app.post('/images/single', upload.single('imagenPerfil'), (req, res) => { // gestionamos la subida de la imagen
    console.log(req.file); //informacion en la consola sobre el archivo a subir
    saveImage(req.file);
   // res.json(req.file);
   res.send('termina');
}); 

// renombrar img
function saveImage(file){ // funcion para guardar la imagen desde el path
    const newPath=`./uploads/${file.originalname}`; // creamos un nueva ruta de guardado usando el path anterior
    fs.renameSync(file.path, newPath);//guardar la imagen con el nombre que queramos
    return newPath;
}

////////////////////////////



app.use(express.json()); // en el cuerpo de la peticion vendra un json y se transforma en un objeso js y asi poder usarlo
//Middleware para transformar el cuerpo de la peticion a Json

const especialidadesMedicasRouter = require('./routers/especialidades_medicas.router'); // que coloque en esta constante lo que hay en ese modulo
app.use('/especialidades', especialidadesMedicasRouter); // prefijo de la ruta especialidades

const rolesRouter = require('./routers/roles.router'); // que coloque en esta constante lo que hay en ese modulo
app.use('/roles', rolesRouter); // prefijo de la ruta roles

const usuariosRouter = require('./routers/usuarios.router'); // que coloque en esta constante lo que hay en ese modulo
app.use('/usuarios', usuariosRouter); // prefijo de la ruta usuarios

const medicosRouter = require('./routers/medicos.router');
app.use('/medicos', medicosRouter); // que la app expres utilice el /medicos como ruta

//const medicosEspecialidades =  require(.)

app.get('/', (req,res) => { // la ruta raiz del proyecto o pag principal del sitio
    res.send("Hola Antares");
});


const PORT = process.env.PORT || 3000;// que coloque en el puerto lo que este definido en el servidor o por default 3000. env=enviroment
app.listen(PORT,()=> console.log(`http://localhost:${PORT}`)); // le pedimos que escuche el puerto