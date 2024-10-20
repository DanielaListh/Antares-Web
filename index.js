const express = require("express");
const app = express();

app.use(express.json()); // en el cuerpo de la peticion vendra un json y se transforma en un objeso js y asi poder usarlo

const especialidadesMedicasRouter = require('./routers/especialidades_medicas.router'); // que coloque en esta constante lo que hay en ese modulo
app.use('/especialidades', especialidadesMedicasRouter); // prefijo de la ruta especialidades



app.get('/', (req,res) => { // la ruta raiz del proyecto o pag principal del sitio
    res.send("Hola Antares");
});


const PORT = 3000;
app.listen(PORT,()=> console.log(`http://localhost:${PORT}`)); // le pedimos que escuche el puerto, mediante el link podemos acceder al index.js o enterPoint