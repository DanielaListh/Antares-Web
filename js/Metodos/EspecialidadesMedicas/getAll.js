

async function ObtenerEspecialidadesMedicas(params) {
  const link="http://localhost:3000/especialidades/";

    try{
      const res = await fetch(link); // traemos de la bbdd las especialidades medicas a travez del link

      if(!res.ok){
        throw new Error('Error en la solicitud: ' + res.status);
      }
      const data = await res.json(); // data es un array de objetos que contiene las especialidades médicas obtenidas del servidor
      console.log(data);
      mostrarEnTabla(data);//pasamos explícitamente el array data como argumento a la función mostrarEnTabla 
    }
    catch(error){
      console.error('Hubo un problema con la solicitud: ' + error); // los errores los vere en la consola
    }
  }


  function mostrarEnTabla(data){
    const contenedorTabla = document.getElementById('tabla-especialidades-medicas');
    
    //base del link para tener el path absoluto de las img
    const baseUrl="http://localhost:3000/"; // la barra al final / es importante para cumplir con toda la ruta

    //creo la tabla y el encabezado
    let tabla = '<table><thead><tr><th>ID</th><th>Nombre</th><th>Descripción</th><th>Fecha de Alta</th><th>Imagen</th></tr></thead><tbody>';

    //add las filas de datos
    data.forEach(especialidad => {

      //url completa de las img
      const imgURL = baseUrl + especialidad.imagen_especialidad_med;

        tabla += `<tr>
        <td>${especialidad.id_especialidad_medica}</td>
        <td>${especialidad.nombre_especialidad_med}</td>
        <td>${especialidad.descripcion_especialidad_med}</td>
        <td>${especialidad.fecha_alta_especialidad_med}</td>
        <td><img src="${imgURL}" width="200"></td>
        <td class="btn"><button><img src=/css/Imagenes/edit.png width="30"></button></td>
        <td class="btn"><button><img src=/css/Imagenes/delete.png width="30"></button></td>
        </tr>
        `
    });

    tabla += '</tbody></table>';

    //insertar la tabla en el contenedor
    contenedorTabla.innerHTML=tabla;
  }

  //add el evento de escucha del boton refrescar
  document.getElementById('btn-refrescar-get').addEventListener('click', ObtenerEspecialidadesMedicas);

  // llama a la funcion de manera automatica al cargar la pag, sin necesidad del refresh
  document.addEventListener('DOMContentLoaded', ObtenerEspecialidadesMedicas);