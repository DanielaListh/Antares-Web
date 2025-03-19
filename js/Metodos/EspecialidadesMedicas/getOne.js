//obtener solo UNA especialidad medica mediante el id Y TRAERLA AL FRONT

async function buscarEspecialidad() {
    const idEspecialidad = document.getElementById('especialidad-id').value;
    if (!idEspecialidad) {
        showNotification('Por favor, ingresa un ID válido.');
        return;
    }

    try {
        const response = await fetch(`/especialidades/${idEspecialidad}`);
        if (!response.ok) {
            throw new Error('Error: ' + response.statusText);
        }
        const data = await response.json();
        displayEspecialidad(data);
    } catch (error) {
        showNotification(error.message);
    }
}

function displayEspecialidad(especialidad) {
    const detailsDiv = document.getElementById('especialidad-details');
    detailsDiv.innerHTML = `
        <p>ID: ${especialidad.id_especialidad_medica}</p>
        <p>Nombre: ${especialidad.nombre}</p>
        <p>Descripción: ${especialidad.descripcion}</p>
    `;
}

function showNotification(message) {
    const notificationDiv = document.getElementById('notification');
    notificationDiv.innerHTML = `<p>${message}</p>`;
}
