// script para mostrar las especialidades medicas del front del lado del 
//administrador para que se muestren en el front del ADMIN

document.getElementById('especialidadMedicaForm').addEventListener('submit', function (event) { //eventListener captura el evento del formulario
  event.preventDefault(); // de manera asincrona manejamos el envio del formulario

  //creo un evento formData para enviar los datos que existen en el formulario, contruimos pares clave/valor que
  // representen los campos del formulario
  const formData = new FormData();
  formData.append('nombre', document.getElementById('nombreEspecialidad').value);// add el valor del campo de texto al obj FormData
  formData.append('descripcion', document.getElementById('descripcionEspecialidad').value);
  formData.append('imagenUrl', document.getElementById('imagenEspecialidadMedica').files[0]);

  //envia los datos al backend usando fetch
  // realiza la solicitud https al servidor en la ruta
  fetch('/especialidadesmedicas', {
    method: 'POST',
    body: formData 
  }) // formData es el cuerpo de la solicitud que contiene los datos del formulario

    .then(response => response.json()) // toma la respuesta del servidor y la convierte en un objeto json
    .then(data => { // maneja el obeto json resultante
      alert('Especialidad subida con éxito'); //muestra una alerta
      obtenerEspecialidades(); //llamada a la funcion para obtener las especialidades actualizadas
    })
    .catch(error => console.error('Error:', error)); //captura los errores
});


//obtener y mostrar las especialidades medicas
function obtenerEspecialidades() {
  fetch('/especialidadesmedicas') //busca en la ruta /especialidadesmedicas 
    .then(response => response.json()) // la respuesta de un json
    .then(data => { // la convierte
      const especialidadesList = document.getElementById('especialidadesList');
      especialidadesList.innerHTML = '';
      data.forEach(especialidad => {
        const div = document.createElement('div');
        div.textContent = `Nombre: ${especialidad.nombre}, Descripción: ${especialidad.descripcion}`;
        if (especialidad.imagenUrl) {
          const img = document.createElement('img');
          img.src = especialidad.imagenUrl;
          img.alt = especialidad.nombre;
          div.appendChild(img);
        }
        especialidadesList.appendChild(div);
      });
    })
    .catch(error => console.error('Error:', error));
}

// Llamar a la función obtenerEspecialidades al cargar la página
obtenerEspecialidades();
