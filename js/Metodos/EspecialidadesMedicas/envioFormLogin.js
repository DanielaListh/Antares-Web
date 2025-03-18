document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById('form-login');

    if (form) { // Aseguramos que el formulario existe antes de agregar el event listener
        form.addEventListener('submit', async function (event) {
            event.preventDefault();
            const correoElectronico = document.getElementById('correoElectronico').value.trim();
            const password = document.getElementById('password').value.trim();

            if (!correoElectronico || !password) {// si el correo o la contraseña son incorrectos
                showError("Correo electrónico y contraseña son requeridos"); // se muestra en el front
                return;
            }

            try {
                const response = await fetch('http://localhost:3000/usuarios/login/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ correoElectronico, password }) 
                });

                console.log("respuesta del servidor: ", response); // si responde true

                const data = await response.json(); //data espera a que se convierta la respuesta a formato json
                console.log("datos recibidos del backend: ", data);
                

                    if(!data.user || !data.user.id_rol){//verificamos si los datos existen
                        console.error("Error: la respuesta no contiene user o id_rol", data);
                        showError("Error en la respuesta del servidor");
                        return;
                    }

                    localStorage.setItem('token', data.token);
                    localStorage.setItem('userRole', data.user.id_rol);// aqui antes estaba solo data.user.role daba error por incongruencia
                    //userRole es el nombre clave para recuperar los valores que tiene data.user.id_rol
                    
                    if (data.user.id_rol === 3) {// si el irRol es 3 en lo traido de user data
                        window.location.href = 'http://localhost:3000/adminHome/';// nos redirige a el homeAdmin
                    } else {
                        showError("Acceso denegado: No eres un administrador");// se muestra en el front
                    }
            } catch (error) {
                console.error('Error:', error);
                showError('Error: No se pudo conectar con el servidor');
            }
        });
    } else {
        console.error(" Error: No se encontró el formulario con ID 'form-login'");
    }
});

function showError(message) {
    const errorMensajeElement = document.getElementById('errorMessage');
    if (errorMensajeElement) {
        errorMensajeElement.innerText = message;
    }
}
